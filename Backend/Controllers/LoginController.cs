﻿using HandCrafter.Model;
using HandCrafter.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HandCrafter.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly RegistrationService _registrationService;
        private readonly UserService _userService;
        private readonly TokenService _tokenService;

        public LoginController(RegistrationService registrationService, UserService userService, TokenService tokenService) => (_registrationService, _userService, _tokenService) = (registrationService, userService, tokenService);

        [HttpPost("LogIn")]
        public IResult LogIn(ContactRequestModel contact)
        {
            int id = _registrationService.LoginService(contact);
            string token = _tokenService.GetRefreshTokenService(120, id);
            return Results.Json(token);
        }
        
        [HttpPost("Registration")]
        public string Registration(UseresRequestModel newUser)
        {
            _userService.AddUserService(newUser);
            int id = _registrationService.RegistrationUserService(newUser.Contact);
            string token  = _tokenService.GetRefreshTokenService(120, id);
            return token;
        }

        


    }
}
