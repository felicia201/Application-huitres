-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 27 oct. 2025 à 23:20
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `huitres_app`
--

-- --------------------------------------------------------

--
-- Structure de la table `actions`
--

CREATE TABLE `actions` (
  `id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `commentaire` text DEFAULT NULL,
  `maree` varchar(50) DEFAULT NULL,
  `auteur` varchar(100) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `actions`
--

INSERT INTO `actions` (`id`, `type`, `quantite`, `commentaire`, `maree`, `auteur`, `date`) VALUES
(1, 'semis', 120, '', '90', 'lahila', '2025-06-27 12:36:48'),
(2, 'semis', 150, 'bien', 'basse', 'ethan molin', '2025-10-27 17:19:07');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `avatar`) VALUES
(1, 'lahila', 'lahilacrow@gmail.com', '$2b$10$Y6dvmSMLlu0lVx3axSzKVe7UsDAh8NMg.AKiN3u5ln4bhjP4L1D/a', NULL),
(2, 'lahila', 'felicia@gmail.com', '$2b$10$9iFyO8bZml0BtHYt7sC5I.oZkFfrT2SW8zORaG0PoejDQt0H.XVn2', NULL),
(3, 'danny', 'danny@gmail.com', '$2b$10$WsXUA4TnNnW9PkL/LO6acOYseN5VrnxTuzkqmaFOUXXSWsdaIyqSO', NULL),
(4, 'felicia vola', 'volatahina@gmail.com', '$2b$10$muOHQcP5THdv7rt8ABEEJ.SOBVw0810a2Oivv0t/jczI8tSNfeyum', NULL),
(5, 'norovelo', 'norovelo5@gmail.com', '$2b$10$rVXis6uf8T0kdw74eGiP1uDEk1U5gZSUjAs9XkT1hDQXdg281/6NC', NULL),
(17, 'vola', 'vola@gmail.com', '$2b$10$CNxtdc/p5N614vXw2TzFMOFbSqsbbEYA0ykLY1x234lHIU02S9rK.', NULL),
(29, 'ethan', 'ethan15@gmail.com', '$2b$10$FYDOAwI1Y.jEAi7TP5bb6.QRmA51jvV.vdrnL8Z2ReKmwa7tV0/Ka', NULL),
(30, 'melanie', 'melanie54@gmail.com', '$2b$10$waiF4.mgmWRoj1PFx3DZWelhLOZadO6yJgEXKtdikJk90osI40yJm', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `actions`
--
ALTER TABLE `actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
