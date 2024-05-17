using HandCrafter.DataBase;
using HandCrafter.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace HandCrafter.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ApplicationContext _db;

        public UserController(ApplicationContext db) => (_db) = (db);


        [HttpPost("UserPost")]
        public async Task<IActionResult> UserPost(UseresRequestModel newUser)
        {
            var user = new UserDB
            {
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                Patronymic = newUser.Patronymic,
                Description = newUser.Description,
                Birthday = newUser.Birhday,
                Contact = new ContactDB
                {
                    Email = newUser.Contact.Email,
                    Password = newUser.Contact.Password,
                    Phone = newUser.Contact.Phone,
                    IdRole = newUser.Contact.IdRole
                }
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("UsersGet")]
        public async Task<IResult> UsersGet()
        {
            var users = await _db.Users
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
                }).ToListAsync();

            return Results.Json(users);
        }

        [HttpGet("OneUserGet")]
        public async Task<IResult> OneUserGet(int id)
        {
            var user = await  _db.Users
                .Join(_db.Contacts,
                u => u.Id,
                c => c.IdUser,
                (u, c) => new
                {
                    Id = c.IdUser,
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
                .FirstOrDefaultAsync(j => j.Id == id);
            return Results.Json(user);
        }
    }
}
