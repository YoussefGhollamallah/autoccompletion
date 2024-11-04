<?php
require_once "config/dbconnexion.php";

$id = $_GET['id'] ?? '';

if ($id) {
    try {
        $conn = (new Connexion())->connect();
        $stmt = $conn->prepare("SELECT nom, type_principal, type_secondaire FROM pokemon WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $pokemon = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo "Erreur : " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>Détails du Pokémon</title>
</head>
<body>

    <main>
        <article class="card">
            <h2>Nom : <?php echo htmlspecialchars($pokemon["nom"]); ?></h2>
            <p>Type : <?php echo htmlspecialchars($pokemon["type_principal"]); ?></p>
            <?php if ($pokemon["type_secondaire"]) : ?>
                <p>Type Secondaire : <?php echo htmlspecialchars($pokemon["type_secondaire"]); ?></p>
            <?php endif; ?>
            <a href="index.php">Accueil</a>
        </article>
    </main>
    
</body>
</html>