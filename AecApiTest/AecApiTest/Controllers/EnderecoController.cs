using AecApiTest.DTOs;
using AecApiTest.Models;
using AecApiTest.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AecApiTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.Cliente)]
    public class EnderecoController(IEnderecoService enderecoService) : ControllerBase
    {
        private int UsuarioId => int.Parse(User.Claims.First(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value);

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var enderecos = await enderecoService.ListarAsync(UsuarioId);

            return Ok(enderecos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorId(int id)
        {
            var endereco = await enderecoService.ObterPorIdAsync(id, UsuarioId);

            if (endereco == null)
            {
                return NotFound(new { message = "Endereço não econtrado." });
            }

            return Ok(endereco);
        }

        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] CreateEnderecoDto dto)
        {
            var endereco = await enderecoService.CriarAsync(dto, UsuarioId);

            return CreatedAtAction(nameof(ObterPorId), new { id = endereco.Id }, endereco);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, [FromBody] UpdateEnderecoDto dto)
        {
            var endereco = await enderecoService.AtualizarAsync(id, dto, UsuarioId);

            if (endereco == null)
            {
                return NotFound(new { message = "Endereço não encontrado." });
            }

            return Ok(endereco);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            var excluido = await enderecoService.ExcluirAsync(id, UsuarioId);

            if (!excluido)
            {
                return NotFound(new { message = "Endereço não encontrado." });
            }

            return NoContent();
        }

        [HttpGet("exportar/csv")]
        public async Task<IActionResult> ExportarCsv()
        {
            var csv = await enderecoService.ExportarCsvAsync(UsuarioId);

            return File(csv, "text/csv", "enderecos.csv");
        }
    }
}