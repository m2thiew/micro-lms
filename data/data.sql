
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `Learner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Learner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `surname` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `password` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `role` enum('LEARNER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'LEARNER',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Learner` WRITE;
/*!40000 ALTER TABLE `Learner` DISABLE KEYS */;
INSERT INTO `Learner` VALUES (1,'2024-01-26 18:36:54','2024-01-26 18:36:54','Admin','Micro LMS','admin@microlms.org','21232f297a57a5a743894a0e4a801fc3','ADMIN'),(2,'2024-01-30 20:16:14','2024-02-04 19:13:12','Matteo','Marcoli','m2thiew@gmail.com','1009a29397d6bc1d8faa9e24deeb8a76','LEARNER'),(7,'2024-02-04 19:14:12','2024-02-04 19:14:32','Luca','Sigalini','luca.sigalini@megaitaliamedia.it','25d55ad283aa400af464c76d713c07ad','LEARNER');
/*!40000 ALTER TABLE `Learner` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Pill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` char(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbPath` char(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Pill` WRITE;
/*!40000 ALTER TABLE `Pill` DISABLE KEYS */;
INSERT INTO `Pill` VALUES (8,'2024-02-20 20:51:43','2024-02-20 20:51:43','Prima pillola','pillola con immagini di Sanremo. nessuna thumb',''),(9,'2024-02-20 20:52:23','2024-02-20 21:58:42','Seconda pillola 002','pilloa con slide UNIMi. è presente la thumb 002','/thumb/009/m1-slide-001.jpeg'),(10,'2024-02-21 19:46:27','2024-02-21 19:46:27','Computer Forensics','','/thumb/010/m1-slide-000.jpeg');
/*!40000 ALTER TABLE `Pill` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `PillContent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PillContent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `path` char(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `pillId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `PillContent_pillId_path_key` (`pillId`,`path`),
  CONSTRAINT `PillContent_pillId_fkey` FOREIGN KEY (`pillId`) REFERENCES `Pill` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `PillContent` WRITE;
/*!40000 ALTER TABLE `PillContent` DISABLE KEYS */;
INSERT INTO `PillContent` VALUES (1,'2024-02-20 20:51:43','2024-02-20 20:51:43','/content/008/sanre-mo-02.png',8),(2,'2024-02-20 20:51:43','2024-02-20 20:51:43','/content/008/sanremo01.png',8),(19,'2024-02-20 21:58:42','2024-02-20 21:58:42','/content/009/m1-slide-002.jpeg',9),(20,'2024-02-20 21:58:42','2024-02-20 21:58:42','/content/009/m1-slide-003.jpeg',9),(21,'2024-02-21 19:46:27','2024-02-21 19:46:27','/content/010/m1-slide-003.jpeg',10),(22,'2024-02-21 19:46:27','2024-02-21 19:46:27','/content/010/m1-slide-004.jpeg',10),(23,'2024-02-21 19:46:27','2024-02-21 19:46:27','/content/010/m1-slide-011.jpeg',10),(24,'2024-02-21 19:46:27','2024-02-21 19:46:27','/content/010/m1-slide-012.jpeg',10);
/*!40000 ALTER TABLE `PillContent` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshToken` char(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `expiresAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `learnerId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_learnerId_key` (`learnerId`),
  CONSTRAINT `Session_learnerId_fkey` FOREIGN KEY (`learnerId`) REFERENCES `Learner` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
INSERT INTO `Session` VALUES (6,'2024-01-27 19:10:21','2024-02-21 19:44:47','eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiQWRtaW4iLCJzdXJuYW1lIjoiTWljcm8gTE1TIiwiZW1haWwiOiJhZG1pbkBtaWNyb2xtcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDg1NDgyODcsImV4cCI6MTcwODU1MTg4N30.svwnJ6Aq9OQ25Wsn93xKVI7Qym7r9eKEkdTPyWkZ0-CZkkcEeISQ4OiPy3lkRjBQqIisyxI1o6G_ouAxCTIQOUQRn_zd8lWo1q30_mAdPqEKk37f2XNUH-CmVB9-rnHkRKLj8QxET2cH6JIQ9hDnx4_L0yHTwmjCv18RO6hOL9rn3oHg-Tt9d2cq-bZHFN_7LfLgAO10G2q67md6GqPVqyBZVWKdAM3vjYuNRxX_pXd8aUaBzcVpNk212GlglLEHkXdSJxwZMzBfUaaCm4EFLoEzvZ3n8Kyhdy_VC3oBVNBjyEWZ0_IoXSkqSXOkR756Tb69XrVjB5DY12Wv7Iin5A','a92f28fac15b1ccb','2024-01-27 19:10:21',1);
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

