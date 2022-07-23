# Desafio Técnico XP-Trybe

Aplicativo de investimento em ações, com algumas funcionalidade de conta digital.

Bem vindo(a) ao repositório do desafio técnico XP-Trybe desenvolvido por mim!!!

# Tomadas de decisões

Antes de iniciar o desenvolvimento da aplicação escolhi a linguagem que iria utilizar e instalei os pacotes e libs necessários: 

- Typescript
  
  - Express, nodemon, http-status-codes, joi, mysql2, dotenv, cors, express-async-errors.

A opção por typescript se deve por ter sido o conteúdo que estamos aprendendo no momento na Trybe e por ter achado que facilitaria a manipulação dos parametros através do uso das interfaces.

Desenvolvi a aplicação em camadas (_Models_, _Service_ e _Controllers_), essa escolha foi visando manter a API organizada e com as responsabilidades divididas.

Criei um pequeno banco de dados ficticio para manusear as informações através do **MySQL**, escolha esta devida pelo já uso constante do mesmo.


# Instruções de como compilar e executar o projeto

1. Clone o repositório

- `git clone https://github.com/Ques-Mendes/desafioXP.git`
- Entre na pasta do repositório que você acabou de clonar:
  - `cd desafioXP`

2. Instale as dependências

  - `npm install`

3. Faça a conexão do banco local através de variavéis de ambiente e passe os seguintes parâmetros:

  ```typescript
  import dotenv from 'dotenv';
  import mysql from 'mysql2/promise';

  dotenv.config();

  const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    db: process.env.MYSQL_DB,
  }); 

  export default connection;
  ```

4. O projeto deve rodar na porta **3000** 

5. Todos endpoints estão no padrão REST, basta utilizar os verbos `HTTP` que seja o adequado para cada operação

  - `GET` ou `POST`

<details>
  <summary><strong>Tabelas</strong></summary><br />

  O banco (ficticio) possui três tabelas : pessoa usuária(Users), ações(Stocks) e ordens(Orders).

  ```sql
  DROP SCHEMA IF EXISTS Investments;
CREATE SCHEMA IF NOT EXISTS Investments;

USE Investments;

CREATE TABLE Users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  balance DECIMAL(6,2) NOT NULL
);

CREATE TABLE Stocks (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  quantity INTEGER,
  cost DECIMAL(5, 2) NOT NULL
);

CREATE TABLE Orders (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  userId INTEGER,
  stocksId INTEGER,
  quantity INTEGER,
  FOREIGN KEY (userId) REFERENCES Users (id),
  FOREIGN KEY (stocksId) REFERENCES Stocks (id)
);

SET SQL_SAFE_UPDATES = 0;

INSERT INTO
  Users (email, password, balance)
VALUES
  ("xpto@gml.com", "12345X", 500.00);
  
INSERT INTO
  Users (email, password, balance)
VALUES
  ("user1@gmail.com", "diamond", 500.00);

INSERT INTO
  Users (email, password, balance)
VALUES
  ("user2@gmail.com", "gold123", 500.00);
  
INSERT INTO
  Stocks (quantity, cost)
VALUES
  (100, 350.00);

INSERT INTO
  Stocks (quantity, cost)
VALUES
  (100, 350.00);

INSERT INTO
  Stocks (quantity, cost)
VALUES
  (100, 350.00);
  
INSERT INTO
  Orders (userId, stocksId, quantity)
VALUES
  (1, 3, 10);

INSERT INTO
  Orders (userId, stocksId, quantity)
VALUES
  (3, 2, 20);
  
INSERT INTO
  Orders (userId, stocksId, quantity)
VALUES
  (2, 1, 30);
```

</details>

