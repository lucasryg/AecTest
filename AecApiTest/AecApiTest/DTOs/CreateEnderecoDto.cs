using System.ComponentModel.DataAnnotations;

namespace AecApiTest.DTOs
{
    public class CreateEnderecoDto
    {
        [Required]
        [StringLength(9)]
        public string Cep { get; set; } = string.Empty;

        [Required]
        public string Logradouro { get; set; } = string.Empty;

        public string? Complemento { get; set; }

        [Required]
        public string Bairro { get; set; } = string.Empty;

        [Required]
        public string Cidade { get; set; } = string.Empty;

        [Required]
        [StringLength(2, MinimumLength = 2)]
        public string Uf { get; set; } = string.Empty;

        [Required]
        public string Numero { get; set; } = string.Empty;
    }
}
