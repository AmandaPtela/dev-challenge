﻿using System;
using System.IO;
using Desafio.Umbler.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Desafio.Umbler
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
                var connectionString = Configuration.GetConnectionString("DefaultConnection");

                // Replace with your server version and type.
                // Use 'MariaDbServerVersion' for MariaDB.
                // Alternatively, use 'ServerVersion.AutoDetect(connectionString)'.
                // For common usages, see pull request #1233.
                var serverVersion = new MySqlServerVersion(new Version(8, 0, 27));

                // Replace 'YourDbContext' with the name of your own DbContext derived class.
                services.AddDbContext<DatabaseContext>(
                    dbContextOptions => dbContextOptions
                        .UseMySql(connectionString, serverVersion)
                        // The following three options help with debugging, but should
                        // be changed or removed for production.
                        .LogTo(Console.WriteLine, LogLevel.Information)
                        .EnableSensitiveDataLogging()
                        .EnableDetailedErrors()
                );

            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
            public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error/Error");
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                    endpoints.MapControllerRoute(
                    name: "searchDomain",
                    pattern: "{controller=Domain}/{action=Get}/{domainName?}");
                });


            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "Desafio.Umbler.Front"; 

            if (env.IsDevelopment())
                spa.UseReactDevelopmentServer(npmScript: "start");
            else
                spa.Options.DefaultPage = "/index.html";
            });
        }
    }
}
