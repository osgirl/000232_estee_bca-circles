# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.25)
# Database: bca
# Generation Time: 2013-08-09 00:22:44 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table circles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `circles`;

CREATE TABLE `circles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_fb_id` int(11) NOT NULL,
  `users_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `users_photo_url` text NOT NULL,
  `goal` text CHARACTER SET utf8 NOT NULL,
  `date` datetime NOT NULL,
  `language` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `circles` WRITE;
/*!40000 ALTER TABLE `circles` DISABLE KEYS */;

INSERT INTO `circles` (`id`, `users_fb_id`, `users_name`, `users_photo_url`, `goal`, `date`, `language`)
VALUES
	(1,2147483647,'Sean Oh','http://profile.ak.fbcdn.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Love healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-07-31 11:50:53',0),
	(2,39607548,'Mili Kuo','http://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit.','2013-07-31 11:54:51',0),
	(3,534664939,'Jason Tordsen','http://profile-b.xx.fbcdn.net/hprofile-prn1/623695_534664939_1207367401_n.jpg','Aliquam at velit pharetra, pretium nisl sed, semper mauris.','2013-07-31 11:55:48',0),
	(18,39607548,'Mili Kuo','https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-ash3/35983_634844729307_2603981_n.jpg','Walking everyday in October.','2013-08-08 10:57:30',0),
	(19,39607548,'Mili Kuo','https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-ash3/35983_634844729307_2603981_n.jpg','Be proactive. Schedule a mammogram.','2013-08-08 11:12:39',0),
	(20,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-08 19:21:20',0),
	(21,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-08 19:56:17',0),
	(22,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-08 19:58:21',0),
	(23,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-08 19:59:35',0),
	(24,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-08 20:06:22',0),
	(25,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-08 20:08:19',0),
	(26,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-08 20:09:23',0),
	(27,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-08 20:12:48',0);

/*!40000 ALTER TABLE `circles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `filename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;

INSERT INTO `photos` (`id`, `date`, `description`, `filename`)
VALUES
	(5,'2013-08-07 14:57:28','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a tortor nisl.','photo_1375901848.jpg'),
	(6,'2013-08-07 14:57:57','In varius nisl in urna sagittis, eget gravida nibh dapibus.','photo_1375901877.jpg'),
	(7,'2013-08-07 14:58:14','','photo_1375901894.jpg');

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
