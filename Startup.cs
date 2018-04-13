using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AspNet.Security.OpenIdConnect.Primitives;
using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Identity;
using Models;

namespace AngularApp
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

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                //options.UseSqlServer(Configuration["ConnectionStrings:DefaultConnection"], b => b.MigrationsAssembly("QuickApp"));
                options.UseOpenIddict();
            });

            // add identity
            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // // Configure Identity options and password complexity here
            // services.Configure<IdentityOptions>(options =>
            // {
            //     // User settings
            //     options.User.RequireUniqueEmail = true;

            //     //    //// Password settings
            //     //    //options.Password.RequireDigit = true;
            //     //    //options.Password.RequiredLength = 8;
            //     //    //options.Password.RequireNonAlphanumeric = false;
            //     //    //options.Password.RequireUppercase = true;
            //     //    //options.Password.RequireLowercase = false;

            //     //    //// Lockout settings
            //     //    //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
            //     //    //options.Lockout.MaxFailedAccessAttempts = 10;

            //     options.ClaimsIdentity.UserNameClaimType = OpenIdConnectConstants.Claims.Name;
            //     options.ClaimsIdentity.UserIdClaimType = OpenIdConnectConstants.Claims.Subject;
            //     options.ClaimsIdentity.RoleClaimType = OpenIdConnectConstants.Claims.Role;
            // });

            // Register the OpenIddict services.
            services.AddOpenIddict(options =>
            {
                options.AddEntityFrameworkCoreStores<ApplicationDbContext>();
                options.AddMvcBinders();
                options.EnableTokenEndpoint("/connect/token");
                options.AllowPasswordFlow();
                options.AllowRefreshTokenFlow();
                options.DisableHttpsRequirement();
                //options.AddSigningKey(new SymmetricSecurityKey(System.Text.Encoding.ASCII.GetBytes(Configuration["STSKey"])));
            });


            // services.AddAuthentication(options =>
            // {
            //     options.DefaultAuthenticateScheme = OAuthValidationDefaults.AuthenticationScheme;
            //     options.DefaultChallengeScheme = OAuthValidationDefaults.AuthenticationScheme;
            // }).AddOAuthValidation();


            // Add cors
            services.AddCors();

            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            //Configure Cors
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());


            app.UseStaticFiles();
            app.UseAuthentication();

            // app.UseExceptionHandler(builder =>
            // {
            //     builder.Run(async context =>
            //     {
            //         context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            //         context.Response.ContentType = MediaTypeNames.ApplicationJson;

            //         var error = context.Features.Get<IExceptionHandlerFeature>();

            //         if (error != null)
            //         {
            //             string errorMsg = JsonConvert.SerializeObject(new { error = error.Error.Message });
            //             await context.Response.WriteAsync(errorMsg).ConfigureAwait(false);
            //         }
            //     });
            // });


            // app.UseSwagger();
            // app.UseSwaggerUI(c =>
            // {
            //     c.SwaggerEndpoint("/swagger/v1/swagger.json", "QuickApp API V1");
            // });


            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
