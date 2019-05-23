CREATE DATABASE  IF NOT EXISTS `ether_ropsten_app` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ether_ropsten_app`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 103.77.169.245    Database: ether_ropsten_app
-- ------------------------------------------------------
-- Server version	5.1.73

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_user` (
  `username` varchar(50) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `RegisterDate` datetime DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES ('admin@vinhsang.com','$2a$10$2K.ccN5gWBB3wGh9Zf3v/.15Ub07iMRjCp3uh08Rs39fHob0GaCge','Sang','Vinh','2018-12-04 20:31:02','Hoa Binh','123456789',1,'2018-12-04 20:31:02'),('buyer@glorious.com','$2a$10$nQqoMVPpukNwXEkgO/i8KuUHLe6ykpI20d4Zb00T2hMNRNfvwcS6C','Glorious','CreationGroup','2018-10-10 09:52:18','736 Granville St. Suite 1100, Vancouver, BC V','778-889-4966',1,'2018-10-10 09:52:18'),('buyer@vinhsang.com','$2a$10$ndQQln4jt6NVyqjh.glT5.Fe8TJQAHYOu2QqBerDQw5PGeSABFg8C','Vinh','Sang','2018-10-10 09:49:24','56A, Hòa Bình, Phường 5, Quận 11, TP. HCM','028.62866208',1,'2018-10-10 09:49:24'),('seller@glorious.com','$2a$10$HOA.C1DtD28i./w0L1ZGUulEAn2lo9sJSgkhgCHAAGo.AVEYRFajq','glorious','glorious','2018-12-04 20:51:42','china','123456',1,'2018-12-04 20:51:42'),('seller@vinhsang.com','$2a$10$3W8ulnGK8uvE2SaDv8TwUuy4BzATHKpDMPtBwV6WN1Ty7NhIdGBge','Vinh ','Vinh','2018-12-04 16:08:16','Viet Nam','123456789',1,'2018-12-04 16:08:16');
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_wallet`
--

DROP TABLE IF EXISTS `tb_wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_wallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_name` varchar(45) DEFAULT NULL,
  `account_address` varchar(145) DEFAULT NULL,
  `private_key` varchar(245) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `creator` varchar(45) DEFAULT NULL,
  `ether_balance` double DEFAULT '0',
  `token_balance` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_wallet`
--

LOCK TABLES `tb_wallet` WRITE;
/*!40000 ALTER TABLE `tb_wallet` DISABLE KEYS */;
INSERT INTO `tb_wallet` VALUES (1,'vs_buyer','0xeDcb82Fc306d4DF3Bafdc843b65DF265F458456C','b6e62bd628c29d5f8991f3b656bcd9c23615ac55751a9abe2a2d6a628e148525','2018-10-16 10:44:11','buyer@vinhsang.com',0,0),(2,'vs_seller','0x50Ee8A69a1626F07F4954D479662C8F18958D8a2','19d2b89ee4e120baef24cbf47449d8605df4e9f5acb48c033a109b05fbe6a4a6','2018-12-04 16:10:22','seller@vinhsang.com',0,0),(3,'main_account','0x5FEE6D6605Fee0f22F196d0507850c92EFD43F16','ddc3d9e02781dc7679b5cf84f12d637e43f9c138fead9014c3359eedceec25d2','2018-12-04 20:31:53','admin@vinhsang.com',0,0),(4,'glo_buyer','0xB7f72FC970258384C6aA359fe47dEAa5F1aBD328','cc6bdab57087ed3c000727cadb2d1d5aa572e02de88fe882765c60b57c708a76','2018-12-04 20:54:19','buyer@glorious.com',0,0),(5,'glo_seller','0x91FB11729b866213036Fb3edB1a6D757Bc74C92B','d5946243659084ed1284ad3e60e49c2cc62904ac77301daf0150fb679bd3a4ed','2018-12-04 20:55:59','seller@glorious.com',0,0),(6,'publisher_account','0x9F32215Fa99893e2bd4C320fAfE49785b43daF61','720ed5948e39b4050add50a6cfab08880da30fd93cd70118c08e7d3fc86f4c37','2018-12-04 20:31:53','admin@vinhsang.com',0,0);
/*!40000 ALTER TABLE `tb_wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-12 11:22:51
