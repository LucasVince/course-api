<h1>Documentação da API CRUD Básica para Estudo de Arquitetura</h1>
<h2>📌 Visão Geral</h2>
Esta é uma API REST básica desenvolvida como estudo de arquitetura e boas práticas, implementando operações CRUD (Create, Read, Update, Delete) para usuários usando Node.js, Express e MongoDB.

<h3>🏗️ Arquitetura do Projeto</h3>
Estrutura de Diretórios

<pre>
  <code>
app/
├── src/
│   ├── controllers/          # Lógica de tratamento de requisições HTTP
│   │   ├── delete-user/      # Controller para deletar usuários
│   │   ├── get-users/        # Controller para listar usuários
│   │   ├── post-user/        # Controller para criar usuários
│   │   ├── update-user/      # Controller para atualizar usuários
│   │   ├── protocols.ts      # Tipos e interfaces compartilhados
│   │   └── helpers.ts        # Funções auxiliares para respostas HTTP
│   ├── database/
│   │   └── mongo.ts          # Configuração da conexão com MongoDB
│   ├── factories/            # Fábricas para injetar dependências
│   │   ├── delete-user-factory/
│   │   ├── get-users-factory/
│   │   ├── post-user-factory/
│   │   └── update-user-factory/
│   ├── models/               # Modelos de dados
│   │   └── user.ts           # Modelo de usuário
│   ├── repositories/         # Camada de acesso a dados
│   │   ├── delete-user-repository/
│   │   ├── get-users-repository/
│   │   ├── post-user-repository/
│   │   └── update-user-repository/
│   └── index.ts              # Ponto de entrada da aplicação
├── .gitignore
├── eslint.config.mjs         # Configuração do ESLint
├── package.json
├── tsconfig.json             # Configuração do TypeScript
└── yarn.lock
  </code>
</pre>

<h2>🔧 Tecnologias Utilizadas</h2>
<ul>
  <li>Node.js: Ambiente de execução JavaScript</li>
  <li>Express: Framework para construção da API</li>
  <li>TypeScript: Tipagem estática para JavaScript</li>
  <li>MongoDB: Banco de dados NoSQL</li>
  <li>Bcrypt: Para hash de senhas</li>
  <li>Validator: Para validação de e-mails</li>
  <li>ESLint: Padronização de código</li>
</ul>

<h2>🚀 Rotas da API</h2>

<h3>GET <code>/users</code></h3>
Descrição: Lista todos os usuários cadastrados

Resposta de Sucesso:

<pre>
  <code>
{
  "statusCode": 200,
  "body": [
    {
      "id": "123",
      "name": "João Silva",
      "email": "joao@example.com"
    }
  ]
}
  </code>
</pre>

<h3>Post <code>/users</code></h3>
Descrição: Cria um novo usuário

Parâmetros:
  <ul>
    <li>Nome: Nome do usuario</li>
    <li>Senha: Senha de acesso</li>
    <li>Email: email do usuario</li>
  </ul>
Corpo da Requisição:

<pre>
  <code>
{
  "name": "Maria Souza",
  "email": "maria@example.com",
  "password": "senha123"
}
  </code>
</pre>

Resposta de Sucesso:

<pre>
  <code>
{
  "statusCode": 201,
  "body": "Usuário criado com sucesso"
}
  </code>
</pre>

<h3>PATCH <code>/users/id:</code></h3>
Descrição: Atualiza um usuário existente
Parâmetros:
  <ul>
    <li>id: ID do usuário a ser atualizado</li>
  </ul>

Corpo da Requisição:
<pre>
  <code>
{
  "name": "Maria Souza Silva"
}
  </code>
</pre>
Resposta de Sucesso:

<pre>
  <code>
{
  "statusCode": 200,
  "body": "Usuário atualizado com sucesso"
}
  </code>
</pre>

<h3>DELETE <code>/users/id:</code></h3>
Descrição: deleta um usuário no banco
Parâmetros:
  <ul>
    <li>id: ID do usuário a ser deletado</li>
  </ul>
Resposta de Sucesso:

<pre>
  <code>
{
  "statusCode": 200,
  "body": "Usuário removido com sucesso"
}
  </code>
</pre>

<h2>🧩 Padrões de Projeto Implementados</h2>
1. Injeção de Dependências
Factories: Usadas para criar instâncias de controllers com suas dependências
<pre>
  <code>
export const getUsersFactory = () => {
  const MongoGetusersRepository = new mongoGetusersRepository();
  const GetUsersController = new getUsersController(MongoGetusersRepository);
  return GetUsersController;
};
  </code>
</pre>

2. Separação de Responsabilidades
Controllers: Tratam a lógica HTTP
<ul>
  <li>Controllers: Tratam a lógica HTTP</li>
  <li>Repositories: Gerenciam o acesso ao banco de dados</li>
  <li>Models: Definem a estrutura dos dados</li>
  <li>Helpers: Funções utilitárias compartilhadas</li>
</ul>

3. Padronização de Respostas
Helpers padronizam as respostas HTTP:
<pre>
  <code>
export const ok = (message: string | user[]) => {
  return {
    statusCode: HttpStatusCode.OK,
    body: message
  };
};
  </code>
</pre>

<h2>🔄 Fluxo de Requisição</h2>

<ul>
  <li>Rota (index.ts) recebe requisição</li>
  <li>Factory cria controller com repositório injetado</li>
  <li>Controller processa requisição</li>
  <li>Repository interage com o banco de dados</li>
  <li>Controller retorna resposta padronizada</li>
</ul>

<h2>⚙️ Configurações Importantes</h2>
<h3>Banco de Dados (MongoDB)</h3>
no arquivo <code>src/database/mongo.ts</code>

<pre>
  <code>
const url = process.env.MONGO_URL || "localhost:27017";
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
  </code>
</pre>
<h3>Variáveis de Ambiente</h3>
<code>.env</code> necessário (não versionado):

<pre>
  <code>
MONGO_URL=
MONGO_USERNAME=
MONGO_PASSWORD=
  </code>
</pre>
