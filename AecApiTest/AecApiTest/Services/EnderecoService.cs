using AecApiTest.Data;
using AecApiTest.DTOs;
using AecApiTest.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace AecApiTest.Services
{
    public class EnderecoService(AppDbContext db) : IEnderecoService
    {
        public async Task<List<EnderecoDto>> ListarAsync(int usuarioId)
        {
            return await db.Enderecos
                .Where(e => e.IdUsuario == usuarioId)
                .Select(e => ToDto(e))
                .ToListAsync();
        }

        public async Task<EnderecoDto?> ObterPorIdAsync(int id, int usuarioId)
        {
            var endereco = await db.Enderecos
                .FirstOrDefaultAsync(e => e.IdEndereco == id && e.IdUsuario == usuarioId);

            return endereco is null ? null : ToDto(endereco);
        }

        public async Task<EnderecoDto> CriarAsync(CreateEnderecoDto dto, int usuarioId)
        {
            var endereco = new Enderecos
            {
                Cep = dto.Cep,
                Logradouro = dto.Logradouro,
                Complemento = dto.Complemento,
                Bairro = dto.Bairro,
                Cidade = dto.Cidade,
                Uf = dto.Uf,
                Numero = dto.Numero,
                IdUsuario = usuarioId,
                CreatedAt = DateTime.Now
            };

            db.Enderecos.Add(endereco);

            await db.SaveChangesAsync();

            return ToDto(endereco);
        }

        public async Task<EnderecoDto?> AtualizarAsync(int id, UpdateEnderecoDto dto, int usuarioId)
        {
            var endereco = await db.Enderecos
                .FirstOrDefaultAsync(e => e.IdEndereco == id && e.IdUsuario == usuarioId);

            if (endereco is null) return null;

            if (dto.Cep is not null) endereco.Cep = dto.Cep;
            if (dto.Logradouro is not null) endereco.Logradouro = dto.Logradouro;
            if (dto.Complemento is not null) endereco.Complemento = dto.Complemento;
            if (dto.Bairro is not null) endereco.Bairro = dto.Bairro;
            if (dto.Cidade is not null) endereco.Cidade = dto.Cidade;
            if (dto.Uf is not null) endereco.Uf = dto.Uf;
            if (dto.Numero is not null) endereco.Numero = dto.Numero;

            await db.SaveChangesAsync();

            return ToDto(endereco);
        }

        public async Task<bool> ExcluirAsync(int id, int usuarioId)
        {
            var endereco = await db.Enderecos
                .FirstOrDefaultAsync(e => e.IdEndereco == id && e.IdUsuario == usuarioId);

            if (endereco is null) return false;

            db.Enderecos.Remove(endereco);
            await db.SaveChangesAsync();

            return true;
        }

        public async Task<byte[]> ExportarCsvAsync(int usuarioId)
        {
            var enderecos = await db.Enderecos.Where(e => e.IdUsuario == usuarioId).ToListAsync();

            var sb = new StringBuilder();

            sb.Append("Id,Cep,Logradouro,Complemento,Bairro,Cidade,Uf,Numero,CreatedAt");

            foreach (var campos in enderecos)
            {
                sb.Append($"{campos.IdEndereco},{campos.Cep},{campos.Logradouro},{campos.Complemento},{campos.Bairro},{campos.Cidade},{campos.Uf},{campos.Numero},{campos.CreatedAt:O}\n");
            }

            return Encoding.UTF8.GetBytes(sb.ToString());
        }

        private static EnderecoDto ToDto(Enderecos e) => new()
        {
            Id = e.IdEndereco,
            Cep = e.Cep,
            Logradouro = e.Logradouro,
            Complemento = e.Complemento,
            Bairro = e.Bairro,
            Cidade = e.Cidade,
            Uf = e.Uf,
            Numero = e.Numero
        };
    }
}
