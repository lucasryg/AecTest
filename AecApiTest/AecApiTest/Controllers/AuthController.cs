using AecApiTest.DTOs;
using AecApiTest.Services;
using Microsoft.AspNetCore.Mvc;

namespace AecApiTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await authService.LoginAsync(request);    
            
            if(response == null)
                return Unauthorized(new {message = "Usuário ou senha inválidos."});   

            return Ok(response);
        }
    }
}