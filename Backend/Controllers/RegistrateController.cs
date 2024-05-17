using HandCrafter.Services;
using HandCrafter.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HandCrafter.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/Registration")]
    public class RegistrateController : ControllerBase
    {
        private readonly JWTSettings _options;

        private readonly ILogger<RegistrateController> _logger;
        private readonly ApplicationContext _db;

        public RegistrateController(IOptions<JWTSettings> options, ILogger<RegistrateController> logger, ApplicationContext db)
        {
            _options = options.Value;
            _logger = logger;
            _db = db;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetRefreshToken")]
        public string GetRefreshToken(int minutes, int id)
        {
            var user = _db.Users
                 .Join(_db.Contacts,
                 u => u.Id,
                 c => c.IdUser,
                 (u, c) => new
                 {
                     Id = u.Id,
                     Name = u.FirstName,
                     LastName = u.LastName,
                     Patronymic = u.Patronymic,
                     Description = u.Description,
                     Birthday = u.Birthday,
                     Contact = new
                     {
                         Email = c.Email,
                         Password = c.Password,
                         Phone = c.Phone
                     }
                 })
             .FirstOrDefault(u => u.Id == id);

            if (user == null) 
            {
                return "Error";
            }
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("Id", user.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Role, "user"));

            var singingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey));

            var jwt = new JwtSecurityToken
            (
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(minutes)),
                notBefore: DateTime.UtcNow,
                signingCredentials: new SigningCredentials(singingKey, SecurityAlgorithms.HmacSha256)
            );

            var resp = new JwtSecurityTokenHandler().WriteToken(jwt);
            return resp;
        }

        [HttpPost]
        [Route("GetAccessToken")]
        public string GetAccessToken(int minutes)
        {
            string token = HttpContext.Request.Headers["Authorization"];
            // Удаляем "Bearer " из строки токена
                token = token.Substring("Bearer ".Length).Trim();

                // Создаем объект JwtSecurityTokenHandler
                var tokenHandler = new JwtSecurityTokenHandler();

                // Декодируем токен
                var decodedToken = tokenHandler.ReadJwtToken(token);

                // Получаем имя из токена
                var idClaim = decodedToken.Claims.FirstOrDefault(c => c.Type == "Id");           
            int id;
            int.TryParse(idClaim.Value, out id);
            var user = _db.Users
            .FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return "Error";
            }
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName));
            claims.Add(new Claim("Id", user.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Role, "user"));

            var singingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey));

            var jwt = new JwtSecurityToken
            (
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(minutes)),
                notBefore: DateTime.UtcNow,
                signingCredentials: new SigningCredentials(singingKey, SecurityAlgorithms.HmacSha256)
            );

            var resp = new JwtSecurityTokenHandler().WriteToken(jwt);
            return resp;
        }


    }
}
