using System;
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
        [HttpGet("error")]
        public IActionResult Error([FromQuery] string Message)
        {
    if (string.IsNullOrEmpty(Message))
            {
                Message = "Ocorreu um erro desconhecido...";
            }    
            return Redirect($"/Error/Error?message={Uri.EscapeDataString(Message)}");
        }
    }
}
