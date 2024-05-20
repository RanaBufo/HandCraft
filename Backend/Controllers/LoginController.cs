using HandCrafter.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HandCrafter.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ApplicationContext _db;

        public LoginController(ApplicationContext db) => (_db) = (db);

        [HttpPost("LogIn")]
        public async Task<IResult> LogIn(ContactRequestModel contact)
        {
            var users = await _db.Contacts
                .Where(c => c.Password == contact.Password)
                .Where(c => contact.Email == c.Email || contact.Phone == c.Phone)
                .ToListAsync();
            int id = users[0].IdUser;
            return Results.Json(id);
        }


    }
}
