# NG-Transactions-System
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/GabrielSS187/NG-Transactions-System/blob/main/LICENSE) 
![Design-sem-nome-(1)-transformed](https://user-images.githubusercontent.com/86306877/210930990-307fc3ae-b06e-4c9b-b569-b2dc2f08eeff.png)


# Sobre o projeto

### Link: [NG Transactions System](https://ng-transactions-system.vercel.app/)

``NG-Transactions-System`` É um aplicativo full stack web, moderno e responsivo para todas os tamanhos de tela.

A aplicação ``NG Transações`` consiste em ser uma carteira digital.
Onde você pode enviar e receber dinheiro entre usuários que possuam uma conta ``NG``.
Além de ter notificações e atualizações dos dados em tempo real. Dentre outras funcionalidades
extras que o app web possui.

## Layout Desktop. Com demostração
https://user-images.githubusercontent.com/86306877/210931175-0e61967a-ec2a-4def-8dbf-5a729d725e49.mp4

## Layout Mobile e Tablet. Com demostração
https://user-images.githubusercontent.com/86306877/210931205-5b5df8d6-dc79-46cc-9e6b-f42f9c81c8b7.mp4

# Modelagem Conceitual de Dados
![allS](https://user-images.githubusercontent.com/86306877/210934516-c4d35fad-49c0-4453-b7a3-0774289bc91e.png)

## Competências
- Semântica
- Responsividade
- Boas Práticas
- Princípios S.O.L.I.D
- Design Patterns
- Clean Code
- Deploy na nuvem
- Gerenciamentos de estados e cache

# Tecnologias utilizadas

## Conteiner
- Docker

## Banco de dados
- Postgres Sql

## Deploy na nuvem
- Aplicação web : Vercel
- Back end : Render
- Banco de dados : Railway / AWS

## Front end
- HTML / CSS / JS / TypeScript
- React JS/TS
- Next JS/TS
- Tailwind Css
- Axios
- Stripe
- Nookies
- React-awesome-reveal
- Phosphor-react
- React-google-charts
- React-hook-form
- React-Modal
- React-toastify
- React-query
- Lottie-react
- Sharp
- Swiper
- Flowbite

## Back end
- Node Js
- TypeScript
- Cors
- Express Js
- Knex Js
- Multer
- Jsonwebtoken
- Nodemailer
- Yup
- Bcryptjs


# Como executar o projeto na sua maquina

### 1 - Container com ( Docker )
#### Pré-requisitos: Docker instalado na sua maquina
```bash
# 1 - clonar repositório
https://github.com/GabrielSS187/NG-Transactions-System.git

# 2 - entrar na pasta
cd NG-Transactions-System

# 3 - rodar o docker
docker-compose up --build
```
### Caso tudo de certo o projeto deverá esta rodando no endereço: http://localhost:3000

### 2 - Localmente
#### Pré-requisitos: npm / yarn, postgresSql
#### É preencher as variáveis de ambiente das pastas back-end é front-end

```bash
# 1 - clonar repositório
https://github.com/GabrielSS187/NG-Transactions-System.git

# 2 - Back-end ============================================================================================================
# 1 - entrar na pasta NG-Transactions-System e depois back-end
cd NG-Transactions-System/back-end

# 2 - instalar as dependências
npm install

# 3 - Gerar as migrações para o banco de dados
npm run migrate:latest

# 4 - executar o projeto e depois espere o servidor aparecer a messagem: "Server is running in http://localhost:8000"
npm run dev
# ===========================================================================================================================

# 5 - voltar para a pasta pai que é NG-Transactions-System
cd ..

# 6 - Front-end ============================================================================================================
# 1 -Entrar na pasta front-end
cd front-end

# 2 - instalar as dependências
npm install

# 3 - executar o projeto
npm run dev
# ===========================================================================================================================
```
### Caso tudo de certo o projeto deverá esta rodando no endereço: http://localhost:3000

# Autor

Gabriel Silva Souza

https://www.linkedin.com/in/gabriel-silva-souza-developer


