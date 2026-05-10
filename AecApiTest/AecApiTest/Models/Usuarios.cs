using System;
using System.Collections.Generic;

namespace AecApiTest.Models;

public partial class Usuarios
{
    public int IdUsuario { get; set; }

    public string Nome { get; set; } = null!;

    public string Usuario { get; set; } = null!;

    public string Senha { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public string Role { get; set; } = null!;   

    public virtual ICollection<Enderecos> Enderecos { get; set; } = new List<Enderecos>();
}
