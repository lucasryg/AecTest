using AecApiTest.DTOs;
using AecApiTest.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

            if (response == null)
                return Unauthorized(new { message = "Usuário ou senha inválidos." });

            return Ok(response);
        }

        [HttpPost("cadastro")]
        public async Task<IActionResult> Registrar([FromBody] RegisterRequest request)
        {
            var response = await authService.RegistrarAsync(request);

            if (!response)
            {
                return Conflict(new { message = "Username já está em uso." });
            }

            return Created(string.Empty, new { message = "Usuário criado com sucesso." });
        }

        [Authorize]
        [HttpGet("meusDados")]
        public async Task<IActionResult> MeusDados()
        {
            var usuarioId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var usuario = await authService.MeusDadosAsync(usuarioId);

            if (usuario == null)
            {
                return NotFound(new { message = "Usuário não encontrado." });
            }

            return Ok(usuario);
        }
    }
}