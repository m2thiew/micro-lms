
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Learner` WRITE;
/*!40000 ALTER TABLE `Learner` DISABLE KEYS */;
INSERT INTO `Learner` VALUES (1,'2024-01-26 18:36:54','2024-01-26 18:36:54','Admin','Micro LMS','admin@microlms.org','21232f297a57a5a743894a0e4a801fc3','ADMIN'),(2,'2024-01-30 20:16:14','2024-02-26 21:11:37','Matteo','Marcoli','m2thiew@gmail.com','5fe5b5cf53090d0461a82de79e25dfef','LEARNER'),(7,'2024-02-04 19:14:12','2024-02-26 21:12:06','Luigi','Verdi','luigi.verdi@hotmail.com','1b1a61fdcb61d5b7698607a20913a8f1','LEARNER'),(10,'2024-02-26 21:12:38','2024-02-26 21:12:38','Mario','Rossi','mario.rossi@yahoo.com','b4d537051361b2c3bb75c991982d2e67','LEARNER');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Pill` WRITE;
/*!40000 ALTER TABLE `Pill` DISABLE KEYS */;
INSERT INTO `Pill` VALUES (13,'2024-02-26 21:17:34','2024-02-26 21:17:34','Windows 11 wallpapers','collezione di sfondi utilizzati nel sistema operativo Windows 11','/thumb/013/wallpaper01.webp'),(14,'2024-02-26 21:24:49','2024-02-26 21:24:49','Clip video','collezione di clip video. Fonte: https://pixabay.com/','/thumb/014/videothumb.png'),(15,'2024-02-26 21:39:07','2024-02-26 21:39:07','Gatti','collezione di video e immagini di gatti','/thumb/015/cat01.jpeg'),(16,'2024-02-26 21:42:04','2024-02-26 21:45:10','Computer forensics','Corso di \"Computer forensics\", modulo 1, lezione 1','/thumb/016/m1-slide-000.jpeg'),(17,'2024-02-26 21:44:54','2024-02-26 21:44:54','Progettazione di software sicuro','corso di \"Progettazione di software sicuro\", modulo 1, lezione 1','/thumb/017/m1-slide-000.jpeg'),(18,'2024-02-26 21:48:45','2024-02-26 21:48:45','Statistica','Corso di \"Statistica\", modulo 2, lezione 1','/thumb/018/m2-slide-001.jpeg');
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
  UNIQUE KEY `PillPathUnique` (`pillId`,`path`),
  CONSTRAINT `PillContent_pillId_fkey` FOREIGN KEY (`pillId`) REFERENCES `Pill` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `PillContent` WRITE;
/*!40000 ALTER TABLE `PillContent` DISABLE KEYS */;
INSERT INTO `PillContent` VALUES (32,'2024-02-26 21:17:34','2024-02-26 21:17:34','/content/013/wallpaper04.webp',13),(33,'2024-02-26 21:17:34','2024-02-26 21:17:34','/content/013/wallpaper03.webp',13),(34,'2024-02-26 21:17:34','2024-02-26 21:17:34','/content/013/wallpaper02.webp',13),(35,'2024-02-26 21:17:34','2024-02-26 21:17:34','/content/013/wallpaper01.webp',13),(36,'2024-02-26 21:24:49','2024-02-26 21:24:49','/content/014/video03.mp4',14),(37,'2024-02-26 21:24:49','2024-02-26 21:24:49','/content/014/video02.mp4',14),(38,'2024-02-26 21:24:49','2024-02-26 21:24:49','/content/014/video01.mp4',14),(39,'2024-02-26 21:39:07','2024-02-26 21:39:07','/content/015/catvideo02.mp4',15),(40,'2024-02-26 21:39:07','2024-02-26 21:39:07','/content/015/catvideo01.mp4',15),(41,'2024-02-26 21:39:07','2024-02-26 21:39:07','/content/015/cat03.jpeg',15),(42,'2024-02-26 21:39:07','2024-02-26 21:39:07','/content/015/cat02.jpeg',15),(43,'2024-02-26 21:39:07','2024-02-26 21:39:07','/content/015/cat01.jpeg',15),(49,'2024-02-26 21:44:54','2024-02-26 21:44:54','/content/017/m1-slide-001.jpeg',17),(50,'2024-02-26 21:44:54','2024-02-26 21:44:54','/content/017/m1-slide-002.jpeg',17),(51,'2024-02-26 21:44:54','2024-02-26 21:44:54','/content/017/m1-slide-003.jpeg',17),(52,'2024-02-26 21:44:54','2024-02-26 21:44:54','/content/017/m1-slide-004.jpeg',17),(53,'2024-02-26 21:44:54','2024-02-26 21:44:54','/content/017/m1-slide-005.jpeg',17),(54,'2024-02-26 21:44:54','2024-02-26 21:44:54','/content/017/m1-slide-006.jpeg',17),(55,'2024-02-26 21:45:10','2024-02-26 21:45:10','/content/016/m1-slide-003.jpeg',16),(56,'2024-02-26 21:45:10','2024-02-26 21:45:10','/content/016/m1-slide-004.jpeg',16),(57,'2024-02-26 21:45:10','2024-02-26 21:45:10','/content/016/m1-slide-011.jpeg',16),(58,'2024-02-26 21:45:10','2024-02-26 21:45:10','/content/016/m1-slide-012.jpeg',16),(59,'2024-02-26 21:45:10','2024-02-26 21:45:10','/content/016/m1-slide-013.jpeg',16),(60,'2024-02-26 21:48:45','2024-02-26 21:48:45','/content/018/m2-slide-002.jpeg',18),(61,'2024-02-26 21:48:45','2024-02-26 21:48:45','/content/018/m2-slide-003.jpeg',18),(62,'2024-02-26 21:48:45','2024-02-26 21:48:45','/content/018/m2-slide-004.jpeg',18),(63,'2024-02-26 21:48:45','2024-02-26 21:48:45','/content/018/m2-slide-005.jpeg',18);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
INSERT INTO `Session` VALUES (8,'2024-02-24 21:53:02','2024-02-24 21:53:02','eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiTHVjYSIsInN1cm5hbWUiOiJTaWdhbGluaSIsImVtYWlsIjoibHVjYS5zaWdhbGluaUBtZWdhaXRhbGlhbWVkaWEuaXQiLCJyb2xlIjoiTEVBUk5FUiIsImlhdCI6MTcwODgxNTE4MiwiZXhwIjoxNzA4ODE4NzgyfQ.dkMy1mOFq9SGhwj66mKNs2YUxyFiBXq0Vs7bcBL-we83iw6_xEN1jCyigkJyV5rf01JspAkXVOtyh7LJEbJzQTuqCerQM9SWNzCIOClUdmEFCII08Rw4JhjZKXIZDdLWy3lESwGhF3zGbqjzHvs3XgWkpML_TVmH3ydBdsPa6zXJJF45Hk4gZ-cgmkjpsaBuULhghFnF4JwfrGSynIatteNYB0LoGV4W0tcOL3VWveQX4CbmEMmaVcsI8Iv-5M8mylsq0RXI78-8GZJj0YEUvPLL_a_tDDRwQNVFC326V-kMBkY9pnBCui0jxNfDeoF_1Ea-WABL0JaRBp_werMFCA','01a424a35db54e6f','2024-02-24 21:53:02',7);
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
  UNIQUE KEY `LearnerPillUnique` (`learnerId`,`pillId`),
  KEY `Subscription_pillId_fkey` (`pillId`),
  CONSTRAINT `Subscription_learnerId_fkey` FOREIGN KEY (`learnerId`) REFERENCES `Learner` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Subscription_pillId_fkey` FOREIGN KEY (`pillId`) REFERENCES `Pill` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Subscription` WRITE;
/*!40000 ALTER TABLE `Subscription` DISABLE KEYS */;
INSERT INTO `Subscription` VALUES (30,'2024-02-26 21:45:59','2024-02-26 21:45:59',7,13),(31,'2024-02-26 21:45:59','2024-02-26 21:45:59',7,14),(32,'2024-02-26 21:45:59','2024-02-26 21:45:59',7,15),(35,'2024-02-26 21:49:02','2024-02-26 21:49:02',1,13),(36,'2024-02-26 21:49:02','2024-02-26 21:49:02',1,14),(37,'2024-02-26 21:49:02','2024-02-26 21:49:02',1,15),(38,'2024-02-26 21:49:02','2024-02-26 21:49:02',1,16),(39,'2024-02-26 21:49:02','2024-02-26 21:49:02',1,17),(40,'2024-02-26 21:49:02','2024-02-26 21:49:02',1,18),(41,'2024-02-26 21:49:09','2024-02-26 21:49:09',10,16),(42,'2024-02-26 21:49:09','2024-02-26 21:49:09',10,17),(43,'2024-02-26 21:49:09','2024-02-26 21:49:09',10,18);
/*!40000 ALTER TABLE `Subscription` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Track` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `learnerId` int NOT NULL DEFAULT '0',
  `pillId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `LearnerPillUnique` (`learnerId`,`pillId`),
  KEY `Track_pillId_fkey` (`pillId`),
  CONSTRAINT `Track_learnerId_fkey` FOREIGN KEY (`learnerId`) REFERENCES `Learner` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Track_pillId_fkey` FOREIGN KEY (`pillId`) REFERENCES `Pill` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Track` WRITE;
/*!40000 ALTER TABLE `Track` DISABLE KEYS */;
INSERT INTO `Track` VALUES (8,'2024-02-26 21:46:24','2024-02-26 21:46:24',1,16),(10,'2024-02-26 21:49:58','2024-02-26 21:49:58',10,16);
/*!40000 ALTER TABLE `Track` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

