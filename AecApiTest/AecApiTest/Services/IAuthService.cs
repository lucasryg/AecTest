
using AecApiTest.DTOs;

namespace AecApiTest.Services
{
    public interface IAuthService
    {
        Task<LoginResponse?> LoginAsync(LoginRequest request);
    }
}
