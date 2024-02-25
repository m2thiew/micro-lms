
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
  `role` enum('LEARNER','ADMIN') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'LEARNER',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Learner` WRITE;
/*!40000 ALTER TABLE `Learner` DISABLE KEYS */;
INSERT INTO `Learner` VALUES (1,'2024-01-26 18:36:54','2024-01-26 18:36:54','Admin','Micro LMS','admin@microlms.org','21232f297a57a5a743894a0e4a801fc3','ADMIN'),(2,'2024-01-30 20:16:14','2024-02-04 19:13:12','Matteo','Marcoli','m2thiew@gmail.com','1009a29397d6bc1d8faa9e24deeb8a76','LEARNER'),(7,'2024-02-04 19:14:12','2024-02-24 21:52:49','Luca','Sigalini','luca.sigalini@megaitaliamedia.it','d81cedca96aa7fc549074f22447b76c2','LEARNER');
/*!40000 ALTER TABLE `Learner` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Pill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbPath` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Pill` WRITE;
/*!40000 ALTER TABLE `Pill` DISABLE KEYS */;
INSERT INTO `Pill` VALUES (8,'2024-02-20 20:51:43','2024-02-24 21:37:40','Prima pillola','pillola con immagini di Sanremo. nessuna thumb',''),(9,'2024-02-20 20:52:23','2024-02-20 21:58:42','Seconda pillola 002','pilloa con slide UNIMi. è presente la thumb 002','/thumb/009/m1-slide-001.jpeg'),(10,'2024-02-21 19:46:27','2024-02-21 19:46:27','Computer Forensics','','/thumb/010/m1-slide-000.jpeg');
/*!40000 ALTER TABLE `Pill` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `PillContent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PillContent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `path` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `pillId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `PillContent_pillId_path_key` (`pillId`,`path`),
  CONSTRAINT `PillContent_pillId_fkey` FOREIGN KEY (`pillId`) REFERENCES `Pill` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `PillContent` WRITE;
/*!40000 ALTER TABLE `PillContent` DISABLE KEYS */;
INSERT INTO `PillContent` VALUES (19,'2024-02-20 21:58:42','2024-02-20 21:58:42','/content/009/m1-slide-002.jpeg',9),(20,'2024-02-20 21:58:42','2024-02-20 21:58:42','/content/009/m1-slide-003.jpeg',9),(21,'2024-02-21 19:46:27','2024-02-21 19:46:27','/content/010/m1-slide-003.jpeg',10),(22,'2024-02-21 19:46:27','2024-02-21 19:46:27','/content/010/m1-slide-004.jpeg',10),(23,'2024-02-21 19:46:27','2024-02-21 19:46:27','/content/010/m1-slide-011.jpeg',10),(24,'2024-02-21 19:46:27','2024-02-21 19:46:27','/content/010/m1-slide-012.jpeg',10),(26,'2024-02-24 21:37:40','2024-02-24 21:37:40','/content/008/samplevideo-1280x720-2mb.mp4',8),(27,'2024-02-24 21:37:40','2024-02-24 21:37:40','/content/008/sanre-mo-02.png',8),(28,'2024-02-24 21:37:40','2024-02-24 21:37:40','/content/008/carousel03.png',8),(29,'2024-02-24 21:37:40','2024-02-24 21:37:40','/content/008/sanremo01.png',8);
/*!40000 ALTER TABLE `PillContent` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshToken` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `expiresAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `learnerId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_learnerId_key` (`learnerId`),
  CONSTRAINT `Session_learnerId_fkey` FOREIGN KEY (`learnerId`) REFERENCES `Learner` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
INSERT INTO `Session` VALUES (6,'2024-01-27 19:10:21','2024-02-24 21:16:31','eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiQWRtaW4iLCJzdXJuYW1lIjoiTWljcm8gTE1TIiwiZW1haWwiOiJhZG1pbkBtaWNyb2xtcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDg4MTI5OTEsImV4cCI6MTcwODgxNjU5MX0.n-ef3nNn_pTruaxd6awiyFYLHb9UnNrLjNj2u_GJoL2C2bZklcOvTKnCtQnCpQxIInXwRQ-S9Vk_RlDezU-alDHujtP0hsiRKwJZa08vF8mpUKDj0DFHWzgup-AHXXYW5i_kxTgKrbW7Ecev0dwvLm-H0A73jzuSb65QrKeZVyObUiuPiTQZGWD96VPpcxfNxSnSQ5gEwxPT6TyXpqXFkcUQ0nPfKzG7ZRjiz3Y2xP18e5vRudZ9MUjTI4VWOwp4Z6EDDedATWvvxuKMjhvl_Js2k-K-goUNVXsI3Gholr0Ey-yJIJmFwujygkfda1uU_MBxwTELl7LkJ8C0HLgNjQ','302e1a64899204b5','2024-01-27 19:10:21',1),(8,'2024-02-24 21:53:02','2024-02-24 21:53:02','eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiTHVjYSIsInN1cm5hbWUiOiJTaWdhbGluaSIsImVtYWlsIjoibHVjYS5zaWdhbGluaUBtZWdhaXRhbGlhbWVkaWEuaXQiLCJyb2xlIjoiTEVBUk5FUiIsImlhdCI6MTcwODgxNTE4MiwiZXhwIjoxNzA4ODE4NzgyfQ.dkMy1mOFq9SGhwj66mKNs2YUxyFiBXq0Vs7bcBL-we83iw6_xEN1jCyigkJyV5rf01JspAkXVOtyh7LJEbJzQTuqCerQM9SWNzCIOClUdmEFCII08Rw4JhjZKXIZDdLWy3lESwGhF3zGbqjzHvs3XgWkpML_TVmH3ydBdsPa6zXJJF45Hk4gZ-cgmkjpsaBuULhghFnF4JwfrGSynIatteNYB0LoGV4W0tcOL3VWveQX4CbmEMmaVcsI8Iv-5M8mylsq0RXI78-8GZJj0YEUvPLL_a_tDDRwQNVFC326V-kMBkY9pnBCui0jxNfDeoF_1Ea-WABL0JaRBp_werMFCA','01a424a35db54e6f','2024-02-24 21:53:02',7);
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subscription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `learnerId` int NOT NULL DEFAULT '0',
  `pillId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Subscription_learnerId_pillId_key` (`learnerId`,`pillId`),
  KEY `Subscription_pillId_fkey` (`pillId`),
  CONSTRAINT `Subscription_learnerId_fkey` FOREIGN KEY (`learnerId`) REFERENCES `Learner` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Subscription_pillId_fkey` FOREIGN KEY (`pillId`) REFERENCES `Pill` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Subscription` WRITE;
/*!40000 ALTER TABLE `Subscription` DISABLE KEYS */;
INSERT INTO `Subscription` VALUES (13,'2024-02-24 21:36:57','2024-02-24 21:36:57',1,8),(14,'2024-02-24 21:36:57','2024-02-24 21:36:57',1,9),(15,'2024-02-24 21:36:57','2024-02-24 21:36:57',1,10),(16,'2024-02-24 21:49:35','2024-02-24 21:49:35',7,9);
/*!40000 ALTER TABLE `Subscription` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

