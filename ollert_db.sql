-- --------------------------------------------------------
-- Hôte :                        localhost
-- Version du serveur:           5.7.24 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour ollert_db
CREATE DATABASE IF NOT EXISTS `ollert_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ollert_db`;

-- Listage de la structure de la table ollert_db. member
CREATE TABLE IF NOT EXISTS `member` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `Hash` varchar(256) NOT NULL DEFAULT '',
  `Salt` varchar(256) NOT NULL DEFAULT '',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;


/*!40000 ALTER TABLE `member` ENABLE KEYS */;


/*!40000 ALTER TABLE `member_project` ENABLE KEYS */;

-- Listage de la structure de la table ollert_db. project
CREATE TABLE IF NOT EXISTS `project` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `type` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(1000) NOT NULL DEFAULT '',
  `deadline` date NOT NULL,
  `id_manager` int(11) unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_project_member` (`id_manager`),
  CONSTRAINT `FK_project_member` FOREIGN KEY (`id_manager`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;


-- Listage de la structure de la table ollert_db. member_project
CREATE TABLE IF NOT EXISTS `member_project` (
  `id_member` int(11) unsigned NOT NULL,
  `id_project` int(11) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_member`,`id_project`),
  KEY `FK__project` (`id_project`),
  CONSTRAINT `FK__member` FOREIGN KEY (`id_member`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK__project` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*!40000 ALTER TABLE `project` ENABLE KEYS */;

-- Listage de la structure de la table ollert_db. state
CREATE TABLE IF NOT EXISTS `state` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `state` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


/*!40000 ALTER TABLE `state` ENABLE KEYS */;

-- Listage de la structure de la table ollert_db. task
CREATE TABLE IF NOT EXISTS `task` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `deadline` date NOT NULL,
  `id_project` int(10) unsigned NOT NULL,
  `id_state` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_task_project` (`id_project`),
  KEY `FK_task_state` (`id_state`),
  CONSTRAINT `FK_task_project` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_task_state` FOREIGN KEY (`id_state`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Listage des données de la table ollert_db.task : ~2 rows (environ)
/*!40000 ALTER TABLE `task` DISABLE KEYS */;

/*!40000 ALTER TABLE `task` ENABLE KEYS */;
-- Listage des données de la table ollert_db.member : ~3 rows (environ)
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` (`id`, `username`, `email`, `Hash`, `Salt`, `createdAt`, `updatedAt`) VALUES
	(25, 'Amal Sammari', 'sammari@jei-2021.tn', '177ac758c49e1aee7882558e8f92b4dc3dc078dcd81d770213e8110fb27cf8a70441a0221c88ba0e1b6d78670c6de2cd33f5b88a72412198c37077a9fe1de343', '6c2951e8bf34581a6f4524f1e59273db086b19567cef2d2510a8b101879379cf', '2021-12-25 21:23:28', '2021-12-25 21:23:28'),
	(26, 'Nour Kalai', 'nour@jei-member.tn', '30d8b49b774b1ebdacf89f07fa485da5afef7eecc6922e706d708ccfca174bd5ab4edfc03a51840e0e4fe2551cfa2c02b71a68ef5be515d955e3943cce4a099c', '151da678923e41f49ed5f5fd5f2f01def40f72f1dc701ade0500dfa558ca689f', '2021-12-25 21:51:58', '2021-12-25 21:51:58'),
	(27, 'Ghassen Abida', 'ghassen@jei-member.tn', '4783562e9e8ab25cc28555da14e8e3f7d7162df7e4aacfe80064a8b43f8982ebb90fce52ceb89915872ae088b0d0b0292d5f5bb4e63e13b583aef4d559cab36e', '6eccd5575cb4532421b1772cec2be13b5e5e1671cfce8565a94417d999c08780', '2021-12-25 21:52:20', '2021-12-25 21:52:20');
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- Listage des données de la table ollert_db.project : ~2 rows (environ)
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` (`id`, `name`, `type`, `description`, `deadline`, `id_manager`, `createdAt`, `updatedAt`) VALUES
	(5, 'project 1', 'IT', 'Un texte est une série orale ou écrite de mots perçus comme constituant un ens', '2021-12-29', 25, '2021-12-27 08:45:53', '2021-12-27 08:45:53');
-- Listage des données de la table ollert_db.state : ~2 rows (environ)
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` (`id`, `state`, `createdAt`, `updatedAt`) VALUES
	(1, 'à faire', NULL, NULL),
	(2, 'en cours', NULL, NULL),
	(3, 'fait', NULL, NULL);

-- Listage des données de la table ollert_db.member_project : ~4 rows (environ)
/*!40000 ALTER TABLE `member_project` DISABLE KEYS */;
INSERT INTO `member_project` (`id_member`, `id_project`, `createdAt`, `updatedAt`) VALUES
	(26, 5, NULL, NULL),
	(27, 5, NULL, NULL);
    
    INSERT INTO `task` (`id`, `name`, `description`, `deadline`, `id_project`, `id_state`, `createdAt`, `updatedAt`) VALUES
	(1, 'task1', 'cette tâche permet d\'ajouter quelques fonctionnalités à l\'application telque l\'authentification', '2021-12-29', 5, 1, '2021-12-28 12:16:42', '2021-12-28 12:16:43'),
	(2, 'task2', 'Cette tâche permet d\'ajouter quelques fonctionnalités à l\'application telque l\'ajout d\'un projet ou d\'une tâche\r\n', '2021-12-29', 5, 2, '2021-12-28 12:16:42', '2021-12-28 12:16:43'),
	(5, 'task 3', 'pas de description', '2021-10-10', 5, 1, '2021-12-28 18:37:45', '2021-12-28 18:37:45');