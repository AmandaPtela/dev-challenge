﻿using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Desafio.Umbler.Models;

namespace Desafio.Umbler.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult domain()
        {
         return View();
        } 

    public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
