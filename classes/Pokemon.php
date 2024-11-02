<?php

require_once "config/dbconnexion.php";

class Pokemon
{
    private $connexion;

    public function __construct()
    {
        $this->connexion = new Connexion();
        $this->connexion = $this->connexion->connect();
        $this->connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getPokemons()
    {
        try 
        {
            $requete = $this->connexion->prepare("SELECT * FROM pokemon");
            $requete->execute();
            return $requete->fetchAll(PDO::FETCH_ASSOC);
        } 
        catch (Exception $e) 
        {
            throw new Exception("Erreur lors de la récupération des pokémons : " . $e->getMessage());
        }

    }

    public function getPokemonById($id)
    {
        try
        {
            $requete = $this->connexion->prepare("SELECT * FROM pokemon WHERE id = :id");
            $requete->execute(["id" => $id]);
            $resultat = $requete->fetch(PDO::FETCH_ASSOC);
            return $resultat;

        } catch (Exception $e)
        {
            throw new Exception( "Erreur de la récupération du pokémon : " . $e->getMessage() );
        }
    }
}