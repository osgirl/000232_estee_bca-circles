# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.25)
# Database: BCA
# Generation Time: 2013-09-02 06:41:46 +0000
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
	(1,2017,'','photo_1377099410.jpg','39607548'),
	(2,2017,'Photo upload test','photo_1377099435.jpg','39607548'),
	(3,2018,'','photo_1377102213.jpg','2147483647'),
	(4,2019,'','photo_1377104431.jpg','1305641'),
	(5,3,'Upload test from mobile','photo_1377106774.jpg','39607548'),
	(6,2088,'This city is my circle. ','photo_1377535827.jpg','559572655'),
	(7,2096,'My family and I are picnicking with a healthy lunch! We\'re stronger together because we keep each other eating right and living healthier lives. #BCAStrength. ','photo_1377548604.jpg','1305641'),
	(8,2020,'this is my circle','photo_1377624839.jpg','39607548'),
	(9,2140,'Alice!','photo_1377999726.jpg','');

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
  `language` int(2) DEFAULT NULL,
  `ref_goal_id` int(11) NOT NULL,
  `country` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `circles` WRITE;
/*!40000 ALTER TABLE `circles` DISABLE KEYS */;

INSERT INTO `circles` (`id`, `users_fb_id`, `users_name`, `users_photo_url`, `goal`, `date`, `language`, `ref_goal_id`, `country`)
VALUES
	(1,'100003988000326','Sean Oh','http://profile.ak.fbcdn.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-27 14:40:16',0,2,'south-korea'),
	(2,'534664939','Jason Tordsen','http://profile-b.xx.fbcdn.net/hprofile-prn1/623695_534664939_1207367401_n.jpg','Be proactive. Schedule a mammogram.','2013-08-23 10:22:31',0,1,'united-states'),
	(3,'39607548','Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-23 10:22:31',0,1,'united-states'),
	(2016,'39607548','Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-26 14:22:51',0,1,'united-states'),
	(2018,'100002351527147','Stevie AtEstee','https://profile-b.xx.fbcdn.net/hprofile-prn2/195485_100002351527147_3431849_n.jpg','Going running everyday this week!','2013-08-27 15:57:33',0,9,'united-states'),
	(2019,'1305641','JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369095_1305641_9030947_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-27 15:57:39',0,5,'united-states'),
	(2020,'39607548','Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-23 10:22:26',0,2,'united-states'),
	(2021,'39607548','Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Be proactive. Schedule a mammogram.','2013-08-30 11:54:41',0,0,'united-states'),
	(2023,'100002351527147','Stevie AtEstee','https://profile-b.xx.fbcdn.net/hprofile-prn2/195485_100002351527147_3431849_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-27 15:57:40',0,5,'united-states'),
	(2024,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-27 15:57:41',0,5,'united-states'),
	(2025,'1305641','JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369095_1305641_9030947_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-24 22:32:08',0,2,'united-states'),
	(2079,'39607548','Mili Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/41405_39607548_1844_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-27 15:57:41',0,5,'taiwan'),
	(2080,'8642831','Jenny Corbett','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/275708_8642831_1728930631_n.jpg','dance dance dance','2013-08-24 22:11:48',0,6,'united-states'),
	(2081,'534664939','Jason Tordsen','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/623695_534664939_1207367401_n.jpg','Be proactive. Schedule a mammogram.','2013-08-24 22:11:51',0,1,'united-states'),
	(2082,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Be proactive. Schedule a mammogram.','2013-08-27 14:41:40',0,1,'united-states'),
	(2083,'39607548','Mili Kuo','https://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg','Going running everyday this week!','2013-08-27 15:57:44',0,9,'taiwan'),
	(2084,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Be proactive. Schedule a mammogram.','2013-08-27 14:41:40',0,1,'united-states'),
	(2085,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-27 15:57:45',0,5,'united-states'),
	(2086,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Support someone in your life.','2013-08-27 15:57:46',0,6,'united-states'),
	(2087,'39607548','Mili Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/41405_39607548_1844_n.jpg','Drink less. Limit your alcohol intake and toast to a healthier life.','2013-08-27 15:57:47',0,4,'taiwan'),
	(2088,'559572655','Stevie Journey','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/1117523_559572655_1091079082_n.jpg','Drink less. Limit your alcohol intake and toast to a healthier life.','2013-08-27 15:57:48',0,4,'united-states'),
	(2089,'100002351527147','Stevie AtEstee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/195485_100002351527147_3431849_n.jpg','Host a fundraiser','2013-08-27 15:57:49',0,12,'united-states'),
	(2090,'100002351527147','Stevie AtEstee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/195485_100002351527147_3431849_n.jpg','Learn karate','2013-08-27 15:57:50',0,13,'united-states'),
	(2091,'100000404706068','Dashus Ciccone','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/211599_100000404706068_379522573_n.jpg','Support someone in your life.','2013-08-27 15:57:53',0,6,'united-states'),
	(2100,'100003988000326','Sean\'ouch O\'siwon Oh','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Be more active!','2013-08-27 15:57:55',0,16,'united-states'),
	(2101,'100003988000326','Sean\'ouch O\'siwon Oh','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Be proactive. Schedule a mammogram.','2013-08-27 14:54:31',0,1,'united-states'),
	(2102,'100003988000326','Sean\'ouch O\'siwon Oh','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Be More Active!!','2013-08-27 15:57:57',0,17,'united-states'),
	(2103,'100003988000326','Sean\'ouch O\'siwon Oh','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Circle wallpost test!','2013-08-27 15:57:58',0,18,'united-states'),
	(2104,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Be proactive. Schedule a mammogram.','2013-08-30 11:55:24',0,0,'united-states'),
	(2105,'100003988000326','Sean Oh','http://profile.ak.fbcdn.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-30 11:57:06',0,0,'united-states'),
	(2106,'39607548','Mili Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/41405_39607548_1844_n.jpg','Drink less. Limit your alcohol intake and toast to a healthier life.','2013-08-30 11:43:08',0,4,'united-states'),
	(2107,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Support someone in your life.','2013-08-30 11:44:19',0,6,'united-states'),
	(2112,'534664939','Jason Tordsen','http://profile-b.xx.fbcdn.net/hprofile-prn1/623695_534664939_1207367401_n.jpg','Be proactive. Schedule a mammogram.','2013-08-30 11:46:18',0,0,'united-states'),
	(2113,'8642831','Jenny Corbett','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/275708_8642831_1728930631_n.jpg','Be proactive. Schedule a mammogram.','2013-08-30 11:46:18',0,0,'united-states'),
	(2114,'39607548','Mili Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/41405_39607548_1844_n.jpg','Drink less. Limit your alcohol intake and toast to a healthier life.','2013-08-30 11:46:20',0,4,'united-states'),
	(2139,'100003988000326','Sean Oh','http://profile.ak.fbcdn.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Drink less. Limit your alcohol intake and toast to a healthier life.','2013-08-30 17:19:18',0,4,'united-states'),
	(2140,'100002351527147','Stevie AtEstee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/229231_110157705739280_4642739_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-08-31 21:41:32',0,3,'united-states');

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
	(1,'2085','1110939581','Owen C.',''),
	(2,'2084','10000144599','QAhotmail T.',''),
	(3,'2082','10000425064','Jason C.',''),
	(5,'2081','39607548','Mili K.',''),
	(6,'2078','534664939','Jason T.',''),
	(8,'2078','39607548','Mili K.',''),
	(9,'2021','1305641','JaKenna G.',''),
	(10,'2021','1110939581','Owen C.',''),
	(12,'2086','10000144599','QAhotmail T.',''),
	(14,'2025','534664939','Jason T.',''),
	(15,'2024','1305641','JaKenna G.',''),
	(16,'2023','10000425064','Jason C.',''),
	(17,'2022','39607548','Mili K.',''),
	(18,'2019','1110939581','Owen C.',''),
	(19,'2018','39607548','Mili K.',''),
	(20,'2016','1305641','JaKenna G.',''),
	(24,'1','10000144599','QAhotmail T.',''),
	(25,'2073','534664939','Jason T.',''),
	(27,'2','10000144599','QAhotmail T.',''),
	(28,'2','1110939581','Owen C.',''),
	(29,'3','39607548','Mili K.',''),
	(30,'3','10000144599','QAhotmail T.',''),
	(31,'3','10000425064','Jason C.',''),
	(32,'2025','534664939','Jason T.',''),
	(33,'2024','1110939581','Owen C.',''),
	(34,'2107','1110939581','Owen C.',''),
	(35,'2087','10000425064','Jason C.',''),
	(58,'2116','10000425064','Jason C.',''),
	(59,'2112','10000425064','Jason C.',''),
	(60,'2113','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(61,'2114','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
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
	(79,'2013','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(80,'2014','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(81,'2017','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(82,'2139','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(83,'2139','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(95,'2081','787510627','Anestis T.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/623475_787510627_1339260531_n.jpg'),
	(155,'2082','1110939581','Owen C.',''),
	(156,'2083','39608378','Rosanie W.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1118109_39608378_189375553_n.jpg'),
	(157,'2084','63914509','Angelo K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/49216_63914509_2504_n.jpg'),
	(158,'2085','39604977','Anthony D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1076302_39604977_491204425_n.jpg'),
	(159,'2086','570179940','Alvery G.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/211864_570179940_105403152_n.jpg'),
	(160,'2087','53101096','Andrew H.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/624085_53101096_591331661_n.jpg'),
	(190,'2020','39608378','Rosanie W.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1118109_39608378_189375553_n.jpg'),
	(191,'2020','682572430','Alice C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/195271_682572430_898214249_n.jpg'),
	(201,'2089','689025943','Ajit M.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275654_689025943_994361081_n.jpg'),
	(202,'2089','3004727','Colin G.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/372192_3004727_1398167395_n.jpg'),
	(203,'2142','1059030980','Allen H.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/1118992_1059030980_623577105_n.jpg'),
	(204,'2139','1639391152','Alex S.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/371421_1639391152_2128729418_n.jpg'),
	(205,'2142','39608739','Behnan S.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/1119139_39608739_2093452249_n.jpg'),
	(206,'2018','10000425064','Jason C.',''),
	(207,'2018','39604977','Anthony D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1076302_39604977_491204425_n.jpg'),
	(210,'2016','1305641','JaKenna G.',''),
	(211,'2018','39604977','Anthony D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1076302_39604977_491204425_n.jpg'),
	(212,'2018','10000045306','Jack C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/41643_100000453060654_9259_n.jpg'),
	(213,'2072','10000425064','Jason C.',''),
	(214,'2072','39607548','Mili K.',''),
	(215,'2072','39604977','Anthony D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1076302_39604977_491204425_n.jpg'),
	(216,'2080','1305641','JaKenna G.',''),
	(217,'2080','534664939','Jason T.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/623695_534664939_1207367401_n.jpg'),
	(219,'2090','10000425064','Jason C.','https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif'),
	(220,'2091','10000398800','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg'),
	(221,'2090','10000040470','Dashus C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/211599_100000404706068_379522573_n.jpg'),
	(222,'2091','10000040470','Dashus C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/211599_100000404706068_379522573_n.jpg'),
	(223,'2091','763295159','Sienna F.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/1116676_763295159_41185048_n.jpg'),
	(224,'2091','1311819004','Heather B.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/187196_1311819004_2080378265_n.jpg'),
	(225,'2100','10000040470','Dashus C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/211599_100000404706068_379522573_n.jpg'),
	(226,'2020','10000279157','Payton C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/174459_100002791573808_5901566_n.jpg'),
	(227,'2020','1819441','Christan S.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/369095_1819441_731333204_n.jpg'),
	(228,'2020','621136361','Ephraim K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/48898_621136361_144_n.jpg'),
	(229,'2020','717193386','Matt D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/48735_717193386_1476082851_n.jpg'),
	(230,'2020','534664939','Jason T.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/623695_534664939_1207367401_n.jpg'),
	(231,'2020','39607548','Mili K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/41405_39607548_1844_n.jpg'),
	(232,'2020','1305641','JaKenna G.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369095_1305641_9030947_n.jpg'),
	(233,'2083','206402063','Claudeland L.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/203304_206402063_1411754756_n.jpg'),
	(234,'2019','10000235152','Stevie A.',''),
	(235,'2019','10000276614','Chris E.',''),
	(236,'2081','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(237,'2082','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(238,'2083','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(239,'2101','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(240,'2102','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(241,'2105','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(242,'2103','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(243,'2104','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(244,'2088','788723923','Rafe H.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275038_788723923_914730499_n.jpg'),
	(245,'2140','100002766141618','Chris E.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg');

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
	(1,'Be proactive. Schedule a mammogram.','proactive',31,'default'),
	(2,'Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','living',26,'default'),
	(3,'Donate. Fund breast cancer research and help eradicate this disease.','donate',1,'default'),
	(4,'Drink less. Limit our alcohol intake and toast to a healthier life.','drinkless',21,'default'),
	(5,'Walk together, cook healthy together, and support each other.','walking',14,'default'),
	(6,'Support someone in our lives.','supporting',6,'default'),
	(7,'dance dance dance','generic',1,'customize'),
	(8,'Go to the gym','generic',1,'customize'),
	(9,'Going running everyday this week!','generic',3,'customize'),
	(10,'create circle','generic',1,'customize'),
	(11,'let\'s eat salad','generic',1,'customize'),
	(12,'Host a fundraiser','generic',1,'customize'),
	(13,'Learn karate','generic',1,'customize'),
	(14,'do amazing leaps','generic',1,'customize'),
	(15,'pop it lock it polka dot it countrify and hip hop it','generic',1,'customize'),
	(16,'Be more active!','generic',1,'customize'),
	(17,'Be More Active!!','generic',1,'customize'),
	(18,'Circle wallpost test!','generic',1,'customize');

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
	(7,'2013-09-01 21:37:51','test','photo_1375901894.jpg'),
	(8,'2013-09-01 21:38:05','','photo_1376325247.jpg'),
	(9,'2013-09-01 21:38:27','','photo_1376325868.jpg'),
	(10,'2013-09-01 21:38:40','','photo_1376325901.jpg'),
	(11,'2013-08-25 02:03:02','','photo_1377199514.jpg'),
	(12,'2013-08-25 02:03:08','','photo_1377112193.jpg'),
	(13,'2013-08-21 12:57:01','a test','photo_1377104221.jpg'),
	(14,'2013-09-01 21:39:03','','photo_1376326697.jpg'),
	(15,'2013-08-21 13:15:15','I believe in the power of positive thought. ','photo_1377105315.jpg'),
	(16,'2013-08-25 02:03:19','','photo_1377104221.jpg'),
	(17,'2013-09-01 21:39:20','','photo_1376326711.jpg'),
	(18,'2013-09-01 21:39:28','I\'m a baby. I shouldn\'t be surfing the web. ','photo_1376330361.jpg'),
	(19,'2013-09-01 21:39:40','O Red staging upload','photo_1376330382.jpg'),
	(20,'2013-08-23 04:16:58','','photo_1377231418.jpg'),
	(21,'2013-08-23 04:17:25','','photo_1377231445.jpg'),
	(22,'2013-08-23 11:29:42','puppy','photo_1377257382.jpg'),
	(23,'2013-08-23 13:56:26','','photo_1377266186.jpg'),
	(24,'2013-09-01 21:40:20','','photo_1376330398.jpg'),
	(25,'2013-08-30 17:53:51','','photo_1376943119.jpg'),
	(26,'2013-08-25 02:03:48','','photo_1377266212.jpg'),
	(27,'2013-08-30 17:54:34','','photo_1377099435.jpg'),
	(28,'2013-08-26 20:12:26','My brother and I are stronger together! #BCAStrength','photo_1377547946.jpg'),
	(29,'2013-08-27 13:46:37','','photo_1377611197.jpg'),
	(30,'2013-08-27 14:57:38','','photo_1377615458.jpg'),
	(31,'2013-08-30 17:55:02','Yeahhh!!','photo_1377102213.jpg'),
	(32,'2013-09-01 21:41:27','','photo_1377104431.jpg'),
	(33,'2013-09-01 21:45:03','','photo_1377108616.jpg'),
	(35,'2013-09-01 21:46:15','','photo_1377899910.jpg'),
	(36,'2013-09-02 01:59:11','','photo_1377846937.jpg');

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
