<?php

require_once "classes/Pokemon.php";

$classPokemon = new Pokemon();
$pokemons = $classPokemon->getPokemons();

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokemon</title>
</head>
<body>

    <?php

    foreach ($pokemons as $pokemon)
    {
        echo "<h2>" . $pokemon["nom"] .  "</h2>";
        echo "<p> Type : " . $pokemon["type_principal"];
        echo " ";
        if ($pokemon["type_secondaire"]) {
            echo $pokemon["type_secondaire"];
        }
        echo "</p>";
        echo "<br>";
    }
    
    ?>
    
</body>
</html>