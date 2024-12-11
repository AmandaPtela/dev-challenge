using System;
using System.Linq;
using Desafio.Umbler.Models;
using System.Threading.Tasks;
using DnsClient;
using Whois.NET;
using Microsoft.EntityFrameworkCore;

namespace Desafio.Umbler.DatabaseRepo;
public class DatabaseRepository
{
    private readonly DatabaseContext _db;

    public DatabaseRepository(DatabaseContext db)
    {
        _db = db;
    }

    public async Task<Domain> GetDomain(string domainName)
    {
        return await _db.Domains.FirstOrDefaultAsync(d => d.Name == domainName);
    }

    public async Task<Domain> AddDomain(string domainNAme)
    {
        var response = await WhoisClient.QueryAsync(domainName);
        var lookup = new LookupClient();
        var result = await lookup.QueryAsync(domainName, QueryType.ANY);
        var record = result.Answers.ARecords().FirstOrDefault();
        var address = record?.Address;
        var ip = address?.ToString();

        var hostResponse = await WhoisClient.QueryAsync(ip);

        domain = new Domain
        {
            Name = domainName,
            Ip = ip,
            UpdatedAt = DateTime.Now,
            WhoIs = response.Raw,
            Ttl = record?.TimeToLive ?? 0,
            HostedAt = hostResponse.OrganizationName
        };

        _db.Domains.Add(domain);
        return domain;
    }

    public async Task SaveChangesAsync()
    {
        await _db.SaveChangesAsync();
    }
}
