using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Desafio.Umbler.Models;
using Desafio.Umbler.ViewModel;

namespace Desafio.Umbler.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult domain()
        {
         return View(domain);
        } 

    public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
