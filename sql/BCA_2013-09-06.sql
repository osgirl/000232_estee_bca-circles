# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.25)
# Database: BCA
# Generation Time: 2013-09-06 15:09:32 +0000
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
  `ref_goal_id` int(11) NOT NULL,
  `country` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `circles` WRITE;
/*!40000 ALTER TABLE `circles` DISABLE KEYS */;

INSERT INTO `circles` (`id`, `users_fb_id`, `users_name`, `users_photo_url`, `goal`, `date`, `ref_goal_id`, `country`)
VALUES
	(1,'100003988000326','Sean Oh','http://profile.ak.fbcdn.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-27 14:40:16',2,'south-korea'),
	(2,'534664939','Jason Tordsen','http://profile-b.xx.fbcdn.net/hprofile-prn1/623695_534664939_1207367401_n.jpg','Be proactive. Schedule a mammogram.','2013-08-23 10:22:31',1,'united-states'),
	(2018,'100002351527147','Stevie AtEstee','https://profile-b.xx.fbcdn.net/hprofile-prn2/195485_100002351527147_3431849_n.jpg','Going running everyday this week!','2013-08-27 15:57:33',9,'united-states'),
	(2019,'1305641','JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369095_1305641_9030947_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-27 15:57:39',5,'united-states'),
	(2023,'100002351527147','Stevie AtEstee','https://profile-b.xx.fbcdn.net/hprofile-prn2/195485_100002351527147_3431849_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-27 15:57:40',5,'united-states'),
	(2024,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-27 15:57:41',5,'united-states'),
	(2025,'1305641','JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369095_1305641_9030947_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-24 22:32:08',2,'united-states'),
	(2080,'8642831','Jenny Corbett','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/275708_8642831_1728930631_n.jpg','dance dance dance','2013-08-24 22:11:48',6,'united-states'),
	(2081,'534664939','Jason Tordsen','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/623695_534664939_1207367401_n.jpg','Be proactive. Schedule a mammogram.','2013-08-24 22:11:51',1,'united-states'),
	(2082,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Be proactive. Schedule a mammogram.','2013-08-27 14:41:40',1,'united-states'),
	(2084,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Be proactive. Schedule a mammogram.','2013-08-27 14:41:40',1,'united-states'),
	(2085,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Walk together, cook healthy together, and support each other.','2013-08-27 15:57:45',5,'united-states'),
	(2086,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Support someone in your life.','2013-08-27 15:57:46',6,'united-states'),
	(2088,'559572655','Stevie Journey','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/1117523_559572655_1091079082_n.jpg','Drink less. Limit your alcohol intake and toast to a healthier life.','2013-08-27 15:57:48',4,'united-states'),
	(2089,'100002351527147','Stevie AtEstee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/195485_100002351527147_3431849_n.jpg','Host a fundraiser','2013-08-27 15:57:49',12,'united-states'),
	(2090,'100002351527147','Stevie AtEstee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/195485_100002351527147_3431849_n.jpg','Learn karate','2013-08-27 15:57:50',13,'united-states'),
	(2091,'100000404706068','Dashus Ciccone','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/211599_100000404706068_379522573_n.jpg','Support someone in your life.','2013-08-27 15:57:53',6,'united-states'),
	(2100,'100003988000326','Sean\'ouch O\'siwon Oh','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Be more active!','2013-08-27 15:57:55',16,'united-states'),
	(2101,'100003988000326','Sean\'ouch O\'siwon Oh','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Be proactive. Schedule a mammogram.','2013-08-27 14:54:31',1,'united-states'),
	(2102,'100003988000326','Sean\'ouch O\'siwon Oh','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Be More Active!!','2013-08-27 15:57:57',17,'united-states'),
	(2103,'100003988000326','Sean\'ouch O\'siwon Oh','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Circle wallpost test!','2013-08-27 15:57:58',18,'united-states'),
	(2104,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Be proactive. Schedule a mammogram.','2013-08-30 11:55:24',0,'united-states'),
	(2105,'100003988000326','Sean Oh','http://profile.ak.fbcdn.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-08-30 11:57:06',0,'united-states'),
	(2107,'100000107213186','Jam W Toast','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/186337_100000107213186_570552857_n.jpg','Support someone in your life.','2013-08-30 11:44:19',6,'united-states'),
	(2112,'534664939','Jason Tordsen','http://profile-b.xx.fbcdn.net/hprofile-prn1/623695_534664939_1207367401_n.jpg','Be proactive. Schedule a mammogram.','2013-08-30 11:46:18',0,'united-states'),
	(2113,'8642831','Jenny Corbett','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/275708_8642831_1728930631_n.jpg','Be proactive. Schedule a mammogram.','2013-08-30 11:46:18',0,'united-states'),
	(2139,'100003988000326','Sean Oh','http://profile.ak.fbcdn.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg','Drink less. Limit your alcohol intake and toast to a healthier life.','2013-08-30 17:19:18',4,'united-states'),
	(2140,'100002351527147','Stevie AtEstee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/229231_110157705739280_4642739_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-08-31 21:41:32',3,'united-states'),
	(2141,'100003864400490','MiliTest Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c92.27.337.337/s200x200/541355_102947009844112_1320561337_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-09-04 12:36:35',3,'united-states');

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
	(245,'2140','100002766141618','Chris E.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(246,'2141','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg');

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
	(3,'Donate. Fund breast cancer research and help eradicate this disease.','donate',2,'default'),
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


# Dump of table languages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `languages`;

CREATE TABLE `languages` (
  `language_id` varchar(67) DEFAULT NULL,
  `en-us` varchar(678) DEFAULT NULL,
  `en-uk` varchar(682) DEFAULT NULL,
  `ar` varchar(915) DEFAULT NULL,
  `es-mx` varchar(805) DEFAULT NULL,
  `es` varchar(741) DEFAULT NULL,
  `fr` varchar(704) DEFAULT NULL,
  `de` varchar(649) DEFAULT NULL,
  `ko` varchar(857) DEFAULT NULL,
  `el` varchar(1419) DEFAULT NULL,
  `he` varchar(775) DEFAULT NULL,
  `it` varchar(741) DEFAULT NULL,
  `pt` varchar(742) DEFAULT NULL,
  `ru` varchar(1227) DEFAULT NULL,
  `zh` varchar(615) DEFAULT NULL,
  `tr` varchar(716) DEFAULT NULL,
  `vi` varchar(951) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;

INSERT INTO `languages` (`language_id`, `en-us`, `en-uk`, `ar`, `es-mx`, `es`, `fr`, `de`, `ko`, `el`, `he`, `it`, `pt`, `ru`, `zh`, `tr`, `vi`)
VALUES
	('about','About','About','عن','Acerca de','Acerca de','A propos','Über','About','Σχετικά','אודות','About','Sobre','Информация','關於','Hakkında','Về'),
	('about_copy','In 1992, during a time when thousands were dying from breast cancer yet it was only spoken about in whispers, Mrs. Evelyn H. Lauder launched The Estée Lauder Companies’ Breast Cancer Awareness (BCA) Campaign to raise awareness for the disease. She encouraged women everywhere to practice breast health, while working tirelessly to raise funds for the critical research needed to find a cure. Twenty years later, in over 70 countries, The BCA Campaign is devoted to defeating breast cancer through education and medical research. The BCA Campaign will continue spreading its lifesaving awareness message globally in the hope of a world in which breast cancer no longer exists.','In 1992, during a time when thousands were dying from breast cancer yet it was only spoken about in whispers, Mrs. Evelyn H. Lauder launched The Estée Lauder Companies’ Breast Cancer Awareness (BCA) Campaign to raise awareness for the disease. She encouraged women everywhere to practice breast health, while working tirelessly to raise funds for the critical research needed to find a cure. Twenty one years later, in over 70 countries, The BCA Campaign is devoted to defeating breast cancer through education and medical research. The BCA Campaign will continue spreading its lifesaving awareness message globally in the hope of a world in which breast cancer no longer exists.','في عام 1992، كان يموت الآلاف بسبب سرطان الثدي وحيث كان الحديث عن هذا المرض همساً، أطلقت السيدة إيفلين اتش لودر حملة مجموعة شركات Estée Lauder للتوعية بسرطان الثدي (BCA) لنشر الوعي بالمرض. لقد شجعت النساء في كل مكان للتدريب على صحة الثدي، مع العمل دون كلل أو ملل لجمع الأموال للأبحاث الهامة الضرورية لإيجاد علاج. بعد 20 عام، في أكثر من 70 دولة، كرست حملة BCA نفسها للقضاء على سرطان الثدي من خلال الثقافة والأبحاث الطبية. ستستمر حملة BCA بنشر رسالة الوعي المنقذة للأرواح عالمياً على أمل الوصول إلى عالم يخلو من سرطان الثدي.','En 1992, durante una época en que miles de personas fallecían por cáncer de mama, sólo se hablaba de ello en susurros, la Sra. Evelyn H. Lauder lanzó la campaña de cáncer de mama de Estée Lauder Companies (BCA) Campaña de sensibilización para la enfermedad. Ella animó a las mujeres del mundo para la práctica de salud de la mujer, al mismo tiempo trabajando sin descanso para recaudar fondos para la investigación necesaria para encontrar una cura. Veinte años más tarde, en más de 70 países, la Campaña BCA está dedicada a derrotar el cáncer de mama a través de la educación y la investigación médica. La Campaña BCA continuará la difusión de su mensaje de la conciencia para salvar vidas a nivel mundial con la esperanza de un mundo en el que el cáncer de mama ya no exista.','En 1992, cuando miles de mujeres fallecían a causa del cáncer de mama y no se hablaba abiertamente sobre la enfermedad, la Sra. Evelyn H. Lauder lanzó la Campaña de Concienciación sobre el Cáncer de Mama del Grupo de Compañías Estee Lauder para aumentar el conocimiento sobre la enfermedad. Ella animaba a todas las mujeres a cuidar la salud del pecho mientras trabaja incansablemente en conseguir fondos destinados a la investigación de una cura. 20 años después, en más de 70 países, esta Campaña está dedicada a erradicar el cáncer de mama mediante la educación y la investigación médica. La campaña continúa difundiendo su mensaje global de concienciación con la esperanza de conseguir un mundo sin cáncer de mama.','En 1992, à une époque où des milliers mouraient de cancer du sein en silence, Mme Evelyn H. Lauder a lancé la sensibilisation au cancer du sein de la société Estée Lauder Companies (BCA). Elle a encouragé les femmes du monde entier à pratiquer le dépistage du sein, tout en travaillant sans relâche pour amasser des fonds pour la recherche critique nécessaire pour trouver un remède. Vingt ans plus tard, dans plus de 70 pays, la campagne BCA est consacrée à vaincre le cancer du sein par l\'éducation et la recherche médicale. La campagne BCA va continuer à répandre son message de sensibilisation au niveau mondial dans l\'espoir d\'un monde dans lequel le cancer du sein n\'existe plus.','Seit 1992 konnten im Rahmen der Kampagne weltweit bereits mehr als 48 Millionen US-Dollar generiert und an Hilfs- und Aufklärungsprojekte weitergegeben werden. Mehr als 450 Millionen Dollar an Spendengeldern (Stand Oktober 2012) konnten zusätzlich durch die ebenfalls von Evelyn H. Lauder initiierte, Breast Cancer Reasearch Foundation (BCRF)  an profilierte Krebsforscher und ihre Projekte vergeben werden. Dank dieser Unterstützung wurde unter anderem festgestellt, dass Brustkrebs genetisch bedingt sein kann. Darüber hinaus konnten maßgeschneiderte Therapien entwickelt und über die Existenz der Brustkrebs-Stammzellen aufgeklärt werden. ','1992년 당시에는 유방암으로 수천 명이 목숨을 잃어가고 있었음에도 그 위험성을 알리는 캠페인이 없었습니다. 에블린 로더 에스티 로더 컴퍼니즈 당시 수석 부사장은 유방암에 대한 의식을 제고하기 위하여 ‘유방암 의식 향상 캠페인(BCA)’을 창시하였습니다. 에블린 로더 여사는 유방암 치료를 받고 있는 전 세계 여성들을 독려하는 한편, 치료제 발견에 필요한 핵심 연구를 지원하기 위해 끊임없이 노력했습니다. 20년이 흐른 현재, BCA 캠페인은 70개 이상의 국가에서 교육과 의료연구를 통한 유방암 퇴치를 위해 앞장서고 있습니다. BCA 캠페인은 유방암 없는 세상을 염원하며 계속해서 전 세계적으로 생명구호의 메시지를 전파해 나갈 것입니다.','Το 1992, όταν ακόμα χιλιάδες γυναίκες πέθαιναν από τον Καρκίνο του Μαστού, όταν ακόμα ήταν ένα θέμα ταμπού, η κα Evelyn H. Lauder δημιούργησε την Εκστρατεία Ενημέρωσης για τον Καρκίνο του Μαστού της Estee Lauder Companies (BCA) - για να αφυπνίσει τον κόσμο για την νόσο αυτή. Ενθάρρυνε γυναίκες να κοιτάξουν την υγεία του στήθους τους, ενώ συγχρόνως εργαζόταν αδιάκοπα για να συγκεντρώσει κεφάλαια για την έρευνα που χρειαζόταν έτσι ώστε να βρεθεί η θεραπεία. Είκοσι χρόνια αργότερα, σε πάνω από 70 χώρες, η Εκστρατεία Ενημέρωσης για τον Καρκίνο του Μαστού είναι αφοσιωμένη να νικήσει τον καρκίνο του μαστού μέσα απο την εκπαίδευση και την ιατρική έρευνα. Η Εκστρατεία θα συνεχίσει να διαδίδει το σωτήριο μήνυμα της αφύπνισης και πρόληψης σε όλο τον κόσμο, ελπίζοντας σε έναν κόσμο χωρίς καρκίνο μαστού.','בשנת 1992, תקופה בה אלפי נשים מתו מסרטן השד אך מעט דובר על הנושא, השיקה אוולין לאודר את קמפיין המודעות לסרטן השד של חברת אסתי לאודר במטרה להעלות את המודעות למחלה. היא עודדה נשים מכל העולם לעסוק בבריאות השד, תוך שעבדה ללא לאות בגיוס כספים למחקר למציאת תרופה. 20 שנים מאוחר יותר, בלמעלה מ-70 מדינות, הקמפיין מוקדש להבסת סרטן השד דרך חינוך ומחקר רפואי. הקמפיין ימשיך להפיץ את המסר גלובאלי שלו למודעות מצילת חיים בתקווה לעולם ללא סרטן השד. ','Nel 1992, quando di tumore al seno ancora non si osava parlare, nonostante migliaia di donne morissero di questa malattia, la Signora Evelyn H. Lauder lanciò la campagna di sensibilizzazione contro il tumore al seno: Breast Cancer Awareness Campaign (BCA). La Signora Lauder incoraggiò le donne di tutto il mondo a prendersi cura della salute del proprio seno, lavorando costantemente per raccogliere fondi da destinare alla ricerca di una cura. Venti anni dopo, in più di 70 paesi, la Campagna Nastro Rosa è dedita a combattere il tumore al seno attraverso l\'informazione e la ricerca medica. La Campagna Nastro Rosa continuerà a diffondere il suo messaggio di sensibilizzazione nella speranza di un mondo senza più il tumore al seno.','Em 1992, altura em que milhares de mulheres morriam de cancro da mama, e o tema era mencionado a medo, a Senhora Evelyn H. Lauder criou a Campanha de Prevenção do Cancro da Mama da Companhia Estée Lauder, para chamar a atenção para a doença.  Ela encorajou mulheres de todo o mundo a vigiarem melhor o seu corpo, enquanto trabalhava incansavelmente para angariar fundos para pesquisas que levem à descoberta de uma cura. Vonte anos mais tarde, em mais de 70 países, a Campanha de Prevenção do Cancro da Mama (CPCM) dedica-se a combater o cancro da mama através da informação e da pesquisa médica. A CPCM vai continuar a espalhar a sua mensagem a nível mundial, na esperança de um mundo onde o cancro da mama deixe de existir. ','в 1992 году, когда смертность от рака груди уже исчислялась тысячами женщин, но общество все еще находилось под воздействием страха и невежества, Эвелин Лаудер запустила просветительскую Кампанию против рака груди. Она научила женщин во всем мире сознательно относиться к своему здоровью и прилагала неустанные усилия к сбору средств на поддержку жизненно важных исследований, призванных найти средство исцеления болезни. Сейчас, 20 лет спустя, уже свыше 70 стран участвуют в Кампании для победы над раком груди посредством просвещения и передовых медицинских исследований. И мы продолжим просветительскую работу по всему миру – пока рак груди не исчезнет с лица земли. ','1992年，當時有數以萬計人士死於乳癌，但大家卻默然，Evelyn H. Lauder女士遂創立Estée Lauder集團「關注乳癌運動」（Breast Cancer Awareness, BCA），提高大眾對乳癌的關注。她鼓勵世界各地的女性實踐乳房健康，孜孜不倦地為重要的研究籌募經費，旨在找出根治乳癌的方法。20年後，「關注乳癌運動」活躍於超過 70個國家，透過教育及醫學研究來戰勝乳癌。「關注乳癌運動」將繼續在全球宣揚關注乳癌的訊息，貫徹其拯救寶貴生命的使命，期望創造一個沒有乳癌的世界。','1992 yılında binlerce insanın meme kanserinden dolayı hayatını kaybetmesi sadece fısıltılarla konuşuluyordu. Bayan Evelyn H. Lauder bu hastalık için Estée Lauder Şirketleri; Meme Kanseri Bilinçlendirme Kampanyası\'nı (BCA) başlattı. Tüm kadınları meme sağlığı hakkında bilgilendirirken, hastalığın tedavisi için yapılacak araştırma bütçesine katkıda bulunmak için çalıştı. Yirmi yıl sonra, 70 ülke, BCA Kampanyası meme kanserine karşı eğitim ve araştırma için bağlılıkla çalışmaktadır. BCA Kampanyası hayat kurtarmanın farkındalığı mesajı ile tüm dünyada yayılarak, meme kanserinin olmadığı bir dünya yaratmak için çalışmaya devam edecektir.','Năm 1992, đã có hàng ngàn phụ nữ chết vì ung thư vú nhưng căn bệnh rất ít được biết đến. Bà Evelyn H. Lauder đã cho ra đời chiến dịch Breast Cancer Awareness (BCA) của tập đoàn Estee Lauder để truyền thông rộng rãi về căn bệnh này. Bà khuyến khích phụ nữ khắp nơi tự thường xuyên kiểm tra tình trạng vú. Đồng thời bà cũng làm việc không mệt mỏi để gây quỹ cho các nghiên cứu cần thiết để tìm ra giải pháp chữa khỏi căn bệnh này. Hai mươi năm sau, Chiến dịch BCA đến với 70 nước và được tin tưởng rằng sẽ chống lại căn bệnh ung thư vú thông qua giáo dục và thuốc men. Chiến dịch BCA sẽ còn tiếp tục đem thông điệp tốt đẹp về bảo vệ sự sống đến toàn thế giới với hi vọng thế giới sẽ không còn tồn tại căn bệnh Ung thư vú.'),
	('add_a_comment','Add a comment','Add a comment','أضيفوا تعليق','Agregar un Comentario','Añade un comentario','Ajouter un commentaire','einen Kommentar hinzufügen','댓글달기','Πρόσθεσε ένα σχόλιο','הוסיפי תגובה','Inserisci un commento','Acrescente um comentário','Добавить комментарий','新增留言','Yorum Yapın','Thêm bình luận'),
	('add_a_short_desc','Add a short description','Add a short description','أضيفوا وصف قصير','Agrega una pequeña descripción','Añade una pequeña descripción','Ajoutez une courte description','kurze Beschreibung hinzufügen','사진에 대해 간단하게 설명해주세요','Πρόσθεσε μια σύντομη περιγραφή','הוסיפי תיאור קצר','Inserisci una breve descrizione','Acrescente uma descrição breve ','Краткое описание','新增簡短說明','Kısa bir açıklama ekleyin.','Thêm mô tả'),
	('add_friends','Take action against breast cancer by creating a Circle of Strength with','Take action against breast cancer by creating a Circle of Strength with','قوموا بدوركم ضد سرطان الثدي عن طريق ابتكار حلقة قوة مع','Actúa en contra del cáncer de mama creando un Círculo de Fortaleza con','Participa en la lucha contra el cáncer de mama, creando un Círculo de Fuerza con','Agir contre le cancer du sein en créant un cercle de force avec','Unterstützen Sie den Kampf gegen Brustkrebs mit der Gründung eines Circle of Strength','님, 가족 혹은 친구들과 함께 핑크리본 서클을 만들어 유방암을 물리치기 위한 행동을 보여주세요:','δραστηριοποιήσου ενάντια στον καρκίνο του μαστού δημιουργώντας έναν Κύκλο Δύναμης με τον/την','נקטי פעולה נגד סרטן השד ע י יצירת מעגל כוח עם [friend_name]','Lotta contro il tumore al seno creando un Cerchio della Forza con','Participa na luta contra o cancro da mama criando um Circulo de Força com','включайтесь в борьбу против рака груди вместе с','成立抗癌力量社交圈一起戰勝乳癌，成員有：','Meme kanserine karşı önlem alın ve harekete geçin.','Hành động để đánh bại ung thư vú bằng cách tạo Vòng Tròn Sức Mạnh với'),
	('add_photos','Add Photos','Add Photos','أضيفوا صور','Agregar Fotos','Añadir fotos','Ajoutez des photos','Fotos hinzufügen','사진 추가하기','Add Photos','הוסיפי תמונות','Aggiungi Foto','Juntar Fotos ','Добавить фото','新增相片','Fotoğraf Ekleyin','Thêm hình ảnh'),
	('add_your_comment','Add your Comment','Add your Comment','أضيفوا تعليق','Comentar','Comentar','Commenter','Kommentar','댓글 달기','Comment','תגובה','Commenta','Comentários','Комментировать','留言','Yorum Yapın','Bình luận'),
	('all','All','All','الجميع','Todos','Todos','Tous','Alle','전체','All','הכל','Tutto','Todos','Все','全部','Hepsi','Tất Cả'),
	('back','Back','Back','العودة','Atrás','Atrás','Retour','Zurück','이전단계','Πίσω','חזרה','Indietro','Back','Назад','返回','Geri','Quay lại'),
	('belongs_to_n_circles','Belongs to # Circles','Belongs to # Circles','تنتمي إلى # حلقات','Pertenece a # de Círculos','participa en # Círculos','appartient à # Circles','gehört # Circle an','님이 #개의 핑크리본 서클에 속해 있습니다.','ανήκει σε # Κύκλους','חברה ב # מעגלים','Membri di # Cerchi','Pertence a  # Circulos','состоит в # Кругах поддержки *','屬於 # 社交圈','# Çemberinde','Thuộc Vòng Tròn số #'),
	('browse','Browse','Browse',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('by_submit_img_agree','By submitting images, you agree that:','By submitting images, you agree that:','بتسجيل الصور أنتم توافقون على:','Al subir imágenes, usted acepta que:','Al enviar estas fotos aceptas que:','En soumettant images, vous convenez que:','Wenn Sie ein Foto hochladen, müssen Sie Folgendes beachten:','사진 제출과 함께 다음 사항에 동의하시게 됩니다.','Όταν ανεβάζεις φωτογραφίες συμφωνείς στα παρακάτω:','ע\"י הגשת התמונות, את מסכימה לכך ש:','Con l\'invio delle immagini tu acconsenti che:','Ao submeter imagens, está a concordar com o seguinte:','Отправляя файл, вы тем самым соглашаетесь с условиями:','提交圖檔時，妳同意：','Fotoğraf yükleyerek; aşağıdaki şartları kabul ediyorsunuz;','Khi gửi hình ảnh đi, bạn đồng ý là:'),
	('cancel','Cancel','Cancel','الإلغاء','Cancelar','Cancelar','Résilier','Löschen','취소','Άκυρο','ביטול','Cancella','Cancelar','Отмена','取消','İptal','Hủy'),
	('choose_file','Choose File','Choose File','اختاروا ملف.','Seleccionar archivo','Elige un archivo','Choisissez Fichier','Datei auswählen','파일찾기','Επέλεξε από αρχείο','בחרי קובץ','Scegli un File','Escolha um Ficheiro','Выбрать файл','選擇檔案','Dosya Seç','Chọn tập tin'),
	('choose_by_photo','Choose by Photo','Choose by Photo','أو اختاروا الأصدقاء من قائمة الصور.','O selecciona amigos de la lista de fotos','O elige a tus amigos de la galería de fotos ','OU sélectionnez amis à partir d\'une liste de photos.','ODER wählen Sie Freunde von einer Fotoliste.','또는, 사진 목록에서 친구를 고를 수 있습니다.','ή επέλεξε φίλους από την λίστα','או בחרי חברות מרשימת תמונות','O Seleziona un amico dalla tua Lista di Foto.','OU escolhe amigos a partir de uma lista de fotos.','ИЛИ выберите друзей из списка фото','或從相片列表選擇朋友','Ya da fotoğraf listesinden arkadaş seçiniz.','HOẶC chọn bạn bè trong danh sách hình ảnh.'),
	('circle_of_strengh_photos','Circle of Strength Photos','Circle of Strength Photos','صور حلقة القوة','Fotos del Círculo de Fortaleza','Fotos del Círculo de Fuerza','Circle of Strength Photos','Fotos des Circles','핑크리본 서클 사진','Photos Κύκλοι Δύναμης','תמונות של מעגל הכוח','Foto del Cerchio della Forza','Fotografias do Circulo de Força','Фотографии Круга поддержки','抗癌力量社交圈相片','Güç Çemberi Fotoğrafları','Hình ảnh Vòng Tròn Sức Mạnh'),
	('circles','Circles','Circles','حلقات','Círculos','Círculos','Cercles','Circles','서클','Circles',' מעגלים','Cerchio','Circulos','Круги поддержки','社交圈','Çemberler','Vòng Tròn'),
	('close','Close','Close',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('comment','Comment','Comment','تعليق','Comentar','Comentar','Commenter','Kommentieren','댓글','Σχολίασε','תגובה','Commenta','Comentário','Комментарии','留言','Yorum Yapın','Bình luận'),
	('conversation','Conversation','Conversation','محادثة','Conversación','Iniciativas','Conversation','Unterhaltung','함께 이야기해요!','Συζήτηση','שיחה','Conversazione','Conversação','Общение','對話','Sohbet','Trò chuyện'),
	('create_a_circle','Create A Circle','Create A Circle','ابتكروا حلقة','Crea un Círculo','Crea un Círculo ','Créer un cercle','Einen Circle of Strength gründen ','핑크리본 서클 만들기','Δημιούργησε έναν Κύκλο','צרי מעגל','Crea un Cerchio','Crie Um Circulo ','Создать Круг поддержки','成立社交圈','Çemberinizi Oluşturun.','Tạo Vòng Tròn'),
	('create','Create','Create','','','','','','','','','','','','','',''),
	('creating_circle','Creating Circle...Please Wait.','Creating Circle...Please Wait.','','','','','','','','','','','','','',''),
	('we_are_stronger_together_upload_photo','We\'re Stronger Together','We\'re Stronger Together','معاً نحن أقوى','Juntos somos más fuertes','Juntos somos más fuertes','Nous sommes plus forts ensemble','Gemeinsam sind wir stark.','우리가 함께할 때 더 큰 힘을 발휘할 수 있습니다','Μαζί είμαστε πιο Δυνατοί','אנחנו חזקות יותר ביחד','Siamo Più Forti Insieme','Juntas Somos Mais Fortes','Вместе мы сильнее.','We\'re Stronger Together','Birlikte Daha Güçlüyüz','Cùng Nhau Chúng Ta Sẽ Mạnh Hơn'),
	('create_your_circle','Create Your Circle','Create Your Circle','ابتكروا حلقتكم','Crea tu propio Círculo','Crea tu Círculo de Fuerza','Créez votre cercle','Gründen Sie Ihren eigenen Circle.','핑크리본 서클 만들기','Δημιούργησε τον δικό σου Κύκλο Δύναμης','צור מעגל','Crea il tuo Cerchio della Forza','Crie o seu Círculo ','Создать свой Круг поддержки','成立妳的社交圈','Çemberinizi Oluşturun.','Tạo Vòng Tròn Của Bạn'),
	('create_your_own_circle','Create Your Own Circle Of Strength','Create Your Own Circle Of Strength','ابتكروا حلقة القوة الخاصة بكم','Crea tu propio Círculo de Fortaleza','Crea tu propio Círculo de Fuerza','Créez votre propre cercle de Force','Gründen Sie Ihren eigenen Circle','당신만의 핑크리본 서클을 만들어보세요.','Δημιούργησε τον δικό σου Κύκλο Δύναμης','צרי מעגל כוח משלך','Crea il tuo Cerchio della Forza','Crie o seu próprio Circulo de Força ','Создайте свой Круг поддержки. ','成立妳自己的抗癌力量社交圈','Kendi Güvenlik Çemberinizi Oluşturun','Tạo Vòng Tròn Sức Mạnh Của Bạn'),
	('create_your_own_circle_choose_goal','Create your own Circle of Strength. Choose the same goal or create a new one.','Create your own Circle of Strength. Choose the same goal or create a new one.','ابتكروا حلقة القوة الخاصة بكم. اختاروا نفس الهدف أو ابتكروا هدف جديد.','Crea tu propio Círculo de Fortaleza. Elegir el mismo objetivo o crear uno nuevo. ','Crea tu  propio Círculo de Fuerza. Elige la misma acción o crea una nueva','Créer votre propre cercle de la Force. Choisissez le même but ou en créer un nouveau.','Gründen Sie Ihren eigenen Circle of Strength. Wählen Sie das gleiche Ziel oder kreieren Sie ein Neues.','당신만의 핑크리본 서클을 만들어보세요. 이 서클의 목표와 같은 것을 고르거나 새로운 목표를 설정해보세요.','Δημιούργησε τον δικό σου Κύκλο Δύναμης. Επιλέξτε τον ίδιο σκοπό ή δημιούργησε έναν νέο','צרי מעגל כוח משלך. בחרי את אותה מטרה או צרי מטרה חדשה','Crea il tuo Cerchio della Forza','Crie o seu Circulo de Força. Escolha o mesmo objectivo ou crie um novo.','Создайте свой Круг поддержки. Выберите такую же цель или задайте новую','成立妳自己的抗癌力量社交圈。選擇同一目標或訂立全新目標。','Kendi Güç Çemberinizi oluşturun. Aynı hedefi seçin ya da yeni oluşturun.','Tạo Vòng Tròn Sức Mạnh của bạn. Chọn cùng mục tiêu hoặc tạo mới.'),
	('donate','Donate','Donate','تبرعوا','Donar','Donar','Faire un don','Spenden','기부하기','Κάντε τη Δωρεά σας','תרומה',NULL,'Doar','Пожертвование','捐款支持','Bağış Yapın','Đóng góp từ thiện'),
	('donate_now','Donate Now','Donate Now','تبرعوا الآن','Dona ahora','Donar ahora','Faire un don maintenant','Jetzt spenden','바로 기부하기','Κάνε δωρεά','תרמי עכשיו','DONATE IS DEACTIVATED FOR THE ITALIAN MARKET','Faça um Donativo Agora ','Сделайте пожертвование сейчас ','請即捐助','Şimdi Bağış Yapın','Quyên góp ngay bây giờ'),
	('done','Done','Done',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('edit_friends','Edit Friends','Edit Friends',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('enter_name','Enter Name','Enter Name',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('estee_lauder_companies','The Estee Lauder Companies','The Estee Lauder Companies',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('featured_around_world','Featured From Around The World','Featured From Around The World','تم عرضها من جميع أنحاء العالم','Destacado en todo el mundo','Participando desde todo el mundo ','Sélection à travers le monde','Weltweite Unterstützung','세계 곳곳의 핑크리본 서클들','Από όλο τον κόσμο','מסביב לעולם','I più Cliccati','À volta do Mundo','Новости со всего мира','來自世界各地的分享','Tüm Dünyada Gerçekleşmektedir.','Đặc Trưng Trên Toàn Thế Giới '),
	('file_size_5mb','File size must be 5 MB or less','File size must be 5 MB or less','يجب أن يكون حجم الملف 5  MB أو أقل',' El tamaño del archivo debe ser de 5 MB o menos','el tamaño máximo es de 5 MB','La taille du fichier doit être de 5 Mo ou moins','Die Datei darf nicht größer als 5MB sein','파일 사이즈는 최대 5MB를 넘을 수 없습니다.','Το αρχείο είναι 5 MB ή μικρότερο','גודל התמונה חייב להיות 5MB או פחות','Il file è di 5 MB o meno','Ficheiro tem de ter o máximo de 5 MB ','максимальный размер файла - 5 МБ','每個檔案大小以 5 MB 為上限','Dosya boyutu 5 MB ya da daha az olmalıdır.','Kích thước tập tin phải bằng hoặc dưới 5MB'),
	('watch_bca_video','Watch the<br/>BCA video','Watch the<br/>BCA video','','','','','','','','','','','','','',''),
	('create_another_circle','Create Another Circle','Create Another Circle','ابتكروا حلقة أخرى','Crea otro Círculo','Crea otro Círculo','Créer un cercle de','Einen anderen Circle gründen','다른 핑크리본 서클 만들기','Δημιούργησε έναν άλλο Κύκλο','צרי מעגל נוסף','Crea un altro Cerchio','Criar outro Circulo','Создать еще один Круг поддержки','成立另一個社交圈','Yeni Çember Oluşturun','Tạo Vòng Tròn Khác'),
	('for_example_actions','For example: \"Let\'s be more active\"; \"Let\'s eat healthier foods\"','For example: \"Let\'s be more active\"; \"Let\'s eat healthier foods\"','على سبيل المثال: \"\"دعونا نكون نشيطين أكثر\"؛ \"لنأكل طعاماً صحياً أكثر\"','Por ejemplo: \"Seamos más activos\", \"Comamos alimentos más saludables\"','Por ejemplo: \"Hacer más ejercicio\", \"Comer de forma más saludable\"','Par exemple: «Soyons plus actif», «Mangeons des aliments plus sains»','Zum Beispiel: \"Lassen Sie uns aktiver sein\"; Lassen Sie uns gesünder essen\"','예: \"더 활동적인 사람이 되자!\", \"더 건강한 음식을 먹자!\"','Για παράδειγμα : \'\'Ας γίνουμε πιο δραστήριοι\'\', \'\'Ας επιλέγουμε πιο υγιεινές τροφές\'\'',' לדוגמה: \"להיות פעילות יותר\"; \"לאכול בריא יותר\"','Per esempio. \" Sii più attiva\"; \"Mangiamo cibo più sano\".','Por exemplo:\"Vamos ser mais activas\";\"Vamos ter uma alimentção saudável\"','Например, \"вести подвижный образ жизни\", \"перейти на здоровый рацион\".','例如： \"讓我們更積極\"； \"智選健康食物，食得有「營」\"','Örneğin: \"Daha aktif olalım!\"; \"Daha sağlıklı yiyecekler yiyelim\"','Ví dụ: \"Hãy sống tích cực hơn\"; \"Hãy ăn thức ăn bổ dưỡng hơn\"'),
	('how_will_you_fight','How will you fight breast cancer this year?','How will you fight breast cancer this year?','كيف ستحاربون سرطان الثدي هذا العام؟','¿Cómo combatirás el cáncer de mama este año?','¿Cómo vas a luchar contra el cáncer de mama este año?','Comment allez-vous combattre le cancer du sein cette année?','Wie möchten Sie dem Brustkrebs dieses Jahr trotzen?','이번 해에는 어떤 행동을 통해 유방암을 물리칠 건가요?','Πως επιλέγεις να προστατευτείς από τον καρκίνο του μαστού φέτος;','כיצד תילחמי בסרטן השד השנה?','Come lotterai contro il tumore al seno quest\'anno?','Este ano, como vai combater o cancro da mama?','Как вы поведете борьбу против рака груди в этом году?','今年妳會如何對抗乳癌？','Bu yıl meme kanserine karşı nasıl bir savaş açtınız?','Bạn sẽ làm gì để chống lại ung thư vú năm nay?'),
	('image_format_must_be','Image must be in BMP, PNG, GIF, or JPEG Format','Image must be in BMP, PNG, GIF, or JPEG Format','يجب أن تكون الصورة على صيغة BMP، PNG، GIF أو JPEG','La imagen debe estar en formato BMP, PNG, GIF, or JPEG',' la imagen tiene que estar en formato BMP, PNG, GIF o JPEG ','L\'image doit être au format BMP, PNG, GIF ou JPEG','das Foto muss im BMP, PNG, GIF, oder JPEG Format sein','이미지 확장자가 BMP, PNG, GIF, JPEG인 파일만 가능합니다.','Οι φωτογραφίες πρέπει να είναι στην μορφή BMP, PNG, GIF, ή JPEG ','התמונה חייבת להיות בפורמט BMP, PNG, GIF או JPEG','Le immagini sono nel formato BMP, PNG, GIF, o JPEG','Imagem tem de ser no formato BMP, PNG, GIF ou JPEG ','файл должен быть в одном из форматов: BMP, PNG, GIF, JPEG','圖檔須是BMP、PNG、GIF或JPEG 制式','Fotoğraf BMP, PNG, GIF veya JPEG Formatında olmalıdır.','Hình ảnh phải dưới dạng BMP, PNG, GIF, hay JPEG'),
	('instagram','Instagram','Instagram','انستاغرام','Instagram','Instagram','Instagram','Instagram','인스타그램','Instagram',' אינסטגרם','Instagram','Instagram','Instagram','Instagram','Instagram','Instagram'),
	('join_the_conversation','Join The Conversation','Join The Conversation','انضموا إلى المحادثة','Únete a la conversación','Únete a la iniciativa','Participez à la conversation','An der Unterhaltung teilnehmen','핑크리본 서클 참여하기','Πάρε μέρος στην συζήτηση','הצטרפי לשיחה','Partecipa alla Conversazione','Junte-se à conversa global','Включитесь в общение','加入對話','Sohbete Katılın','Tham Gia Trò Chuyện'),
	('join_the_fight_donate','Join the fight<br /><span style=\'font-size:160%\'>donate!</span>','Join the fight<br /><span style=\'font-size:160%\'>donate!</span>','انضموا إلى المعركة / التبرع!','Únete a la lucha / Dona!','Participa y haz una donación!','Rejoignez le combat | Faire un don!','Machen Sie mit! Spenden Sie für die Forschung!','투쟁에 동참하세요 | 기부하기!','Πάρε μέρος και εσύ στην μάχη ενάντια στον Καρκίνο του Μαστού','הצטרפי למאבק | תרמי!','DONATE IS DEACTIVATED FOR THE ITALIAN MARKET','Junte-se à Luta | Faça um donativo!','Включайтесь в борьбу против рака груди | Сделайте пожертвование! ','加入戰勝乳癌行動 | 請即捐款支持！','Savaşa Destek Verin I Bağış Yapın','Hãy cùng chiến đấu | Quyên góp !'),
	('load_more','Load More','Load More',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('logout','Logout','Logout',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('my_friends_circle','My Friend\'s Circle','My Friend\'s Circle',' أصدقائي','Mis Amigos','Mis Amigos','Mes amis','Meine Freunde','친구들','My Friends',' החברים שלי','I Miei Amici','Os meus Amigos ','Мои друзья','我的朋友','Arkadaşlarım','Bạn Bè'),
	('n_days_ago','# Days Ago','# Days Ago','# دقائق مضت','# días transcurridos','Hace # días','# jours','vor # Tagen','# 일 전','# Days Ago','לפני # ימים','# Giorni Fa','# Dias Atrás','# дней назад','# 天前','# Gün Önce','# Ngày Trước'),
	('n_friend_taking_action','# Friends Taking Action','# Friends Taking Action','# أصدقاء يقومون بعملهم ','# Amigos en acción','# amigos están participando','# Amis Agir','# Freunde gehören dazu','# 명의 친구들이 실천했습니다','# Φίλοι Δραστηριοποιήθηκαν','# חברים נוקטים פעולה','# Amici che stanno partecipando','# Amigos a Participar','# друзей','# 朋友們齊心行動','# Harekete Geçen Arkadaşılarınız ','# Bạn Đang Hành Động'),
	('n_hours_ago','# Hours Ago','# Hours Ago','# ساعات مضت','# Horas transcurridos','# horas','# Heures Ago','# Stunden','# 시간 전','# Hours Ago','לפני # שעות','# Ore Fa','# Horas Atrás','# часов назад','# 小時前','# Saat Önce','# Giờ Trước'),
	('n_min_ago','# Minutes Ago','# Minutes Ago','# دقائق مضت','# minutos transcurridos','Hace # minutos','# Minutes Ago','Vor # Minuten','# 분 전','# Minutes Ago','לפני # דקות','# Minuti Fa','# Minutos Atrás','#3 минут назад','# 分鐘前','# Dakika Önce','# Phút Trước'),
	('n_people_will','# People Will','# People Will','# أشخاص','# People Are','# Personas están','# Personnes sont','# Menschen sind','#명의 사람들이 [text] 를 서약했습니다.','# People Are','# נשים','# Insieme siamo','# People Are','# людей решили','# 人們將會','# İnsanlar','# Người Đang'),
	('next_step','Next Step','Next Step','الخطوة التالية','Siguiente Paso','Siguiente paso','Étape suivante','Nächster Schritt','다음단계','Επόμενο Βήμα','השלב הבא','Prossimo Step','Próximo Passo','Следующий шаг','下一步','Sonraki ','Bước tiếp theo'),
	('nm_created_a_circle_of_strength','[name] created a Circle of Strength','[name] created a Circle of Strength',' [name] ابتكر حلقة القوة','[name] creó un Círculo de Fortaleza','[name] ha creado un Círculo de Fuerza','[name] créé un cercle de force','[name] hat einen Circle of Strength gegründet','[name]님이 핑크리본 서클을 만들었습니다.','[name] δημιούργησε έναν Κύκλο Δύναμης','[name] יצרה מעגל כוח\"','[name] ha creato il Cerchio della Forza','[name] criado um Circulo de Força ','[name] создал(а) Круг поддержки','[Name]成立了抗癌力量社交圈','[name] bir Güç Çemberi oluşturdu.','[name] tạo một Vòng Tròn Sức Mạnh'),
	('no','NO','NO',' لا','NO','NO','NON','NEIN','아니요','δεν',' לא','NO','NÃO','HET','否','HAYIR','NO'),
	('okay','okay','okay',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('opt_copy','By providing my information, I acknowledge that I have read, understand and agree to the Terms and Conditions and Privacy Policy. I agree any personal information that I may provide here will be processed in accordance with the Privacy Policy [hyperlink] and transferred to the United States and I hereby give my consent to such processing and transfer. ','By providing my information, I acknowledge that I have read, understand and agree to the Terms and Conditions and Privacy Policy. I agree any personal information that I may provide here will be processed in accordance with the Privacy Policy [hyperlink] and transferred to the United States and I hereby give my consent to such processing and transfer. ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('or','or','or',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('create_your_own_action','OR Create your own action!','OR Create your own action!','أو ابتكروا فعلكم الخاص!','!O haz tu propia acción!','O Crea tu propia inciativa!','Ou créer votre propre action!','ODER kreieren Sie Ihren eigenen Slogan!','또는, 당신만의 특별한 행동을 보여주세요!','ή Δημιούργησε την δική σου δράση!','או צרי מטרה משלך!','O Crea la tua azione!','OU Crie a sua própria iniciativa!','ИЛИ добавьте действие!','或自發行動！','Ya da kendi önleminizi oluşturun!','HOĂC tạo hành động của riêng bạn!'),
	('photos','Photos','Photos',' صور','Fotos','Fotos','Photos','Fotos','사진','Photos','תמונות','Foto','Fotos','Фото','照片','Fotoğraflar','Hình Ảnh'),
	('post_to_profile','Post to profile','Post to profile','ضعوا تعليق على الملف الشخصي','Publícala en tu perfil','Compartir en mi muro','Poster sur le profil','Im eigenen Profil posten','Facebook 프로필에 게시','Post to profile','פוסט לפרופיל','Pubblica sul tuo Profilo','Faça um Post para o Perfil ','Опубликовать в профиле','張貼個人檔案','Profilinizde Paylaşın','Đăng thông tin cá nhân'),
	('privacy_policy','Privacy Policy','Privacy Policy','سياسة الخصوصية','Políticas de Privacidad','Política de privacidad','Politique de confidentialité','Datenschutz','개인정보취급방침','Πολιτική Απορρήτου','מדיניות ההגנה על פרטיות','Politica sulla Privacy','Política de Privacidade','Политика конфиденциальности','私隱政策','Gizlilik Sözleşmesi','Chính sách bảo mật'),
	('share','Share','Share','شاركوا','Compartir','compartir','Partager','Teilen','공유하기','Share','שיתוף','Condividi','Partilhar','Поделиться','分享','Paylaşın','CHIA SẼ'),
	('share_msg_twitter','We\'re stronger together. Take action against breast cancer by creating a Circle of Strength with those who support you most at [link].','We\'re stronger together. Take action against breast cancer by creating a Circle of Strength with those who support you most at [link].','معاً نحن أقوى. قوموا بدوركم ضد سرطان الثدي عن طريق ابتكار حلقة القوة مع أولئك الذين يدعمونكم [link]','Juntos somos más fuertes. Actúa en contra del cáncer de mama creando un Círculo de Fortaleza con aquellos que más te apoyen. [link]','Juntos somos más fuertes. Participa en la lucha contra el cáncer de mama, creando un Círculo de Fuerza con aquellos que más te apoyan [link]','Nous sommes plus forts ensemble. Prenez des mesures contre le cancer du sein en créant un cercle de force avec ceux qui vous soutiennent le plus [link]','Gemeinsam sind wir stark. Machen Sie mit im Kampf gegen den Brustkrebs und gründen Sie einen Circle of Strength mit denjenigen Menschen, die Sie unterstützen bei   [link].','우리가 함께할 때 더 큰 힘을 발휘할 수 있습니다. 당신에게 제일 힘이 되는 [link]와 함께 핑크리본 서클을 만들어 유방암을 물리치기 위한 행동을 보여주세요!','Μαζί είμαστε πιο δυνατοί. Πάρε δράση ενάντια στον Καρκίνο του Μαστού δημιουργώντας έναν Κύκλο Δύναμης μαζί με αυτούς που σε υποστηρίζουν [link]','אנחנו חזקות יותר ביחד. נקטי פעולה נגד סרטן השד עי יצירת מעגל כוח עם התומכים בך ביותר [link]','Siamo Più Forti Insieme. Lotta contro il tumore al seno creando un Cerchio della Forza con le persone che ti supportano [link]','Juntas somos mais Fortes. Participe na lita contra o Cancro da Mama criando um Circulo de Força com as pessoas que mais a apoiam. [link]','Вместе мы сильнее. Включайтесь в борьбу против рака груди – создайте свой Круг поддержки вместе с теми, кто вас поддерживает. [link]','我們團結一起，發揮更強力量。大家付諸行動，與最支持妳的在 [連結]成立抗癌力量社交圈，一起合力戰勝乳癌。 [link]','Birlikte daha güçlüyüz. Sizi en çok destekleyen kişiler ile bir Güç Çemberi oluşturarak meme kanserine karşı harekete geçin. [link]','Cùng Nhau Chúng Ta Sẽ Mạnh Hơn. Hãy hành động để chống lại căn bệnh ung thư vú bằng cách tạo Vòng Tròn Sức Mạnh với những người luôn ủng hộ bạn [link]'),
	('sign_in','Sign In','Sign In','سجلوا','Registrarse','Inscribirse','Connexion','anmelden','회원가입','Sign In','הצטרפות','Registrati','Registe-se','Вход','登入','Giriş Yapın','Đăng nhập'),
	('sort_by','Sort By','Sort By','الترتيب حسب','Clasificación por','Clasificación por','Trier par','Sortieren nach','정렬기준','Φίλτρο','מיון על פי','Ordina per','Sort By',' Выбрать','分類','Sıralar','Chọn bởi'),
	('step_1_choose_an_action','Step 1 : Choose an action for your Circle.','Step 1 : Choose an action for your Circle.','الخطوة 1: اختاروا فعل لحلقتكم','Paso 1: Escoge una acción para tu Círculo','Paso 1: Elige una acción para tu Círculo','Étape 1: Choisissez une action pour votre cercle','1. Schritt: Wählen Sie einen Slogan für Ihren Circle','1단계: 핑크리본 서클원이 함께 실천할 행동을 고르세요','Βήμα 1: Επέλεξε μια δράση για τον Κύκλο σου','שלב 1: בחרי פעולה למעגל','Step 1: Scegli un\'azione per il tuo Circolo','Passo 1: Escolha uma iniciativa para o seu Circulo','Шаг 1: выберите действие для вашего Круга','第1步： 為妳的社交圈選擇一個行動','Step 1: Çemberinizden bir hedef seçiniz.','Bước 1: Chọn hành động cho Vòng tròn của bạn'),
	('step_2_add_your_friend','Step 2: Add your friends. You may add up to 9 friends to your Circle.','Step 2: Add your friends. You may add up to 9 friends to your Circle.','الخطوة 2: أضيفوا أصدقائكم. يمكنم إضافة حتى 9 أصدقاء لحلقتكم.','Paso 2: Agrega a tus amigos. Puedes agregar hasta 9 amigos en tu Círculo.','Paso 2: Añade a tus amigos. Puedes añadir hasta 9 amigos en tu Círculo de Fuerza.','Étape 2: Ajoutez vos amis. Vous pouvez ajouter jusqu\'à 9 amis à votre cercle.','2. Schritt: Freunde hinzufügen. Sie können bis zu 9 Freunde zu Ihrem Circle hinzufügen.','2단계: 친구 추가하기. 당신의 핑크리본 서클에 친구를 9명까지 추가할 수 있습니다.','Βήμα 2: Προσθέστε Φίλους. Μπορείς να προσθέσεις μέχρι 9 φίλους στον Κύκλο σου','שלב 2: הוסיפי את חברותייך ניתן להוסיף עד 9 חברות למעגל שלך','Step 2: Invita i tuoi Amici. Puoi aggiungere fino a 9 amici nel tuo Cerchio.','Passo 2: Junte os seus amigos. Pode juntar até 9 amigos no seu Circulo.','Шаг 2: добавьте друзей. Вы можете добавить в свой Круг поддержки до 9 друзей. ','第2步： 新增朋友。妳可加入多至9位朋友。','Sonraki Step: Arkadaşlarınızı Ekleyin. Çemberinize en fazla 9 arkadaş ekleyebilirsiniz.','Bước 2: Thêm Bạn Bè. Bạn có thể thêm 9 người bạn vào Vòng Tròn của bạn.'),
	('submit','Submit','Submit','تسجيل','Aceptar','Enviar','Soumettre','senden','제출','Submit','הגישי','Invio','Submeter','Отправить','提交','Yükle','Gửi đi'),
	('terms_and_conditions','Terms & Conditions','Terms & Conditions','الشروط والأحكام ','Términos y Condiciones','Términos y Condiciones','Conditions générales','Nutzungsbedingungen ','이용약관','Οροι Συμμετοχής','תנאים','Termini e Condizioni','Terms & Conditions','Условия проведения','條款及細則','Katılım Koşulları','Các điều khoản và điều kiện'),
	('thank_you_creating_circle_copy','Thank you for creating a Circle of Strength! Let us help you reach your goal: LIKE US on Facebook so we can keep in touch. We\'re Stronger Together.','Thank you for creating a Circle of Strength! Let us help you reach your goal: LIKE US on Facebook so we can keep in touch. We\'re Stronger Together.','شكراً لابتكار حلقة القوة! دعونا نساعدكم للوصول إلى هدفكم: اضغطوا أعجبني على الفيس بوك لنبقى على تواصل. معاً نحن أقوى.','¡Gracias por crear un Círculo de Fortaleza! Déjanos ayudarte a alcanzar tu objetivo. Pon Me gusta en Facebook para mantenernos en contacto. Juntos Somos Más Fuertes.','Gracias por crear un Círculo de Fuerza! Te ayudaremos a alcanzar tu objetivo: Hazte fan nuestro en Facebook y nos mantendremos en contacto. Juntos somos más fuertes','Merci d\'avoir créé un Cercle de la force! Laissez-nous vous aider à atteindre votre objectif: LIKE US sur Facebook afin que nous puissions rester en contact. Nous sommes plus forts ensemble.','Vielen Dank, dass Sie einen Circle  gegründet haben! Wir helfen Ihnen, Ihr Ziel zu erreichen: Klicken Sie \"Gefällt mir\" auf Facebook, damit Sie immer über alle Schritte informiert sind. Denn nur gemeinsam sind wir stark.','핑크리본 서클을 만들어 주셔서 감사합니다! 우리가 당신의 목표를 달성하는 데 도움이 될 것입니다: 우리가 계속 알 수 있도록 페이스북에서 좋아요!를 눌러주세요. 우리가 함께할 때 더 큰 힘을 발휘할 수 있습니다.','Ευχαριστούμε που δημιούργησες έναν Κύκλο Δύναμης! Σε βοηθάμε να επιτύχεις τον σκοπό σου: Κάνε LIKE στη σελίδα μας στο Facebook για να είμαστε σε επαφή. Μαζί είμαστε πιο Δυνατοί','תודה שיצרת מעגל כוח! תני לנו לעזור לך להשיג את מטרתך: לחצי לנו לייק בפייסבוק על מנת שנשמור על קשר. אנחנו חזקות יותר ביחד','Grazie per aver creato il tuo Cerchio della Forza! Aiutaci a raggiungere il tuo obiettivo: Clicca MI PIACE sulla nostra pagina Facebook in modo da restare in contatto. Siamo Più Forti Insieme.','Obrigada por criar um Circulo de Força! Deixe-nos ajudá-la a atingir o seu objectivo: FAÇA UM LIKE no Facebook para mantermos o contacto. Juntas Somos Mais Fortes. ','Спасибо за создание Круга поддержки! Мы хотели бы помочь вам в достижении вашей цели: поставьте нам \"Like\" на Facebook и оставайтесь с нами на связи. Вместе мы сильнее!','多謝成立抗癌力量社交圈！讓我們助妳達成目標：請登入Facebook讚我們，大家保持聯絡。我們更加強健。 ','Güç Çemberinizi oluşturduğunuz için teşekkür ederiz! Hedefinize ulaşmanıza yardımcı olalım: Facebook\'ta bizi BEĞENİN, böylece bizden haberdar olabilirsiniz. Birlikte Daha Güçlüyüz.','Cảm ơn bạn đã tạo Vòng Tròn Sức Mạnh! Hãy để chúng tôi giúp bạn đạt được mục đích: LIKE trang của chúng tôi trên Facebook để giữ liên lạc.so we can keep in touch. Cùng Nhau Chúng Ta Sẽ Mạnh Hơn'),
	('trending_actions','Trending Actions','Trending Actions','إجراءات سائدة','Acciones en tendencia','Acciones más repetidas ','Actions tendance','Slogan entwerfen','전 세계의 행동서약','Δράσεις','פעולות נפוצות','Partecipa','Trending Actions','Действия','熱門行動','En Çok Okunan Hikayeler','Định Hướng Hành Động'),
	('twitter','Twitter','Twitter',' تويتر','Twitter','Twitter','Twitter','Twitter','트위터','Twitter',' טוויטר','Twitter','Twitter','Twitter','Twitter','Twitter','Twitter'),
	('upload_a_photo','Upload A Photo','Upload A Photo','حملوا صورة','Sube una foto','Sube una foto','Télécharger une photo','Foto hochladen','사진 올리기','Ανέβασε μια φωτογρφία','העלי תמונה','Carica una foto','Faça o Upload de UMA Foto','Загрузить фото','上傳相片','Fotoğraf Yükleyin.','Đăng Tải Hình Ảnh'),
	('uploaded_image_may_used_by_bca','Uploaded images may be used by the Breast Cancer Awareness Campaign on the internet and in other media','Uploaded images may be used by the Breast Cancer Awareness Campaign on the internet and in other media',' يمكن استخدام الصور التي تم تحميلها من قبل حملة الوعي ضد سرطان الثدي على الإنترنت وفي وسائل إعلام أخرى','Las imágenes cargadas pueden ser usadas por La Campaña de Concientizacion Contra el Cáncer de Mama en internet o cualquier otro medio ','las imágenes subidas podrán ser utilizadas en la Campaña de Concienciación sobre el Cáncer de Mama en internet u otros soportes','Les images téléchargées peuvent être utilisées par la campagne de sensibilisation du cancer du sein sur l\'internet et d\'autres médias','Hochgeladene Bilder können möglicherweise im Rahmen der Kampagne Bewusstsein für Brustkrebs im Internet und anderen Medien verwendet werden','업로드된 이미지는 인터넷상이나 다른 매체를 통한 유방암 의식 향상 캠페인에 활용될 수 있습니다.','Οι φωτογραφίες μπορούν να χρησιμοποιηθούν στην Εκστρατεία Ενημέρωσης για τον Καρκίνο του Μαστού μέσω Internet ή άλλων μέσων','התמונות שהועלו עלולות לשמש את קמפיין המודעות לסרטן השד באינטרנט או במדיות אחרות','Le immagini caricati potranno essere usate per la campagna Breast Cancer Awareness su internet o altri media.','As imagens podem ser usadas pela Campanha de Prevenção do Cancro da Mama na internet e noutros media ','загруженные вами фотографии могут быть использованы в рамках Кампании против рака груди на ее собственных интернет-ресурсах и в других медиа','上傳圖檔會用於網上或其他媒體上的「關注乳癌運動」','Yüklediğiniz fotoğraflar Meme Kanseri Farkındalık Kampanyası kapsamında internet ve medyada kullanılacaktır.','•          Hình ảnh được đăng tải có thể được Breast Cancer Awareness Campaign sử dụng trên internet và các phương tiện truyền thông khác'),
	('video','Video','Video','فيديو','Video','Video','Vidéo','Video','Video','Video','וידאו','Video','Video','Видео','短片','Video','Video'),
	('video_description',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('video_name',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('view','View','View','شاهدوا','Ver','Ver','Voir','ansehen','보기','View','לצפייה','Guarda','Ver','Смотреть','查看','Görüntüleyin','Xem'),
	('we_are_stronger_together','We\'re Stronger<br /><span style=\"font-size:165%\">together</span>','We\'re Stronger<br /><span style=\"font-size:165%\">together</span>','معاً نحن أقوى','Juntos somos más fuertes','Juntos somos más fuertes','Nous sommes plus forts ensemble','Gemeinsam sind wir stark.','우리가 함께할 때 더 큰 힘을 발휘할 수 있습니다','Μαζί είμαστε πιο Δυνατοί','אנחנו חזקות יותר ביחד','Siamo Più Forti Insieme','Juntas Somos Mais Fortes','Вместе мы сильнее.','We\'re Stronger Together','Birlikte Daha Güçlüyüz','Cùng Nhau Chúng Ta Sẽ Mạnh Hơn'),
	('we_will_text','We Will -','We Will -','سوف نقوم -  ','Nosotros Lograremos -','Nosotros vamos a -','Nous allons -','Wir werden -','우리의 목표는 -','Θα -','יחד -    ','Noi Faremo -','Vamos passar a -','Мы решили -','我們會 -','Biz olacak -','Chúng ta sẽ -'),
	('join_the_conversation_copy','Show how you\'re fighting breast cancer by creating a circle, uploading a photo, or tagging posts on Instagram and Twitter with #BCAstrength.','Show how you\'re fighting breast cancer by creating a circle, uploading a photo, or tagging posts on Instagram and Twitter with #BCAstrength.','','','','','','','','','','','','','',''),
	('who_makes_you_stronger','Who makes you stronger? Upload a photo to show us your Circle of Strength.','Who makes you stronger? Upload a photo to show us your Circle of Strength.','من يجعلكم اقوى؟ حمّلوا صورة لنرى حلقة القوة الخاصة بكم.','¿Quién te hace más fuerte? Sube una foto para enseñarnos tu Círculo de Fortaleza.','¿Quién te hace más fuerte? Sube una foto y enseñanos tu Círculo de Fuerza','Qui vous rend plus fort? Télécharger une photo pour nous montrer votre cercle de Force.','Wer macht Sie stark? Laden Sie ein Foto hoch, um Ihre Unterstützergruppe zu zeigen.','무엇이 당신을 강하게 만들어주나요? 사진을 올려 당신에게 힘을 주는 것들을 보여주세요!','Ποιος είναι αυτό που σε κάνει πιο δυνατό; Ανέβασε μια φωτογραφία για να εμφανίσεις τον δικό σου Κύκλο Δύναμης','מי מחזק אותך? העלי תמונה והציגי את מעגל הכוח שלך','Cosa ti rende più forte? Carica una foto per mostrare il tuo Cerchio della Forza.','Quem a torna mais forte? Faça o opload da fotografia para nos mostrar o seu Circulo de Força ','Кто делает вас сильнее? Загрузите фото - покажите ваш Круг поддержки. ','誰令妳更堅強？上傳相片，展示妳的抗癌力量社交圈。','Sizi güçlü yapan kim? Güç Çemberinize fotoğrafını ekleyin.','Ai giúp bạn mạnh hơn? Đăng tải hình ảnh thể hiện Vòng Tròn Sức Mạnh của bạn.'),
	('yes','YES','YES','نعم','SI','SI','OUI','JA','예','ναί','כן','SI','SIM','ДА','是','EVET','YES'),
	('yes_i_agree','Yes, I undestand and agree','Yes, I undestand and agree',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('you_agree_to_terms_conditions','You agree to our terms and conditions','You agree to our terms and conditions','أنت توافق على شروطنا وأحكامنا','Usted está de acuerdo con nuestros términos y condiciones','estás de acuerdo con nuestros Terminos y Condiciones','vous acceptez nos termes et conditions','Sie stimmen den Nutzungsbedingungen zu','사이트 이용약관에 동의합니다.','Ότι συμφωνείς στους Όρους  Χρήσης και Πολιτικής','את מסכימה לתנאי האתר','Aderisci ai Termini e Condizioni.','You agree to our terms and conditions','вы согласны с нашими Условиями проведения','妳同意我們的條款及細則','Katılım koşullarını okudunuz ve kabul ediyorsunuz.','You agree to our terms and conditions'),
	('you_are_only_person_in_photo','You are the only person in the photo or you have permission from everyone in the photo','You are the only person in the photo or you have permission from everyone in the photo','أنت الشخص الوحيد في الصورة أو تملك إذن جميع من في الصورة','Tu eres la única persona o tienes el permiso de todas las personas en la foto','que eres la única persona en la foto o que tienes permiso de todas las personas fotografiadas','Vous êtes la seule personne sur la photo ou si vous avez l\'autorisation de chacun dans la photo','Sie sind die einzige Person auf dem Foto oder Sie haben die Erlaubnis von jedem, der auf dem Foto zu sehen ist','본인 한 사람만 나온 사진이거나, 사진속에 있는 모두의 동의를 받은 사진이어야 합니다.','Ότι είσαι αυτός που παρουσιάζεται στην φωτογραφία ή ότι έχεις την άδεια όσων εμφανίζονται στην φωτογραφία','את מופיעה בתמונה בלבד או קיבלת רשות מכל המופיעים בתמונה','Tu sei l\'unica persona nella foto o che hai avuto il consenso da parte di tutte le persone nella foto.','É a única pessoa na fotografia ou tem autorização de todas as pessoas na fotografia ','вы являетесь единственным человеком на фото или имеете разрешение всех изображенных на фото на его публикацию','妳是唯一的相中人或妳獲得相片中所有人的批准','Fotoğraftaki kişi sizsiniz ya da fotoğraftaki herkesin kullanımı için izni bulunmaktadır.','Chỉ một mình bạn trong hình hoặc bạn được sự đồng ý của những người trong hình'),
	('you_are_photographer_or_have_permission','You are the photographer or you have the photographer’s permission','You are the photographer or you have the photographer’s permission','أنت المصور أو لديك إذن من المصور','Tu eres el fotógrafo o tienes el permiso del fotógrafo','que eres el propietario de la imagen o cuentas con su permiso','Vous êtes le photographe ou si vous avez la permission du photographe','Sie sind der Fotograf oder Sie haben die Erlaubnis des Fotografen','본인이 찍은 사진이거나, 사진사의 동의를 받은 사진이어야 합니다.','Ότι εσύ είσαι ο φωτογράφος ή ότι έχεις την άδεια του φωτογράφου να την χρησιμοποιήσεις','את הצלמת או קיבלת ממנו/ה רשות','Hai scattato la foto o hai avuto il permesso di chi ha scattato la foto','A fotografia é da sua autoria ou tem autorização do fotógrafo ','вы являетесь автором фотографии или имеете разрешение автора на ее публикацию','妳是攝影師或妳獲得攝影師的批准','Fotoğraf size aittir ya da fotoğrafçının izni bulunmaktadır.','Bạn là người chụp hình hoặc có quyền sử dụng hình chụp'),
	('my_circles','My Circles','My Circles','حلقاتك','Tus Círculos','Tus círculos','Vos cercles','Ihren Circle','내 핑크리본 서클','Οι Κύκλοι σου','המעגלים שלך','Il Tuo Cerchio','Os seus Circulos','Ваши Круги поддержки ','妳的社交圈','Çemberleriniz','Vòng Tròn Của Bạn'),
	('you_havent_complete_circle_copy','You haven\'t completed your Circle of Strength and your information will not be saved. Are you sure you want to exit?','You haven\'t completed your Circle of Strength and your information will not be saved. Are you sure you want to exit?','لم يتم استكمال حلقة القوة الخاصة بكم ولن يتم حفظ معلوماتكم. هل أنتم متأكدون من رغبتكم في الخروج؟','No has completado tu Círculo de Fortaleza y tu información no se guardará. Estás seguro que deseas salir?','No has completado tu Círculo de Fuerza y no se ha podido guardar la información. Quieres salir?','Vous n\'avez pas terminé votre cercle de Force et votre information ne sera pas sauvegardé. Etes-vous sûr de vouloir quitter?','Sie haben Ihren Circle of Strength noch nicht vollständig erstellt und ihre Informationen werden nicht gespeichert. Möchten Sie diese Seite wirklich verlassen?','아직 당신의 핑크리본 서클을 완성하지 못했고, 당신의 정보는 저장되지 않을 것입니다. 정말 나가시겠습니까?','Δεν συμπλήρωσες τον Κύκλο Δύναμης και οι πληροφορίες δεν θα αποθηκευθούν. Είσαι σίγουρος/η ότι θέλεις να κάνεις exit; ΝΑΙ ΌΧΙ','טרם השלמת את מעגל הכוח שלך והמידע שלך לא יישמר. בטוחה שאת רוצה לצאת? כן לא','Noi hai completato il tuo Cerchio della Forza e le tue informazioni non saranno salvate. Sei sicuro di voler uscire?','Não completou o seu Circulo de Força e a informação não ficará gravada. Tem a certeza que quer sair?','Вы не завершили процесс создания Круга поддержки. Ваша информация не будет сохранена. Вы уверены, что хотите выйти?','妳的抗癌力量社交圈尚未完整成立，資料將不會儲存。妳確定要退出嗎?','Güç Çemberinizi henüz tamamlamadınız ve bilgileriniz kaydedilmeyecektir. Çıkmak istediğinizden emin misiniz?','Bạn chưa hoàn tất Vòng Tròn Sức Mạnh của bạn và thông tin của bạn chưa được lưu. Bạn có chắc là muốn thoát? YES NO'),
	('you_may_add_9_friends_to_circle','You may add up to 9 friends to your Circle.','You may add up to 9 friends to your Circle.','يمكنم إضافة حتى 9 أصدقاء لحلقتكم.','Puedes agregar hasta 9 amigos en tu Círculo','Puedes añadir hasta 9 amigos en tu Círculo de Fuerza','Vous pouvez ajouter jusqu\'à 9 amis à votre cercle.','Sie können bis zu 9 Freunde zu Ihrem Circle hinzufügen.','당신의 핑크리본 서클에 친구를 9명까지 추가할 수 있습니다.','Μπορείς να προσθέσεις μέχρι 9 φίλους στον Κύκλο σου','ניתן להוסיף עד 9 חברות למעגל שלך','Puoi aggiungere fino a 9 amici nel tuo Cerchio.','Pode juntar até 9 amigos no seu Circulo.','Вы можете добавить в свой Круг поддержки до 9 друзей. ','妳可加入多至9位朋友','Çemberinize en fazla 9 arkadaş ekleyebilirsiniz.','Bạn có thể thêm 9 người bạn vào Vòng Tròn của bạn.'),
	('goal_6','Support someone in your life.','Support someone in your life.','ادعموا أحداً في حياتكم.','Apoya a una persona de tu vida','Apoyar a alguien de nuestro alrededor','Soutenir quelqu\'un dans votre vie.','Unterstützen Sie jemanden in Ihrem Umfeld.','누군가에게 힘이 되어 주기','Υποστήριξε κάποιον','תמכי במישהו בחייך','Sostieni qualcuno nella tua vita.','Ajude alguém na sua vida. ','оказать поддержку нуждающимся знакомым.','支持身邊認識的人。','Hayatınızda birine destek olun.','Hỗ trợ mọi người trong cuộc sống'),
	('goal_5','Walk together, cook healthy together, and support each other.','Walk together, eat healthy together, and support each other.','امشوا معاً، اطبخوا طعاماً صحياً معاً، وادعموا بعضكم بعضاً.','Camina en compañía, cocina sanamente en compañía y apóyense mutuamente','Salir a caminar juntos, cocinar más sano y apoyarnos mutuamente ','Marcher ensemble, cuisiner sain ensemble et se soutenir mutuellement.','Gemeinsam laufen, gemeinsam gesünder kochen und sich gegenseitig unterstützen.','함께 걷고, 함께 건강한 음식을 만들며 서로에게 힘이 되어 주기','Περπατήστε μαζί, μαγειρέψτε πιο υγιεινά μαζί και υποστηρίξτε ο ένας τον άλλον','עשו הליכה יחד, בשלו בריא יחד ותמכו אחת בשנייה','Passeggiate insieme, cucinate cibi sani insieme, e sostenetevi a vicenda.','Faça caminhadas com amigas, coma de uma forma saudável e ajudem-se umas às outras.','совершать совместные пешие прогулки, вместе осваивать полезные рецепты, поддерживать друг друга. ','和朋友一起步行，一起煮食，彼此互相支持。','Birlikte yürüyün, birlikte yemek yapın ve birbirinize destek olun.','Đi bộ cùng nhau, nấu thức ăn bổ dưỡng cùng nhau, và hỗ trợ lẫn nhau.'),
	('goal_1','Be proactive. Schedule a mammogram.','Be proactive. Schedule a mammogram.','كونوا سبّاقين. في تحديد ماموغرام.','Se productivo. Programa una mastografía','Ser proactivas y comprometernos a realizarnos una mamografía','Soyez proactif. Programmer une mammographie.','Seien Sie proaktiv.Vereinbaren Sie einen  Mammographie Termin.','미리 예방하세요. 유방암 검진 일정 잡기','Πάρε δράση. Προγραμμάτισε μια μαστογραφία','נקטי יוזמה. תאמי בדיקת ממוגרמה','Sii proattiva. Prenota una mammografia.','Seja proactiva. Marque uma mamografia.','проявить инициативу: записаться на маммографическое обследование.','行動至上：按排乳房造影檢查','Proaktif olun. Mamogram randevunuzu alın.','Hãy chủ động. Lên lịch chụp hình kiểm tra khối u ngực.'),
	('goal_4','Drink less. Limit your alcohol intake and toast to a healthier life.','Drink less. Limit your alcohol intake and toast to a healthier life.','تناولوا المشروبات الكحولية بشكل أقل. قللوا من كمية الكحول واشربوا نخب حياة صحية أفضل.','Bebe menos. Limita tu consumo de alcohol y brinda por una vida más saludable.','Límitar el consumo de alcohol y brindar por una vida más sana','Boire moins. Limitez votre consommation d\'alcool et de pain grillé pour une vie plus saine.','Trinken Sie weniger Alkohol und leben Sie gesünder.','음주를 줄이세요. 알코올 섭취량을 줄이고 더 건강한 삶을 위해 노력하기','Ελάττωσε την ποσότητα αλκοόλ που πίνεις','שתי פחות אלכוהול. הגבילי את צריכת האלכוהול עבור חיים בריאים יותר.','Bevi meno. Limita il consumo di alcolici e brinda a una vita più sana.','Beba menos. Limite a ingestão de álcool e brinde a uma vida mais saudável. ','сократить потребление алкоголя: ограничить количество и помнить о здоровье.','遠離酒精，為健康生活乾杯。','Az alkol tüketin. Sağlıklı bir yaşam şekli için alkol tüketiminizi kontrol edin.','Uống ít. Hạn chế những thức uống có cồn và uống mừng để có cuộc sống khỏe mạnh hơn.'),
	('goal_3','Donate. Fund breast cancer research and help eradicate this disease.','Donate. Fund breast cancer research and help eradicate this disease.','','','','','','','','','','','','','',''),
	('goal_2','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','عيشوا بصحة جيدة. تناولوا أطعمة غنية بمضادات الأكسدة وحافظوا على وزن صحي.','Vive más sanamente. Come alimentos ricos en antioxidantes y mantén un peso saludable','Llevar una vida más sana. Comer alimentos ricos en antioxidantes y mantener un peso adecuado','Vivre sainement. Mangez des aliments riches en antioxydants et maintenir un poids santé.','Leben Sie gesund. Ernähren Sie sich ausgewogen und achten Sie auf Ihr Gewicht.','건강한 생활을 유지하세요. 항산화효과가 뛰어난 음식을 먹고 적정체중 유지하기','Ακολούθησε μια πιο υγιεινή ζωή. Επέλεξε τροφές πλούσιες σε αντι-οξειδωτικά και διατήρησε το βάρος σου','לחיות בריא. אכלי אוכל עשיר-נוגד חמצון ושמרי על משקל בריא','Vivi in modo sano. Mangia cibi ricchi di antiossidanti e mantieni il peso forma.','Viva saudavelmente. Opte por comida rica em anti-oxidantes e mantenha um peso saudável.','перейти на здоровый образ жизни: рацион, богатый антиоксидантами, плюс нормальный вес.','活得健康。多吃含豐富抗氧化物的食物，保持體重適中。','Sağlıklı yaşayın. Zengin antioksidan içeren yiyecekler tüketin ve kilonuzu koruyun.','Sống lành mạnh. Ăn thức ăn giàu chất chống oxi hóa và giữ đúng cân nặng.'),
	('main_image_copy','Together, take action in defeating breast cancer by inviting your friends to join your circle of strength. Show how you\'re fighting breast cancer by creating a circle, uploading a photo, or tagging posts on Instagram and Twitter with #BCAstrength.','Together, take action in defeating breast cancer by inviting your friends to join your circle of strength. Show how you\'re fighting breast cancer by creating a circle, uploading a photo, or tagging posts on Instagram and Twitter with #BCAstrength.','','','','','','','','','','','','','',''),
	('featured_around_world','Featured From Around The World','Featured From Around The World','تم عرضها من جميع أنحاء العالم','Destacado en todo el mundo','Participando desde todo el mundo ','Sélection à travers le monde','Weltweite Unterstützung','세계 곳곳의 핑크리본 서클들','Από όλο τον κόσμο','מסביב לעולם','I più Cliccati','À volta do Mundo','Новости со всего мира','來自世界各地的分享','Tüm Dünyada Gerçekleşmektedir.','Đặc Trưng Trên Toàn Thế Giới '),
	('footer_copy','Breast cancer affects 1 in 8 women in their lifetime. A donation of $50 raised by a Circle funds approximately one hour of lifesaving research through The Breast Cancer Research Foundation®. Donate now and take us a step closer to eradicating this disease.','Breast cancer affects 1 in 8 women in their lifetime. A donation of $50 raised by a Circle funds approximately one hour of lifesaving research through The Breast Cancer Research Foundation®. Donate now and take us a step closer to eradicating this disease.','سرطان الثدي يصيب امرأة واحدة من أصل 8 خلال فترة حياتهم. يمكن لتبرع بمقدار 50 دولار يتم جمعه من قبل حلقة أن يموّل ما يقارب ساعة من الأبحاث المنقذة للأرواح من خلال منظمة أبحاث سرطان الثدي®. تبرعوا الآن ودعونا نقترب خطوة إلى الأمام في القضاء على هذا المرض.','El cáncer de mama afecta a una de cada 8 mujeres. Una donación de $50  USD que recaude un Círculo, suma una hora de investigación por medio de The Breast Cancer Research Foundation®. Dona ahora y llévanos un paso más cerca terminar con esta enfermedad','El cáncer de mama afecta a 1 de cada 8 mujeres a lo largo de su vida. Una donación de 50$ de un Círculo financia aproximadamente una hora de investigación de \"The Breast Cancer Research Foundation\". Realiza tu donación y ayúdanos a erradicar esta enfermedad','Le cancer du sein touche 1 femme sur 8 dans leur vie. Un don de 50 $ amassés par un cercle paie environ une heure de recherche d\'importance vitale à travers The Breast Cancer Research Foundation ®. Donnez maintenant et nous prendre un pas de plus vers l\'éradication de cette maladie.','Jede 8. Frau ist in ihrem Leben von Brustkrebs betroffen.  Eine Spende von ca. 70.- Euro, initiiert von Ihrem Circle, kann eine Stunde Forschung durch die Breast Cancer Research Foundation® finanzieren.','전체 여성의 8명 중 1명은 유방암을 경험합니다.. Circle을 통해 50달러를 유방암 연구 재단에 기부한다면, 생명연장을 위한 1시간의 연구를 도울 수 있습니다. 유방암 근절에 한 발 더 다가가기 위해 지금 바로 기부해주세요! ','Ο Καρκίνος του Μαστού επηρεάζει 1 στις 8 γυναίκες. Η δωρεά $50 από έναν Κύκλο, αντιστοιχεί σε περίπου 1 ώρα σωτήριας έρευνας μέσω του Breast Cancer Research Foundation. Κάνε την δωρεά σου και βοήθησε και εσύ να προχωρήσουμε ένα ακόμα βήμα προς την εξάλειψη αυτής της νόσου','אחת מ-8 נשים תחלה בסרטן השד. תרומה של 50$ שגוייסה ע\"י כספי המעגל שווה בקירוב לשעה של מחקר מציל חיים של הקרן למחקר סרטן השד. תרמי עכשיו וקחי אותנו צעד אחד קדימה בהעלמת המחלה','DONATE IS DEACTIVATED FOR THE ITALIAN MARKET','O Cancro da Mama afecta 1 em cada 8 mulheres durante o seu tempo de vida. Um donativo de $50 angariado por um Círculo vai apoiar financeiramente uma hora, aproximadamente, de pesquisa através da The Breast Cancer Research Foundation®. Faça agora o donativo e ajude-nos a dar mais um passo no sentido da erradicação da doença. ','Рак груди поражает каждую восьмую женщину. Всего 50 долларов, собранные любым Кругом поддержки, позволят Фонду исследований рака груди® финансировать час исследований, направленных на спасение жизней. Сделайте пожертвование прямо сейчас, чтобы еще на шаг приблизиться вместе с нами к искоренению заболевания. ','每8 名女性中，就有1名女性會罹患乳癌。只要一個社交圈籌得50美元善款，就約可提供乳癌研究基金會一小時拯救生命的研究經費。請即捐款支持，讓我們合力創造沒有乳癌的世界。','Meme kanseri her 8 kadından 1\'inin hayatını etkilemektedir. Çemberler tarafından yapılacak 50$  bir bağış ile Meme Kanseri Araştırma Kurumunun® yaklaşık olarak bir saatlik araştırması karşılanmaktadır.','Cứ 8 phụ nữ thì có 1 phụ nữ chịu ảnh hưởng bởi căn bệnh ung thư vú. Mỗi 50 đô la quyên góp cho quỹ Circle lại giúp chúng tôi kéo dài thêm khoảng 1 giờ sống sót cho bệnh nhân mắc bệnh ung thư vú thông qua The Breast Cancer Research Foundation®. Bạn hãy quyên góp ngay bây giờ để chúng ta tiến gần hơn đến việc xóa bỏ căn bệnh này.');

/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
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
	(36,'2013-09-02 01:59:11','','photo_1377846937.jpg'),
	(50,'2013-09-02 03:29:09','','photo_1378106949.jpg'),
	(51,'2013-09-03 12:12:06','','photo_1378224726.jpg'),
	(52,'2013-09-03 13:29:00','','photo_1378229340.jpg');

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
