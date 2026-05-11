
using AecApiTest.DTOs;
using AecApiTest.Models;

namespace AecApiTest.Services
{
    public interface IAuthService
    {
        Task<LoginResponse?> LoginAsync(LoginRequest request);

        Task<bool> RegistrarAsync(RegisterRequest request);

        Task<UsuarioDto?> MeusDadosAsync(int usuarioId);
    }
}
