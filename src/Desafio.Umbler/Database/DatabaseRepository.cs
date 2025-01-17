using System;
using System.Linq;
using System.Threading.Tasks;
using DnsClient;
using Whois.NET;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Desafio.Umbler.Models;

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

    public async Task SaveChangesAsync()
    {
        await _db.SaveChangesAsync();
    }

    public async Task<Domain> VerifyTtl(string domainName)
    {
        var domain = await GetDomain(domainName);
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

        return domain;
    }
}
