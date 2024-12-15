using System;
using System.Linq;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
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

        public bool DomainValidation(string domainName)
        {
            string pattern = @"^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$";
            bool valid = Regex.IsMatch(domainName, pattern);

            return valid;
        }

        public async Task<IActionResult> Get(string domainName)
        {
            var _DatabaseRepository = new DatabaseRepository(_db);
            var domain = await _DatabaseRepository.GetDomain(domainName);

            if (domain == null)
            {
                await _DatabaseRepository.AddDomain(domainName);
            }

            if (DateTime.Now.Subtract(domain.UpdatedAt).TotalMinutes > domain.Ttl)
            {
                await _DatabaseRepository.VerifyTtl(domainName);
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
