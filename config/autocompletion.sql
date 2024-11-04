-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 02, 2024 at 10:11 AM
-- Server version: 8.0.36
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autocompletion`
--

-- --------------------------------------------------------

--
-- Table structure for table `pokemon`
--

CREATE TABLE `pokemon` (
  `id` int NOT NULL,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type_principal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type_secondaire` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pokemon`
--

INSERT INTO `pokemon` (`id`, `nom`, `type_principal`, `type_secondaire`) VALUES
(1, 'Bulbizarre', 'Plante', 'Poison'),
(2, 'Herbizarre', 'Plante', 'Poison'),
(3, 'Florizarre', 'Plante', 'Poison'),
(4, 'Salamèche', 'Feu', NULL),
(5, 'Reptincel', 'Feu', NULL),
(6, 'Dracaufeu', 'Feu', 'Vol'),
(7, 'Carapuce', 'Eau', NULL),
(8, 'Carabaffe', 'Eau', NULL),
(9, 'Tortank', 'Eau', NULL),
(10, 'Chenipan', 'Insecte', NULL),
(11, 'Chrysacier', 'Insecte', NULL),
(12, 'Papilusion', 'Insecte', 'Vol'),
(13, 'Aspicot', 'Insecte', 'Poison'),
(14, 'Coconfort', 'Insecte', 'Poison'),
(15, 'Dardargnan', 'Insecte', 'Poison'),
(16, 'Roucool', 'Normal', 'Vol'),
(17, 'Roucoups', 'Normal', 'Vol'),
(18, 'Roucarnage', 'Normal', 'Vol'),
(19, 'Rattata', 'Normal', NULL),
(20, 'Rattatac', 'Normal', NULL),
(21, 'Piafabec', 'Normal', 'Vol'),
(22, 'Rapasdepic', 'Normal', 'Vol'),
(23, 'Abo', 'Poison', NULL),
(24, 'Arbok', 'Poison', NULL),
(25, 'Pikachu', 'Électrique', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pokemon`
--
ALTER TABLE `pokemon`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pokemon`
--
ALTER TABLE `pokemon`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
