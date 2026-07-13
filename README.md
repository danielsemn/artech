# ArTech

Este repositório contém um site institucional e de apresentação da ArTech, com páginas estáticas em HTML e processos de cadastro, login e envio de propostas em PHP.

## Requisitos

Para executar o projeto localmente, você precisará de:

- PHP 8+
- Apache ou Nginx
- MySQL/MariaDB
- Um ambiente como XAMPP, WAMP ou Laragon

## Como executar o projeto

1. Coloque a pasta do projeto dentro da pasta pública do seu servidor local, por exemplo:
   - XAMPP: `C:/xampp/htdocs/artech`
   - WAMP: `C:/wamp/www/artech`

2. Inicie os serviços:
   - Apache
   - MySQL

3. Acesse o projeto no navegador:
   - `http://localhost/artech/index.html`

> Observação: as páginas com formulário utilizam PHP, então o projeto precisa ser aberto através de um servidor local, e não apenas abrindo o arquivo diretamente no navegador.

## Banco de dados

O projeto utiliza MySQL com o nome do banco `artech_db`.

### 1) Criar o banco no MySQL Workbench

Abra o MySQL Workbench e execute:

```sql
CREATE DATABASE IF NOT EXISTS artech_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Depois use o banco:

```sql
USE artech_db;
```

### 2) Criar as tabelas

```sql
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome_completo VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  cpf VARCHAR(20) NOT NULL UNIQUE,
  telefone VARCHAR(20) DEFAULT NULL,
  data_nascimento DATE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```sql
CREATE TABLE IF NOT EXISTS projetos_propostas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) DEFAULT NULL,
  titulo_projeto VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  faixa_orcamentaria VARCHAR(100) DEFAULT NULL,
  prazo_desejado VARCHAR(100) DEFAULT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## O que alterar no PHP

Os arquivos PHP fazem conexão com o banco usando as variáveis abaixo:

- `html/cadastro.php`
- `html/login.php`
- `html/salvar-projeto.php`

No topo de cada um desses arquivos, você encontrará algo semelhante a:

```php
$host = 'localhost';
$dbname = 'artech_db';
$username = 'root';
$password = '';
```

### O que mudar

Se o seu ambiente usar outro usuário ou senha, ajuste estas linhas:

```php
$host = 'localhost';
$dbname = 'artech_db';
$username = 'seu_usuario';
$password = 'sua_senha';
```

Também pode ser necessário alterar o host se o MySQL estiver rodando em outro servidor, por exemplo:

```php
$host = '127.0.0.1';
```

## Como usar as páginas

- `index.html`: página inicial
- `html/sobre.html`: página institucional
- `html/produtos.html`: catálogo de produtos
- `html/contato.html`: página de contato
- `html/cadastro.html`: formulário de cadastro
- `html/cadastro.php`: processa o cadastro no banco
- `html/login.php`: autentica o usuário
- `html/salvar-projeto.php`: salva propostas de projeto

## Observações importantes

- Se o formulário não funcionar, confirme se:
  - o Apache e o MySQL estão ligados;
  - o banco `artech_db` existe;
  - as tabelas foram criadas;
  - as credenciais do PHP batem com as do seu MySQL.

- Se estiver usando uma instalação nova do MySQL e o usuário `root` estiver protegido por senha, troque `root` e `''` pelos seus dados corretos.
