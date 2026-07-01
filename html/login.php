<?php
session_start();
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

    $email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
    $senha = $_POST['senha'] ?? '';

    if (!$email || !$senha) {
        echo json_encode(['status' => 'error', 'message' => 'Informe e-mail e senha.']);
        exit;
    }

    $stmt = $pdo->prepare('SELECT id, nome_completo, senha FROM usuarios WHERE email = :email LIMIT 1');
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $cliente = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($cliente && password_verify($senha, $cliente['senha'])) {
        $_SESSION['cliente_id'] = $cliente['id'];
        $_SESSION['cliente_nome'] = $cliente['nome_completo'];
        $_SESSION['cliente_email'] = $email;

        echo json_encode(['status' => 'success', 'message' => 'Login realizado com sucesso.', 'nome' => $cliente['nome_completo']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'E-mail ou senha inválidos.']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao conectar com o banco: ' . $e->getMessage()]);
}
