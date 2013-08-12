# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.25)
# Database: BCA
# Generation Time: 2013-08-12 15:02:11 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table circle_photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `circle_photos`;

CREATE TABLE `circle_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref_circle_id` int(11) NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `filename` varchar(100) NOT NULL,
  `users_fb_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table circles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `circles`;

CREATE TABLE `circles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_fb_id` int(11) NOT NULL,
  `users_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `users_photo_url` text NOT NULL,
  `goal` text CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
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
	(3,534664939,'Jason Tordsen','http://profile-b.xx.fbcdn.net/hprofile-prn1/623695_534664939_1207367401_n.jpg','Aliquam at velit pharetra, pretium nisl sed, semper mauris.','2013-07-31 11:55:48',0);

/*!40000 ALTER TABLE `circles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table friends
# ------------------------------------------------------------

DROP TABLE IF EXISTS `friends`;

CREATE TABLE `friends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref_circle_id` varchar(11) NOT NULL,
  `friends_fb_id` varchar(11) NOT NULL DEFAULT '',
  `friends_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



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
