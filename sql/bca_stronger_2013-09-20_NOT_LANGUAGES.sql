# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 40west.esteeonline.com (MySQL 5.5.19-log)
# Database: bca_stronger
# Generation Time: 2013-09-20 21:27:11 +0000
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
  `users_fb_id` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `circle_photos` WRITE;
/*!40000 ALTER TABLE `circle_photos` DISABLE KEYS */;

INSERT INTO `circle_photos` (`id`, `ref_circle_id`, `description`, `filename`, `users_fb_id`)
VALUES
	(7,91,'bff <#','photo_1379544311.jpg','8642831');

/*!40000 ALTER TABLE `circle_photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table circles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `circles`;

CREATE TABLE `circles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_fb_id` varchar(20) NOT NULL DEFAULT '',
  `users_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `users_photo_url` text NOT NULL,
  `goal` text CHARACTER SET utf8 NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ref_goal_id` int(11) NOT NULL,
  `country` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `circles` WRITE;
/*!40000 ALTER TABLE `circles` DISABLE KEYS */;

INSERT INTO `circles` (`id`, `users_fb_id`, `users_name`, `users_photo_url`, `goal`, `date`, `ref_goal_id`, `country`)
VALUES
	(88,'816700056','Jordan Reid','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c0.0.609.609/s200x200/565034_10153219771185057_1009271128_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-18 11:08:57',5,'us'),
	(89,'1744080216','Kelly Framel','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c205.44.551.551/s200x200/270846_3172589810697_262017865_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-18 16:45:41',2,'us'),
	(91,'8642831','Jenny Corbett','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c99.132.828.828/s200x200/1186908_10102460384875867_747263270_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-18 18:42:50',2,'us'),
	(92,'1305641','JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c46.42.520.520/s200x200/1011158_10100393758756104_1916110370_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-09-18 22:42:24',3,'us'),
	(93,'1022351942','Francesca Riela','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c41.41.518.518/s200x200/1234307_10201158915667972_1814255981_n.jpg','Sii proattiva. Prenota una mammografia.','2013-09-19 09:51:28',1,'it'),
	(94,'1305641','JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c46.42.520.520/s200x200/1011158_10100393758756104_1916110370_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-19 12:46:59',2,'us'),
	(95,'47100301','Jeannine Morris','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c153.33.414.414/s200x200/164910_721364198672_2091796006_n.jpg','Live healthily and be proactive about spreading awareness.','2013-09-19 13:44:49',25,'us'),
	(96,'1336620077','Nicole Chiarella','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c42.42.528.528/s200x200/1012103_10200426943819609_1805255529_n.jpg','','2013-09-19 16:39:17',2,'us'),
	(97,'1336620077','Nicole Chiarella','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c42.42.528.528/s200x200/1012103_10200426943819609_1805255529_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-19 14:23:36',2,'us'),
	(98,'100001391440796','Nailya Aslanova','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c32.32.395.395/s200x200/1010758_556920541030989_836442606_n.jpg','Be proactive. Schedule a mammogram.','2013-09-20 02:31:34',1,'us'),
	(99,'100004230341650','Estée Lauder Nordic','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c38.0.190.190/150457_180736948743982_171810183_n.jpg','Be proactive. Schedule a mammogram.','2013-09-20 03:54:39',1,'us'),
	(100,'61301056','Sarah Tranter','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/s200x200/1208780_10100375640450934_1133113751_n.jpg','Be proactive. Schedule a mammogram.','2013-09-20 06:51:10',1,'gb'),
	(101,'577625226','Angharad Jones','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c43.43.540.540/s480x480/994877_10153084593995227_2002299892_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-20 06:52:49',5,'gb'),
	(102,'61301056','Sarah Tranter','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/s200x200/1208780_10100375640450934_1133113751_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-20 07:07:54',2,'us'),
	(103,'61301056','Sarah Tranter','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/s200x200/1208780_10100375640450934_1133113751_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-20 07:11:15',5,'us'),
	(104,'577625226','Angharad Jones','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c43.43.540.540/s480x480/994877_10153084593995227_2002299892_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-20 07:28:01',2,'gb'),
	(105,'711301674','Colleen Renee Gibson','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/419292_10151512832331675_1147059129_n.jpg','Be proactive. Schedule a mammogram.','2013-09-20 15:44:14',1,'us');

/*!40000 ALTER TABLE `circles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table friends
# ------------------------------------------------------------

DROP TABLE IF EXISTS `friends`;

CREATE TABLE `friends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref_circle_id` varchar(11) NOT NULL,
  `friends_fb_id` varchar(20) NOT NULL DEFAULT '',
  `friends_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `friends_photo_url` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;

INSERT INTO `friends` (`id`, `ref_circle_id`, `friends_fb_id`, `friends_name`, `friends_photo_url`)
VALUES
	(13,'88','1436923796','Bonnie B.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c12.12.156.156/s100x100/215627_1966470928240_1730402_a.jpg'),
	(14,'89','1515840458','Erin F.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c12.12.156.156/s100x100/1208678_2376812149145_324680436_a.jpg'),
	(17,'91','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(18,'91','621136361','Ephraim K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c0.10.111.111/s100x100/228510_8457006361_572_s.jpg'),
	(19,'91','9030292','Laura P.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c34.9.113.113/s100x100/14814_10101056137768331_444385344_a.jpg'),
	(20,'92','1311819004','Heather B.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c9.9.113.113/s100x100/488387_4504454892083_1750235000_s.jpg'),
	(21,'92','763295159','Sienna F.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c10.9.111.111/s100x100/999420_10153184054105160_655266194_s.jpg'),
	(22,'93','808317001','Linda M.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c9.9.113.113/s100x100/1231364_10151817892172002_2042242161_s.jpg'),
	(24,'94','763295159','Sienna F.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c10.9.111.111/s100x100/999420_10153184054105160_655266194_s.jpg'),
	(25,'95','16600776','Adrienne N.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c9.9.113.113/s100x100/1016629_695823921287_1263767488_s.jpg'),
	(26,'95','1212547943','Karen M.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/c8.8.106.106/s100x100/6193_10201408205906412_639586280_s.jpg'),
	(27,'95','1700434','Sydne S.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/c16.1.158.158/s100x100/969396_10100134028213198_2001814919_a.jpg'),
	(28,'95','47100306','Michele D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/c15.37.156.156/s100x100/222562_683481475952_1273158378_a.jpg'),
	(29,'95','47100623','Melanie M.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/c12.12.156.156/s100x100/1098039_741808393342_2037639137_a.jpg'),
	(30,'95','533715018','Aly W.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c13.12.155.155/s100x100/993341_10153144466055019_344346805_a.jpg'),
	(31,'95','47101044','Kamryn D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c9.8.113.113/s100x100/5265_747658409862_1427383501_s.jpg'),
	(32,'96','1331910001','Alyssa B.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c0.10.102.102/s100x100/1175000_10200796005685768_1826509187_s.jpg'),
	(33,'97','1331910001','Alyssa B.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c0.10.102.102/s100x100/1175000_10200796005685768_1826509187_s.jpg'),
	(34,'98','535826260','Timoshenko J.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/c9.9.113.113/s100x100/969598_10151407931121261_365123319_s.jpg'),
	(35,'98','100001776416620','Yulia T.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c37.9.107.107/s100x100/575869_484364111632798_1936323808_a.jpg'),
	(38,'101','61301056','Sarah T.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/s200x200/1208780_10100375640450934_1133113751_n.jpg'),
	(39,'100','1548630161','Hannah T.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c32.9.117.117/s100x100/1233519_10200401584592711_590412587_a.jpg'),
	(40,'100','577625226','Angharad J.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c9.9.113.113/s100x100/994877_10153084593995227_2002299892_s.jpg'),
	(41,'102','','','http://www.bcacampaign.com/_efb/bca_strongertogether/img/assets/profile_generic.jpg'),
	(42,'103','1548630161','Hannah T.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c32.9.117.117/s100x100/1233519_10200401584592711_590412587_a.jpg'),
	(43,'104','100000983714549','Gill J.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c0.75.309.309/s200x200/24824_102091266500330_3534229_n.jpg'),
	(44,'104','564235536','Gwen J.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/s200x200/581588_10153218957665537_669270993_n.jpg'),
	(45,'104','61412540','Alicia C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c66.66.828.828/s200x200/1236975_10100896278014085_573683857_n.jpg'),
	(46,'104','61301056','Sarah T.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/s200x200/1208780_10100375640450934_1133113751_n.jpg'),
	(47,'104','599050647','Kate A.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c31.30.385.385/s200x200/1011865_10152962685940648_998909351_n.jpg');

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
	(1,'Be proactive. Schedule a mammogram.','proactive',5,'default'),
	(2,'Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','living',7,'default'),
	(3,'Donate. Fund breast cancer research and help eradicate this disease.','donate',1,'default'),
	(4,'Drink less. Limit our alcohol intake and toast to a healthier life.','drinkless',0,'default'),
	(5,'Walk together, cook healthy together, and support each other.','walking',3,'default'),
	(6,'Support someone in our lives.','supporting',0,'default'),
	(25,'Live healthily and be proactive about spreading awareness.','generic',1,'customize');

/*!40000 ALTER TABLE `goals` ENABLE KEYS */;
UNLOCK TABLES;


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
	(22,'2013-09-20 07:29:27','Lottiamo insieme contro il tumore al seno #bcastrength','photo_1379662167.jpg');

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
