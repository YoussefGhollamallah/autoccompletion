<?php

use function PHPSTORM_META\type;

require_once "dbconnexion.php";

header("Content-Type: application/json");

$search = $_GET['search'] ?? '';

try {
    $conn = (new Connexion())->connect();
    $stmt = $conn->prepare("SELECT * FROM pokemon WHERE nom LIKE :search");
    $stmt->execute(['search' => "%$search%"]);
    $pokemons = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($pokemons);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}