# 🏠 perto.casa

Projeto web para gerenciamento de endereços desenvolvido para estudos e prática de desenvolvimento full stack.

O sistema permite:

- Cadastro e login de usuários
- Autenticação com JWT
- CRUD de endereços
- Busca automática de CEP via ViaCEP
- Exportação de endereços em CSV

---

## 🛠️ Tecnologias utilizadas

### Frontend
- React
- Axios
- TailwindCSS
- Context API

### Backend
- ASP.NET Core
- Entity Framework Core
- SQL Server
- JWT Authentication

---

## 🚀 Como executar o projeto

### Backend

```bash
cd backend

dotnet restore
dotnet ef database update
dotnet run

🔑 Configurações

Atualmente algumas chaves e configurações sensíveis estão diretamente no código apenas por se tratar de um projeto de estudos/teste.

Tenho consciência de que o ideal seria utilizar:

Variáveis de ambiente
User Secrets
Arquivos .env
Serviços seguros de gerenciamento de segredos

Em projetos reais ou ambientes de produção, essas informações não deveriam ficar expostas no repositório.

📌 Observações

Este projeto foi desenvolvido com foco em aprendizado e evolução prática em:

APIs REST
Autenticação JWT
Integração frontend/backend
Manipulação de estado no React
Organização de projeto full stack
