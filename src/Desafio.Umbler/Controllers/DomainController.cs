using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Desafio.Umbler.ViewModel;

namespace Desafio.Umbler.Controllers
{
    [Route("api")]
    public class DomainController : Controller
    {
        public DomainViewModel DomainViewModel = new DomainViewModel();

        [HttpGet, Route("domain/{domainName}")]

        public async Task<IActionResult> Get(string domainName)
        {
            var result = await DomainViewModel.DomainRequest(domainName);

           return Ok(result);
    }
}}
