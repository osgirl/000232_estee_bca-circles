# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.25)
# Database: bca
# Generation Time: 2013-08-23 15:11:57 +0000
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

LOCK TABLES `circle_photos` WRITE;
/*!40000 ALTER TABLE `circle_photos` DISABLE KEYS */;

INSERT INTO `circle_photos` (`id`, `ref_circle_id`, `description`, `filename`, `users_fb_id`)
VALUES
	(1,2017,'','photo_1377099410.jpg',39607548),
	(2,2017,'Photo upload test','photo_1377099435.jpg',39607548),
	(3,2018,'','photo_1377102213.jpg',2147483647),
	(4,2019,'','photo_1377104431.jpg',1305641),
	(5,3,'Upload test from mobile','photo_1377106774.jpg',39607548);

/*!40000 ALTER TABLE `circle_photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table circles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `circles`;

CREATE TABLE `circles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_fb_id` int(11) NOT NULL,
  `users_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `users_photo_url` text NOT NULL,
  `goal` text CHARACTER SET utf8 NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `language` int(2) DEFAULT NULL,
  `ref_goal_id` int(11) NOT NULL,
  `country` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `circles` WRITE;
/*!40000 ALTER TABLE `circles` DISABLE KEYS */;

INSERT INTO `circles` (`id`, `users_fb_id`, `users_name`, `users_photo_url`, `goal`, `date`, `language`, `ref_goal_id`, `country`)
VALUES
	(1,2147483647,'Sean Oh','http://profile.ak.fbcdn.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-23 10:22:33',0,2,'united-states'),
	(2,534664939,'Jason Tordsen','http://profile-b.xx.fbcdn.net/hprofile-prn1/623695_534664939_1207367401_n.jpg','Be proactive. Schedule a mammogram.','2013-08-23 10:22:31',0,1,'united-states'),
	(3,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-23 10:22:31',0,1,'united-states'),
	(2014,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Support someone in your life.','2013-08-23 10:22:30',0,3,'united-states'),
	(2015,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-23 10:22:29',0,1,'united-states'),
	(2016,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Drink less. Limit your alcohol intake and toast to a healthier life.','2013-08-23 10:22:28',0,4,'united-states'),
	(2017,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-23 10:22:28',0,2,'united-states'),
	(2018,2147483647,'Stevie AtEstee','https://profile-b.xx.fbcdn.net/hprofile-prn2/195485_100002351527147_3431849_n.jpg','Going running everyday this week!','2013-08-23 11:11:18',0,8,'united-states'),
	(2019,1305641,'JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369095_1305641_9030947_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-23 10:22:27',0,4,'united-states'),
	(2020,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-23 10:22:26',0,2,'united-states'),
	(2021,2147483647,'Stevie AtEstee','https://profile-b.xx.fbcdn.net/hprofile-prn2/195485_100002351527147_3431849_n.jpg','Go to the gym','2013-08-23 10:59:35',0,7,'united-states'),
	(2022,1305641,'JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369095_1305641_9030947_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-23 10:22:25',0,4,'united-states'),
	(2023,2147483647,'Stevie AtEstee','https://profile-b.xx.fbcdn.net/hprofile-prn2/195485_100002351527147_3431849_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-23 10:22:24',0,4,'united-states'),
	(2072,39607548,'Mili Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/41405_39607548_1844_n.jpg','Drink less. Limit your alcohol intake and toast to a healthier life.','2013-08-22 14:10:36',0,3,'taiwan'),
	(2073,2147483647,'Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Support someone in your life.','2013-08-22 15:24:52',0,5,'united-states'),
	(2074,2147483647,'Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-22 17:24:17',0,4,'united-states'),
	(2075,2147483647,'Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Be proactive. Schedule a mammogram.','2013-08-22 17:33:12',0,1,'united-states'),
	(2076,2147483647,'Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Be proactive. Schedule a mammogram.','2013-08-22 17:43:27',0,1,'united-states'),
	(2077,534664939,'Jason Tordsen','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/623695_534664939_1207367401_n.jpg','Be proactive. Schedule a mammogram.','2013-08-23 00:15:41',0,1,'united-states'),
	(2078,8642831,'Jenny Corbett','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/275708_8642831_1728930631_n.jpg','dance dance dance','2013-08-23 07:13:45',0,6,'united-states');

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

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;

INSERT INTO `friends` (`id`, `ref_circle_id`, `friends_fb_id`, `friends_name`)
VALUES
	(1,'2073','1110939581','Owen C.'),
	(2,'2074','10000144599','QAhotmail T.'),
	(3,'2075','10000425064','Jason C.'),
	(4,'2076','1110939581','Owen C.'),
	(5,'2077','39607548','Mili K.'),
	(6,'2078','534664939','Jason T.'),
	(7,'2078','1305641','JaKenna G.'),
	(8,'2078','39607548','Mili K.'),
	(9,'2021','1305641','JaKenna G.'),
	(10,'2021','1110939581','Owen C.'),
	(11,'2020','10000425064','Jason C.'),
	(12,'2016','10000144599','QAhotmail T.'),
	(13,'2072','10000425064','Jason C.'),
	(14,'2025','534664939','Jason T.'),
	(15,'2024','1305641','JaKenna G.'),
	(16,'2023','10000425064','Jason C.'),
	(17,'2022','39607548','Mili K.'),
	(18,'2019','1110939581','Owen C.'),
	(19,'2018','39607548','Mili K.'),
	(20,'2017','1305641','JaKenna G.'),
	(21,'2016','1305641','JaKenna G.'),
	(22,'2015','10000425064','Jason C.'),
	(23,'2014','10000425064','Jason C.'),
	(24,'1','10000144599','QAhotmail T.'),
	(25,'1','534664939','Jason T.'),
	(26,'2','39607548','Mili K.'),
	(27,'2','10000144599','QAhotmail T.'),
	(28,'2','1110939581','Owen C.'),
	(29,'3','39607548','Mili K.'),
	(30,'3','10000144599','QAhotmail T.'),
	(31,'3','10000425064','Jason C.'),
	(32,'3','534664939','Jason T.'),
	(33,'3','1110939581','Owen C.');

/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table goals
# ------------------------------------------------------------

DROP TABLE IF EXISTS `goals`;

CREATE TABLE `goals` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `goal` text CHARACTER SET utf8 NOT NULL,
  `icon` text CHARACTER SET utf8 NOT NULL,
  `taken_number` int(11) NOT NULL,
  `goal_type` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `goals` WRITE;
/*!40000 ALTER TABLE `goals` DISABLE KEYS */;

INSERT INTO `goals` (`id`, `goal`, `icon`, `taken_number`, `goal_type`)
VALUES
	(1,'Be proactive. Schedule a mammogram.','proactive',8,'default'),
	(2,'Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','living',9,'default'),
	(3,'Drink less. Limit your alcohol intake and toast to a healthier life.','drinkless',8,'default'),
	(4,'Walk together, cook healthy together, and support each other.','walking',8,'default'),
	(5,'Support someone in your life.','supporting',3,'default'),
	(6,'dance dance dance','generic',1,'customize'),
	(7,'Go to the gym','generic',1,'customize'),
	(8,'Going running everyday this week!','generic',1,'customize');

/*!40000 ALTER TABLE `goals` ENABLE KEYS */;
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
	(13,'2013-08-21 12:57:01','a test','photo_1377104221.jpg'),
	(15,'2013-08-21 13:15:15','I believe in the power of positive thought. ','photo_1377105315.jpg'),
	(18,'2013-08-21 15:09:53','I\'m a baby. I shouldn\'t be surfing the web. ','photo_1377112193.jpg'),
	(19,'2013-08-22 19:25:14','O Red staging upload','photo_1377199514.jpg'),
	(20,'2013-08-23 04:16:58','','photo_1377231418.jpg'),
	(21,'2013-08-23 04:17:25','','photo_1377231445.jpg'),
	(22,'2013-08-23 11:29:42','puppy','photo_1377257382.jpg'),
	(23,'2013-08-23 13:56:26','','photo_1377266186.jpg'),
	(24,'2013-08-23 13:56:52','','photo_1377266212.jpg');

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
