<?php
header('Content-Type: application/json; charset=utf-8');

$host = 'localhost';
$dbname = 'artech_db';
$username = 'root';
$password = '';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Método inválido.']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $nome = trim(filter_input(INPUT_POST, 'nome_completo', FILTER_SANITIZE_SPECIAL_CHARS));
    $email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
    $cpf = trim(filter_input(INPUT_POST, 'cpf', FILTER_SANITIZE_SPECIAL_CHARS));
    $telefone = trim(filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_SPECIAL_CHARS));
    $dataNascimento = trim(filter_input(INPUT_POST, 'data_nascimento', FILTER_SANITIZE_SPECIAL_CHARS));
    $senha = $_POST['senha'] ?? '';
    $confirmarSenha = $_POST['confirmar_senha'] ?? '';

    if (!$nome || !$email || !$cpf || !$dataNascimento || !$senha || !$confirmarSenha) {
        echo json_encode(['status' => 'error', 'message' => 'Preencha todos os campos obrigatórios.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Informe um e-mail válido.']);
        exit;
    }

    if (strlen($cpf) !== 11 || !ctype_digit($cpf)) {
        echo json_encode(['status' => 'error', 'message' => 'O CPF deve conter exatamente 11 dígitos.']);
        exit;
    }

    if ($senha !== $confirmarSenha) {
        echo json_encode(['status' => 'error', 'message' => 'As senhas não coincidem.']);
        exit;
    }

    if (strlen($senha) < 6) {
        echo json_encode(['status' => 'error', 'message' => 'A senha deve ter pelo menos 6 caracteres.']);
        exit;
    }

    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (nome_completo, email, cpf, telefone, data_nascimento, senha)
            VALUES (:nome_completo, :email, :cpf, :telefone, :data_nascimento, :senha)";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nome_completo', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':cpf', $cpf);
    $stmt->bindParam(':telefone', $telefone);
    $stmt->bindParam(':data_nascimento', $dataNascimento);
    $stmt->bindParam(':senha', $senhaHash);

    $stmt->execute();

    echo json_encode(['status' => 'success', 'message' => 'Cadastro realizado com sucesso!']);
} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        echo json_encode(['status' => 'error', 'message' => 'E-mail ou CPF já cadastrados.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao conectar com o banco: ' . $e->getMessage()]);
    }
}
