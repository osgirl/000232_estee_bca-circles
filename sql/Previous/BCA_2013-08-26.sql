# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.25)
# Database: BCA
# Generation Time: 2013-08-26 05:33:00 +0000
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
	(1,2147483647,'Sean Oh','http://profile.ak.fbcdn.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-25 02:33:08',0,2,'south-korea'),
	(2,534664939,'Jason Tordsen','http://profile-b.xx.fbcdn.net/hprofile-prn1/623695_534664939_1207367401_n.jpg','Be proactive. Schedule a mammogram.','2013-08-23 10:22:31',0,1,'united-states'),
	(3,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-23 10:22:31',0,1,'united-states'),
	(2014,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Support someone in your life.','2013-08-24 22:35:08',0,5,'united-states'),
	(2015,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-23 10:22:29',0,1,'united-states'),
	(2018,2147483647,'Stevie AtEstee','https://profile-b.xx.fbcdn.net/hprofile-prn2/195485_100002351527147_3431849_n.jpg','Going running everyday this week!','2013-08-23 11:11:18',0,8,'united-states'),
	(2019,1305641,'JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369095_1305641_9030947_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-23 10:22:27',0,4,'united-states'),
	(2020,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-23 10:22:26',0,2,'united-states'),
	(2021,2147483647,'Stevie AtEstee','https://profile-b.xx.fbcdn.net/hprofile-prn2/195485_100002351527147_3431849_n.jpg','Go to the gym','2013-08-23 10:59:35',0,7,'united-states'),
	(2022,1305641,'JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369095_1305641_9030947_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-23 10:22:25',0,4,'united-states'),
	(2023,2147483647,'Stevie AtEstee','https://profile-b.xx.fbcdn.net/hprofile-prn2/195485_100002351527147_3431849_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-23 10:22:24',0,4,'united-states'),
	(2024,2147483647,'Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-24 22:31:26',0,4,'united-states'),
	(2025,1305641,'JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369095_1305641_9030947_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-24 22:32:08',0,2,'united-states'),
	(2072,39607548,'Mili Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/41405_39607548_1844_n.jpg','Drink less. Limit your alcohol intake and toast to a healthier life.','2013-08-24 22:33:16',0,4,'taiwan'),
	(2073,39607548,'Mili Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/41405_39607548_1844_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-24 22:34:57',0,4,'taiwan'),
	(2080,8642831,'Jenny Corbett','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/275708_8642831_1728930631_n.jpg','dance dance dance','2013-08-24 22:11:48',0,6,'united-states'),
	(2081,534664939,'Jason Tordsen','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/623695_534664939_1207367401_n.jpg','Be proactive. Schedule a mammogram.','2013-08-24 22:11:51',0,1,'united-states'),
	(2082,2147483647,'Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Be proactive. Schedule a mammogram.','2013-08-24 22:11:54',0,1,'united-states'),
	(2083,39607548,'Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Going running everyday this week!','2013-08-24 22:12:00',0,8,'taiwan'),
	(2084,2147483647,'Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Be proactive. Schedule a mammogram.','2013-08-24 22:12:07',0,1,'united-states'),
	(2085,2147483647,'Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-24 22:12:10',0,4,'united-states'),
	(2086,2147483647,'Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Support someone in your life.','2013-08-24 22:12:15',0,5,'united-states'),
	(2087,39607548,'Mili Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/41405_39607548_1844_n.jpg','Drink less. Limit your alcohol intake and toast to a healthier life.','2013-08-24 22:12:18',0,3,'taiwan');

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
  `friends_photo_url` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;

INSERT INTO `friends` (`id`, `ref_circle_id`, `friends_fb_id`, `friends_name`, `friends_photo_url`)
VALUES
	(1,'2085','1110939581','Owen C.',''),
	(2,'2084','10000144599','QAhotmail T.',''),
	(3,'2082','10000425064','Jason C.',''),
	(5,'2081','39607548','Mili K.',''),
	(6,'2078','534664939','Jason T.',''),
	(7,'2080','1305641','JaKenna G.',''),
	(8,'2078','39607548','Mili K.',''),
	(9,'2021','1305641','JaKenna G.',''),
	(10,'2021','1110939581','Owen C.',''),
	(12,'2086','10000144599','QAhotmail T.',''),
	(13,'2072','10000425064','Jason C.',''),
	(14,'2025','534664939','Jason T.',''),
	(15,'2024','1305641','JaKenna G.',''),
	(16,'2023','10000425064','Jason C.',''),
	(17,'2022','39607548','Mili K.',''),
	(18,'2019','1110939581','Owen C.',''),
	(19,'2018','39607548','Mili K.',''),
	(20,'2017','1305641','JaKenna G.',''),
	(23,'2014','10000425064','Jason C.',''),
	(24,'1','10000144599','QAhotmail T.',''),
	(25,'2073','534664939','Jason T.',''),
	(26,'2072','39607548','Mili K.',''),
	(27,'2','10000144599','QAhotmail T.',''),
	(28,'2','1110939581','Owen C.',''),
	(29,'3','39607548','Mili K.',''),
	(30,'3','10000144599','QAhotmail T.',''),
	(31,'3','10000425064','Jason C.',''),
	(32,'2025','534664939','Jason T.',''),
	(33,'2024','1110939581','Owen C.',''),
	(34,'2079','1110939581','Owen C.',''),
	(35,'2087','10000425064','Jason C.',''),
	(36,'2088','10000425064','Jason C.',''),
	(37,'2089','10000425064','Jason C.',''),
	(38,'2090','10000425064','Jason C.',''),
	(39,'2091','10000425064','Jason C.',''),
	(40,'2092','10000425064','Jason C.',''),
	(41,'2093','10000425064','Jason C.',''),
	(42,'2094','10000398800','Sean\'ouch O.',''),
	(43,'2094','10000425064','Jason C.',''),
	(44,'2095','10000425064','Jason C.',''),
	(45,'2095','10000398800','Sean\'ouch O.',''),
	(46,'2096','10000425064','Jason C.',''),
	(47,'2097','10000425064','Jason C.',''),
	(48,'2098','10000425064','Jason C.',''),
	(49,'2099','10000425064','Jason C.',''),
	(50,'2100','10000398800','Sean\'ouch O.',''),
	(51,'2100','10000425064','Jason C.',''),
	(52,'2101','10000425064','Jason C.',''),
	(53,'2101','10000398800','Sean\'ouch O.',''),
	(54,'2102','10000425064','Jason C.',''),
	(55,'2102','10000398800','Sean\'ouch O.',''),
	(56,'2103','10000398800','Sean\'ouch O.',''),
	(57,'2103','10000425064','Jason C.',''),
	(58,'2116','10000425064','Jason C.',''),
	(59,'2124','10000425064','Jason C.',''),
	(60,'2127','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(61,'2127','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(62,'2128','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(63,'2128','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(64,'2129','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(65,'2129','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(66,'2130','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(67,'2130','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(68,'2131','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(69,'2131','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(70,'2132','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(71,'2133','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(72,'2134','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(73,'2134','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(74,'2135','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(75,'2135','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(76,'2136','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(77,'2136','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(78,'2137','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(79,'2137','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(80,'2138','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(81,'2138','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(82,'2139','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(83,'2139','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(84,'2140','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(85,'2140','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(95,'2141','787510627','Anestis T.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/623475_787510627_1339260531_n.jpg'),
	(155,'2083','1110939581','Owen C.',''),
	(156,'2083','39608378','Rosanie W.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1118109_39608378_189375553_n.jpg'),
	(157,'2083','63914509','Angelo K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/49216_63914509_2504_n.jpg'),
	(158,'2083','39604977','Anthony D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1076302_39604977_491204425_n.jpg'),
	(159,'2083','570179940','Alvery G.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/211864_570179940_105403152_n.jpg'),
	(160,'2083','53101096','Andrew H.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/624085_53101096_591331661_n.jpg'),
	(190,'2020','39608378','Rosanie W.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1118109_39608378_189375553_n.jpg'),
	(191,'2020','682572430','Alice C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/195271_682572430_898214249_n.jpg'),
	(199,'2142','1366440094','Adam C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/273778_1366440094_493537176_n.jpg'),
	(200,'2142','1548248238','Adam F.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/370165_1548248238_969938404_n.jpg'),
	(201,'2142','689025943','Ajit M.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275654_689025943_994361081_n.jpg'),
	(202,'2142','3004727','Colin G.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/372192_3004727_1398167395_n.jpg'),
	(203,'2142','1059030980','Allen H.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/1118992_1059030980_623577105_n.jpg'),
	(204,'2142','1639391152','Alex S.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/371421_1639391152_2128729418_n.jpg'),
	(205,'2142','39608739','Behnan S.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/1119139_39608739_2093452249_n.jpg'),
	(206,'2015','10000425064','Jason C.',''),
	(207,'2015','39604977','Anthony D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1076302_39604977_491204425_n.jpg'),
	(210,'2016','1305641','JaKenna G.',''),
	(211,'2016','39604977','Anthony D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1076302_39604977_491204425_n.jpg'),
	(212,'2016','10000045306','Jack C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/41643_100000453060654_9259_n.jpg');

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
	(1,'Be proactive. Schedule a mammogram.','proactive',30,'default'),
	(2,'Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','living',26,'default'),
	(3,'Drink less. Limit your alcohol intake and toast to a healthier life.','drinkless',17,'default'),
	(4,'Walk together, cook healthy together, and support each other.','walking',13,'default'),
	(5,'Support someone in your life.','supporting',3,'default'),
	(6,'dance dance dance','generic',1,'customize'),
	(7,'Go to the gym','generic',1,'customize'),
	(8,'Going running everyday this week!','generic',3,'customize'),
	(9,'create circle','generic',1,'customize'),
	(10,'let\'s eat salad','generic',1,'customize');

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
	(5,'2013-08-07 14:57:28','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a tortor nisl.','photo_1375901848.jpg'),
	(6,'2013-08-07 14:57:57','In varius nisl in urna sagittis, eget gravida nibh dapibus.','photo_1375901877.jpg'),
	(7,'2013-08-25 02:02:34','test','photo_1375901877.jpg'),
	(8,'2013-08-25 02:02:42','','photo_1377112193.jpg'),
	(9,'2013-08-25 02:02:49','','photo_1377199514.jpg'),
	(10,'2013-08-25 02:02:55','','photo_1377112193.jpg'),
	(11,'2013-08-25 02:03:02','','photo_1377199514.jpg'),
	(12,'2013-08-25 02:03:08','','photo_1377112193.jpg'),
	(13,'2013-08-21 12:57:01','a test','photo_1377104221.jpg'),
	(14,'2013-08-25 02:03:14','','photo_1377112193.jpg'),
	(15,'2013-08-21 13:15:15','I believe in the power of positive thought. ','photo_1377105315.jpg'),
	(16,'2013-08-25 02:03:19','','photo_1377104221.jpg'),
	(17,'2013-08-25 02:03:24','','photo_1377112193.jpg'),
	(18,'2013-08-21 15:09:53','I\'m a baby. I shouldn\'t be surfing the web. ','photo_1377112193.jpg'),
	(19,'2013-08-22 19:25:14','O Red staging upload','photo_1377199514.jpg'),
	(20,'2013-08-23 04:16:58','','photo_1377231418.jpg'),
	(21,'2013-08-23 04:17:25','','photo_1377231445.jpg'),
	(22,'2013-08-23 11:29:42','puppy','photo_1377257382.jpg'),
	(23,'2013-08-23 13:56:26','','photo_1377266186.jpg'),
	(24,'2013-08-23 13:56:52','','photo_1377266212.jpg'),
	(25,'2013-08-25 02:03:42','','photo_1377266212.jpg'),
	(26,'2013-08-25 02:03:48','','photo_1377266212.jpg'),
	(27,'2013-08-25 02:03:50','','photo_1377266212.jpg');

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
