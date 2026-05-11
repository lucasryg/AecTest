using AecApiTest.Data;
using AecApiTest.DTOs;
using AecApiTest.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AecApiTest.Services
{
    public class AuthService(AppDbContext db, IConfiguration configuration) : IAuthService
    {
        public async Task<LoginResponse?> LoginAsync(LoginRequest request)
        {
            string hash = "";

            var usuario = await db.Usuarios.FirstOrDefaultAsync(u => u.Usuario == request.Username);

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

        public async Task<UsuarioDto?> MeusDadosAsync(int usuarioId)
        {
            var usuario = await db.Usuarios.FindAsync(usuarioId);

            if (usuario is null) return null;

            return new UsuarioDto
            {
                Id = usuario.IdUsuario,
                Username = usuario.Usuario,
                Role = usuario.Role
            };
        }

        public async Task<bool> RegistrarAsync(RegisterRequest request)
        {
            var existeUser = await db.Usuarios.AnyAsync(u => u.Usuario == request.Username);

            if (existeUser)
            {
                return false;
            }

            var usuario = new Usuarios
            {
                Usuario = request.Username,
                Senha = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = Roles.Cliente
            };

            db.Usuarios.Add(usuario);

            await db.SaveChangesAsync();

            return true;
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
