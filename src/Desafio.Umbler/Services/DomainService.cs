using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Desafio.Umbler.Models;
using Desafio.Umbler.DatabaseRepo;

namespace Desafio.Umbler.ViewModel
{
    public class DomainViewModel
    {
        private readonly DatabaseRepository DatabaseRepository = new DatabaseRepository(DatabaseContext); /* PAREI AQUI NO PARAMETRO */
        public bool DomainValidation(string domain)
        {
            string pattern = @"^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$";
            bool valid = Regex.IsMatch(domain, pattern);

            return valid;
        }

        public async Task<Domain> DomainRequest(string domainName)
        {
            var domain = await DatabaseRepository.GetDomain(domainName);

            if (domain == null)
                DatabaseRepository.AddDomain(domainName);

            if (DateTime.Now.Subtract(domain.UpdatedAt).TotalMinutes > domain.Ttl)
            {
                var response = await WhoisClient.QueryAsync(domainName);

                var lookup = new LookupClient();
                var result = await lookup.QueryAsync(domainName, QueryType.ANY);
                var record = result.Answers.ARecords().FirstOrDefault();
                var address = record?.Address;
                var ip = address?.ToString();

                var hostResponse = await WhoisClient.QueryAsync(ip);

                domain.Name = domainName;
                domain.Ip = ip;
                domain.UpdatedAt = DateTime.Now;
                domain.WhoIs = response.Raw;
                domain.Ttl = record?.TimeToLive ?? 0;
                domain.HostedAt = hostResponse.OrganizationName;
            }
            DatabaseRepository.SaveChangesAsync();
            return domain;
        }
        }
    }