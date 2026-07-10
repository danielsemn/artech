use artech_db;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(11) NOT NULL UNIQUE, -- Armazena apenas os 11 números do CPF
    telefone VARCHAR(15),           -- Comporta formatos como (31) 99999-9999
    data_nascimento DATE NOT NULL,
    senha VARCHAR(255) NOT NULL,    -- Espaço ideal para armazenar a senha criptografada (Hash)
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM usuarios;
