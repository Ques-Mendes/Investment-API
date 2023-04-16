# Desafio Técnico XP-Trybe

Aplicativo de investimento em ações, com algumas funcionalidade de conta digital.

Bem vindo(a) ao repositório do desafio técnico XP-Trybe desenvolvido por mim!!!

# Tomadas de decisões

Antes de iniciar o desenvolvimento da aplicação, escolhi a linguagem que iria utilizar e instalei os pacotes e libs necessários: 

- Typescript
  
  - Express, node.js, nodemon, http-status-codes, joi, mysql2, dotenv, cors, express-async-errors, JWT, eslint.

A opção por typescript se deve pelo fato de ser o conteúdo que estou aprendendo no momento na Trybe e por ter acreditado que facilitaria a manipulação dos parâmetros através do uso das interfaces.

Desenvolvi a aplicação em camadas (_Models_, _Service_ e _Controllers_), essa escolha foi visando manter a API organizada e com as responsabilidades divididas.

Criei um pequeno banco de dados ficticio para manusear as informações através do **MySQL**, escolha devida ao uso constante do mesmo.


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

5. Todos endpoints estão no padrão REST, basta utilizar os verbos `HTTP` adequado para cada operação

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

# Contrato dos Serviços

## Requisições para comprar investimento

- O endpoint é acessível através do caminho (`/orders/buy`)

<details>
<summary>O resultado retornado deverá ser conforme abaixo:</summary>

<br>

  - Caso os dados sejam enviados corretamente:
  - _status http_ `201`
```json
{
  "userId": 1,
  "stocksId": 3,
  "quantity": 10,
  "message": "Successfully done"
}
```

  - Caso a quantidade a ser comprada seja maior que a quantidade disponível na corretora:
  - _status http_  `400`
```json
{
  "message": "Insufficient avaiable stock to buy!"
}

```

</details>

## Requisições para vender investimentos

- O endpoint é acessível através do caminho (`/orders/sell`)

<details>
<summary>O resultado retornado deverá ser conforme abaixo:</summary>

<br>
  
  - Caso os dados sejam enviados corretamente:
  - _status http_ `200`
```json
{
  "userId": 1,
  "stocksId": 3,
  "quantity": 10,
  "message": "Successfully sold"
}
  
```
  
  - Caso a quantidade de ativo a ser vendida seja maior que a quantidade disponível na carteira:
  - _status http_  `400`
```json 
{
  "message": "You have insufficient stock to sell!"
}
  
```
  
<br>
  
## Requisições feita por cliente
  
  - O endpoint é acessível através do caminho (`/user/orders/:id`)

<details>
<summary>O resultado retornado deverá ser conforme abaixo:</summary>

<br>
  
  - _status http_ `200`
```json
 [
  {
    "userId": 2,
    "stocksId": 1,
    "quantity": 10,
    "cost": "350.00"
  }
]
```
 <br>
  
  ## Requisições feitas por ativos
  
  - O endpoint é acessível através do caminho (`/stocks/:id`)

<details>
<summary>O resultado retornado deverá ser conforme abaixo:</summary>

<br>
  
  - _status http_ `200`
```json
  {
    "id": 2,
    "quantity": 100,
    "cost": "350.00"
  }
```
  <br>
  
  
  ## Requisição para depósito em conta
  
   - O endpoint é acessível através do caminho (`/account/deposit`)
  
<details>
<summary>O resultado retornado deverá ser conforme abaixo:</summary>

<br>
  
  - _status http_ `200`
  
  
  - Caso a quantidade a ser depositada seja negativa ou igual a zero:
  - _status http_  `400`
```json
{
  "message": "Invalid value!"
} 
```
  
  <br>
  
  ## Requisição para saque da conta
  
  - O endpoint é acessível através do caminho (`/account/withdraw`)
  
<details>
<summary>O resultado retornado deverá ser conforme abaixo:</summary>

<br>
  
  - _status http_ `200`
  
  
  - Caso a quantidade a ser sacada seja negativa ou igual a zero:
  - _status http_  `400`
```json
{
  "message": "Invalid value!"
} 
```

  - Caso a quantidade a ser sacada seja maior que o saldo em conta:
  - _status http_  `400`
```json
{
  "message": "You have insufficient balance to withdraw from!"
}
```
  
  <br>
  
  ## Requisição para saldo da conta
  
  - O endpoint é acessível através do caminho (`/account/:id`)
  
<details>
<summary>O resultado retornado deverá ser conforme abaixo:</summary>

<br>
  
  - _status hhtp_ `200`
```json
{
  "id": 1,
  "balance": "500.00"
}
```

  -Caso o cliente não seja autorizado:
  - _status hhtp_ `401`
```json
{
  "message": "Unauthorized"
}
```

<br>

  ## Endpoint que lista as ações e suas respectivas quantidades vendidas  
  
  - O endpoint é acessível através do caminho (`/orders`)
  
<details>
<summary>O resultado retornado deverá ser conforme abaixo:</summary>

<br>
  
  - _status hhtp_ `200`
```json
[
  {
    "id": 1,
    "userId": 1,
    "stocksId": 3,
    "quantity": 10
  },
  {
    "id": 2,
    "userId": 3,
    "stocksId": 2,
    "quantity": 20
  },
  {
    "id": 3,
    "userId": 2,
    "stocksId": 1,
    "quantity": 30
  }
]
```
<br>
