# Sistema do BACK

O projeto de back-end consiste em uma API desenvolvida em NodeJS, com integração ao banco de dados MongoDB. A API permite o cadastro e autenticação de usuários, com validações de formulário para garantir a segurança dos dados. A autenticação é realizada com o uso de tokens JWT (JSON Web Tokens) e a geração de hash para a senha é realizada com a biblioteca bcrypt.

A API possui rotas para registro de usuários, login e logout. O registro de usuários envolve a validação dos dados fornecidos pelo usuário, como nome, e-mail e senha. Essa validação é realizada com o uso de bibliotecas como Express Validator.

A autenticação é feita com o uso de tokens JWT, que são gerados quando o usuário faz login na aplicação. Esse token é armazenado no localStorage do navegador do usuário e é usado para autenticar as requisições subsequentes feitas à API. O uso de tokens JWT é importante para garantir a segurança da aplicação, pois permite que o servidor valide a identidade do usuário em cada requisição.

Para garantir a segurança da senha do usuário, a API utiliza a biblioteca bcrypt para gerar um hash da senha antes de armazená-la no banco de dados. Isso garante que a senha não possa ser lida por terceiros, mesmo que o banco de dados seja comprometido.

A integração com o banco de dados MongoDB é feita com o uso da biblioteca mongoose. Isso permite que os dados dos usuários sejam armazenados de forma estruturada e escalável. O MongoDB também é uma boa escolha para a API devido à sua flexibilidade e facilidade de integração com NodeJS.

Por fim, a API foi desenvolvida com o uso de padrões de projeto como MVC (Model-View-Controller) e SOLID (Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion), para garantir a manutenção, escalabilidade e testabilidade do código.


Link para o front-end: https://github.com/Matheus-Loubach/Sistema_Login_Register-Front 
