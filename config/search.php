<?php
session_start();
require_once "dbconnexion.php";

header("Content-Type: text/plain");

$search = $_GET['search'] ?? '';

try {
    $conn = (new Connexion())->connect();
    $stmt = $conn->prepare("SELECT id, nom FROM pokemon WHERE nom LIKE :search");
    $stmt->execute(['search' => "%" . $search . "%"]);
    $pokemons = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Renvoie chaque nom de Pokémon sur une nouvelle ligne avec l'identifiant
    foreach ($pokemons as $pokemon) {
        echo $pokemon['id'] . '|' . $pokemon['nom'] . "\n";
    }

    // Renvoie les recherches précédentes
    echo "---PREVIOUS_SEARCHES---\n";
    if (isset($_SESSION['searches'])) {
        foreach ($_SESSION['searches'] as $previousSearch) {
            $stmt = $conn->prepare("SELECT id, nom FROM pokemon WHERE nom = :name");
            $stmt->execute(['name' => $previousSearch]);
            $previousPokemon = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($previousPokemon) {
                echo $previousPokemon['id'] . '|' . $previousPokemon['nom'] . "\n";
            }
        }
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo "Erreur : " . $e->getMessage();
}