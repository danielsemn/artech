CREATE DATABASE IF NOT EXISTS artech_db;
USE artech_db;

CREATE TABLE IF NOT EXISTS projetos_propostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) DEFAULT NULL,
    titulo_projeto VARCHAR(200) NOT NULL,
    descricao TEXT NOT NULL,
    faixa_orcamentaria VARCHAR(100) DEFAULT NULL,
    prazo_desejado VARCHAR(100) DEFAULT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_proposta VARCHAR(50) DEFAULT 'Pendente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SELECT * FROM projetos_propostas;