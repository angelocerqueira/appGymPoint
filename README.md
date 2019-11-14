<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/.github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Desafio 2: Gympoint, o início
</h3>

<blockquote align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>





## :rocket: Sobre o desafio

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app gerenciador de academia, o **Gympoint**.

Esse projeto será desenvolvido aos poucos até o fim da sua jornada onde você terá uma aplicação completa envolvendo back-end, front-end e mobile!

### Um pouco sobre as ferramentas

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgreSQL ou MySQL);

### Funcionalidades

#### 1. Autenticação

Permitir que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.

Criar um usuário administrador utilizando a funcionalidade de [seeds do sequelize](https://sequelize.org/master/manual/migrations.html#creating-first-seed), essa funcionalidade serve para criarmos registros na base de dados de forma automatizada.



Agora temos um usuário na base de dados.  Esse usuário srá usado para todos logins daqui pra frente.

- Autenticação feita utilizando JWT.
- Realizar a validação dos dados de entrada;

#### 2. Cadastro de alunos

Permitir que alunos sejam mantidos (cadastrados/atualizados) na aplicação utilizando nome, email, idade, peso e altura.

Utilizar uma nova tabela no banco de dados chamada `students`.

O cadastro de alunos só pode ser feito por administradores autenticados na aplicação.

O aluno não pode se autenticar no sistema, ou seja, não possui senha.


## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

## DESAFIO ROCKETSEAT! #GOSTACK 
