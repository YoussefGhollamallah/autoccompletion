<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="src/css/search.css">
    <title>Autocompletion</title>
</head>
<body>
    <?php
            $page = isset($_GET['page']) ? $_GET['page'] : 'index';
            
            $file = __DIR__ . "/src/pages/" . $page . ".php";
            
            // Vérifie si le fichier existe, sinon, affiche une erreur
            if (file_exists($file)) {
                require_once($file);
            } else {
                require_once (__DIR__. "/src/pages/page404.php");
            }
            ?>
</body>
</html>