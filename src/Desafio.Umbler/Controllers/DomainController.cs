using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Desafio.Umbler.ViewModel;
using Desafio.Umbler.Models;
using Desafio.Umbler.DatabaseRepo;
using Desafio.Umbler.Validator;
using FluentValidation;
using DnsClient;
using Whois.NET;
using Microsoft.EntityFrameworkCore;

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
            var validation = new DomainValidator();
            var results = validation.Validate(domainName);
            var errors = results.Errors;
            var errorMessage = "";

            if (results.IsValid)
            {
                var domain = await _DatabaseRepository.GetDomain(domainName);

                if (domain == null)
                {
                    var response = await WhoisClient.QueryAsync(domainName);

                    var lookup = new LookupClient();
                    var result = await lookup.QueryAsync(domainName, QueryType.ANY);
                    var record = result.Answers.ARecords().FirstOrDefault();
                    var address = record?.Address;
                    var ip = address?.ToString();

                    var hostResponse = await WhoisClient.QueryAsync(ip);

                domain = new Domain {
                    Name = domainName,
                    Ip = ip,
                    UpdatedAt = DateTime.Now,
                    WhoIs = response.Raw,
                    Ttl = record?.TimeToLive ?? 0,
                    HostedAt = hostResponse.OrganizationName,
                };

                    _db.Domains.Add(domain);
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

                await _DatabaseRepository.SaveChangesAsync();

                return Ok(ViewModelReturn);
            }
            else
            {
                foreach (var failure in errors)
                {
                    errorMessage = "Failed validation. Error: " + failure;
                }
                return RedirectToAction("Error", "Error", new
                {
                    message = errorMessage
                });
            }
        }
    }
}
