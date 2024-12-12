using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Desafio.Umbler.DatabaseRepo;
using Desafio.Umbler.Models;

namespace Desafio.Umbler.ViewModel
{
    public class DomainViewModel
    {
        private DatabaseRepository _DatabaseRepository;
        public bool DomainValidation(string domain)
        {
            string pattern = @"^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$";
            bool valid = Regex.IsMatch(domain, pattern);

            return valid;
        }

        public async Task<Domain> DomainRequest(string domainName)
        {
            var domain = await _DatabaseRepository.GetDomain(domainName);

            if (domain == null)
            {
                return await _DatabaseRepository.AddDomain(domainName);
            }

            if (DateTime.Now.Subtract(domain.UpdatedAt).TotalMinutes > domain.Ttl)
            {
                return await _DatabaseRepository.VerifyTtl(domainName);
            }
            await _DatabaseRepository.SaveChangesAsync();
            return domain;
        }
    }
}