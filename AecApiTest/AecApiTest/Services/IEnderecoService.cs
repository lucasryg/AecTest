using AecApiTest.DTOs;

namespace AecApiTest.Services
{
    public interface IEnderecoService
    {
        Task<List<EnderecoDto>> ListarAsync(int usuarioId);
        Task<EnderecoDto?> ObterPorIdAsync(int id, int usuarioId);
        Task<EnderecoDto> CriarAsync(CreateEnderecoDto dto, int usuarioId);
        Task<EnderecoDto?> AtualizarAsync(int id, UpdateEnderecoDto dto, int usuarioId);
        Task<bool> ExcluirAsync(int id, int usuarioId);
        Task<byte[]> ExportarCsvAsync(int usuarioId);
    }
}
