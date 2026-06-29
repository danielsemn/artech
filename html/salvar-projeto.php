<?php
// Configurações do banco de dados
$host     = 'localhost';
$dbname   = 'artech_db';
$username = 'root';
$password = '';

// Define o cabeçalho para retornar JSON
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Conexão com o banco via PDO
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Coleta e sanitiza os dados do formulário
        $nome = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
        $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        $telefone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_SPECIAL_CHARS);
        $titulo = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_SPECIAL_CHARS);
        $descricao = filter_input(INPUT_POST, 'description', FILTER_SANITIZE_SPECIAL_CHARS);
        $orcamento = filter_input(INPUT_POST, 'budget', FILTER_SANITIZE_SPECIAL_CHARS);
        $prazo = filter_input(INPUT_POST, 'deadline', FILTER_SANITIZE_SPECIAL_CHARS);

        // Validação simples dos campos obrigatórios
        if (!$nome || !$email || !$titulo || !$descricao) {
            echo json_encode(['status' => 'error', 'message' => 'Por favor, preencha todos os campos obrigatórios corretamente.']);
            exit;
        }

        // Prepara a Query SQL para evitar SQL Injection
        $sql = "INSERT INTO projetos_propostas (nome, email, telefone, titulo_projeto, descricao, faixa_orcamentaria, prazo_desejado) 
                VALUES (:nome, :email, :telefone, :titulo, :descricao, :orcamento, :prazo)";
        
        $stmt = $pdo->prepare($sql);

        // Vincula os parâmetros
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefone', $telefone);
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':descricao', $descricao);
        $stmt->bindParam(':orcamento', $orcamento);
        $stmt->bindParam(':prazo', $prazo);

        // Executa
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Proposta enviada com sucesso! Nossa equipe entrará em contato.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erro ao salvar a proposta. Tente novamente mais tarde.']);
        }

    } catch (PDOException $e) {
        // Em produção, mude para uma mensagem genérica e salve o $e->getMessage() em um log
        echo json_encode(['status' => 'error', 'message' => 'Erro de conexão com o banco: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método de requisição inválido.']);
}