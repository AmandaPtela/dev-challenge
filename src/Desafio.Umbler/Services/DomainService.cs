using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Desafio.Umbler.Services
{
    public class DomainServices
    {
        public bool DomainValidation(string domain)
        {
            string pattern = @"^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$";
            bool valid = Regex.IsMatch(domain, pattern);

            return valid;
        }
    }
}