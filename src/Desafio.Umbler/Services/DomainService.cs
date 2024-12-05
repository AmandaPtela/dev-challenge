using System;
using System.IO;
using System.Linq;

namespace Desafio.Umbler.Services  {
    public class DomainServices {
        public string DomainValidation(string domain) {
            if(domain is string) {
                Console.WriteLine("STRING");
                return domain;
            }
            Console.WriteLine("NOT A STRING");
            return domain;
        }
    };
}