using AecApiTest.Data;
using AecApiTest.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AecApiTest.Services
{
    public class AuthService(AppDbContext context, IConfiguration configuration) : IAuthService
    {
        public async Task<LoginResponse?> LoginAsync(LoginRequest request)
        {
            string hash = "";

            var usuario = await context.Usuarios.FirstOrDefaultAsync(u => u.Usuario == request.Username);

            if (usuario != null)
            {
                hash = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);
            }

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(request.Password, hash))
            {
                return null;
            }

            var token = GerarToken(usuario.IdUsuario, usuario.Usuario, usuario.Role);

            return token;
        }

        private LoginResponse GerarToken(int usuarioid, string username, string role)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiracao = DateTime.UtcNow.AddMinutes(double.Parse(configuration["Jwt:ExpiresInMinutes"]));

            var claims = new[]
            {
                new System.Security.Claims.Claim(JwtRegisteredClaimNames.Sub, usuarioid.ToString()),
                new System.Security.Claims.Claim(JwtRegisteredClaimNames.UniqueName, username),
                new System.Security.Claims.Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new System.Security.Claims.Claim(ClaimTypes.Role, role)
            };

            var token = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: expiracao,
                signingCredentials: creds
            );

            return new LoginResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpiresAt = expiracao
            };
        }
    }
}
