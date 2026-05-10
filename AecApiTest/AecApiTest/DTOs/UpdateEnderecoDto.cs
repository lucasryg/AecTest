using System.ComponentModel.DataAnnotations;

namespace AecApiTest.DTOs
{
    public class UpdateEnderecoDto
    {
        [StringLength(9)]
        public string? Cep { get; set; }
        public string? Logradouro { get; set; }
        public string? Complemento { get; set; }
        public string? Bairro { get; set; }
        public string? Cidade { get; set; }

        [StringLength(2, MinimumLength = 2)]
        public string? Uf { get; set; }
        public string? Numero { get; set; }
    }
}
