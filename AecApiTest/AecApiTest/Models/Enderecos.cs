using System;
using System.Collections.Generic;

namespace AecApiTest.Models;

public partial class Enderecos
{
    public int IdEndereco { get; set; }

    public string Cep { get; set; } = null!;

    public string Logradouro { get; set; } = null!;

    public string? Complemento { get; set; }

    public string Bairro { get; set; } = null!;

    public string Cidade { get; set; } = null!;

    public string Uf { get; set; } = null!;

    public string Numero { get; set; } = null!;

    public int IdUsuario { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Usuarios IdUsuarioNavigation { get; set; } = null!;
}
