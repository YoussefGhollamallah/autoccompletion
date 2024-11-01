<?php
require_once "dbconnexion.php";

header("Content-Type: text/plain");

$search = $_GET['search'] ?? '';

try {
    $conn = (new Connexion())->connect();
    $stmt = $conn->prepare("SELECT nom FROM pokemon WHERE nom LIKE :search");
    $stmt->execute(['search' => "%" . $search . "%"]);
    $pokemons = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Renvoie chaque nom de Pokémon sur une nouvelle ligne
    echo implode("\n", $pokemons);
} catch (PDOException $e) {
    http_response_code(500);
    echo "Erreur : " . $e->getMessage();
}