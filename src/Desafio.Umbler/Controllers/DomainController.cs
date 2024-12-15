﻿using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Desafio.Umbler.ViewModel;
using Desafio.Umbler.Models;
using Desafio.Umbler.DatabaseRepo;

namespace Desafio.Umbler.Controllers
{
    [Route("api")]
    public class DomainController : Controller
    {
        public DomainViewModel DomainViewModel = new DomainViewModel();
        private readonly DatabaseContext _db;
        public DomainController(DatabaseContext db)
        {
            _db = db;
        }

        [HttpGet, Route("domain/{domainName}")]
        public async Task<IActionResult> Get(string domainName)
        {
            var _DatabaseRepository = new DatabaseRepository(_db);
            var domain = await _DatabaseRepository.GetDomain(domainName);

            if (domain == null)
            {
                return await _DatabaseRepository.AddDomain(domainName);
            }

            if (DateTime.Now.Subtract(domain.UpdatedAt).TotalMinutes > domain.Ttl)
            {
                return await _DatabaseRepository.VerifyTtl(domainName);
            }

            var ViewModelReturn = new DomainViewModel
            {
                Name = domain.Name,
                Ip = domain.Ip,
                WhoIs = domain.WhoIs,
                HostedAt = domain.HostedAt,

            };

            Console.WriteLine(ViewModelReturn);

            await _DatabaseRepository.SaveChangesAsync();

            return Ok(ViewModelReturn);
        }
    }
}
