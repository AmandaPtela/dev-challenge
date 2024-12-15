using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Desafio.Umbler.ViewModel
{
    public class DomainViewModel
    {
        public bool DomainValidation(string domain)
        {
            string pattern = @"^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$";
            bool valid = Regex.IsMatch(domain, pattern);

            return valid;
        }

        public string Name { get; set; }
        public string Ip { get; set; }
        public string WhoIs { get; set; }
        public string HostedAt { get; set; }
    }
}