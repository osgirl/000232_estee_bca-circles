# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 40west.esteeonline.com (MySQL 5.5.19-log)
# Database: bca_stronger
# Generation Time: 2013-09-28 00:13:45 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `filename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;

INSERT INTO `photos` (`id`, `date`, `description`, `filename`)
VALUES
	(18,'2013-09-17 20:33:23','Support someone in our lives.','photo_1379450003.jpg'),
	(19,'2013-09-18 21:59:38','pink sunset','photo_1379541578.jpg'),
	(20,'2013-09-19 16:54:41','','photo_1379609681.jpg'),
	(21,'2013-09-20 07:27:26','','photo_1379662046.jpg'),
	(22,'2013-09-20 07:29:27','Lottiamo insieme contro il tumore al seno #bcastrength','photo_1379662167.jpg'),
	(23,'2013-09-21 14:50:05','Correre e condurre una vita sana. #BCAstrength','photo_1379775005.jpg'),
	(24,'2013-09-22 14:18:03','Lottiamo contro il tumore al seno. tutti insieme saremo più forti! #bcastrenght','photo_1379859483.jpg'),
	(25,'2013-09-23 08:28:09','','photo_1379924889.jpg'),
	(26,'2013-09-23 10:29:31','','photo_1379932171.jpg'),
	(27,'2013-09-24 14:14:37','My mother and I! And We\'re Stronger Together!','photo_1380032077.jpg'),
	(28,'2013-09-24 17:15:07','We\'re stronger together!','photo_1380042907.jpg'),
	(29,'2013-09-24 17:15:09','We\'re stronger together!','photo_1380042909.jpg'),
	(30,'2013-09-25 12:44:26','We\'re all stronger together!','photo_1380113066.jpg'),
	(31,'2013-09-25 15:14:37','My brother and I are stronger together!','photo_1380122077.jpg'),
	(32,'2013-09-25 15:14:51','My brother and I are stronger together!','photo_1380122091.jpg'),
	(33,'2013-09-26 17:06:59','My sister supports me and give me strength!','photo_1380215219.jpg'),
	(34,'2013-09-26 19:51:00','My mother and I and we\'re stronger together!','photo_1380225060.jpg'),
	(35,'2013-09-26 23:12:31','','photo_1380237151.jpg'),
	(36,'2013-09-27 02:00:57','Starting the Circle of Strength with fellow Estee Lauder Companies employees. We are stronger together! #BCAstrength','photo_1380247257.jpg'),
	(37,'2013-09-27 13:32:28','','photo_1380288748.jpg'),
	(38,'2013-09-27 15:48:41','me and my awesome mom, Ann King.    ','photo_1380296921.jpg'),
	(39,'2013-09-27 15:49:28','me and my super cool sister, Laura King.','photo_1380296968.jpg'),
	(40,'2013-09-27 17:33:29','','photo_1380303209.jpg');

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
