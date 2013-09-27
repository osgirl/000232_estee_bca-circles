# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 40west.esteeonline.com (MySQL 5.5.19-log)
# Database: bca_stronger
# Generation Time: 2013-09-27 22:15:43 +0000
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
	(99,'100004230341650',NULL,'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c38.0.190.190/150457_180736948743982_171810183_n.jpg','Be proactive. Schedule a mammogram.','2013-09-20 03:54:39',1,'us'),
	(100,'61301056','Sarah Tranter','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/s200x200/1208780_10100375640450934_1133113751_n.jpg','Be proactive. Schedule a mammogram.','2013-09-20 06:51:10',1,'gb'),
	(101,'577625226','Angharad Jones','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c43.43.540.540/s480x480/994877_10153084593995227_2002299892_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-20 06:52:49',5,'gb'),
	(102,'61301056','Sarah Tranter','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/s200x200/1208780_10100375640450934_1133113751_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-20 07:07:54',2,'us'),
	(103,'61301056','Sarah Tranter','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/s200x200/1208780_10100375640450934_1133113751_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-20 07:11:15',5,'us'),
	(104,'577625226','Angharad Jones','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c43.43.540.540/s480x480/994877_10153084593995227_2002299892_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-20 07:28:01',2,'gb'),
	(105,'711301674','Colleen Renee Gibson','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/419292_10151512832331675_1147059129_n.jpg','Be proactive. Schedule a mammogram.','2013-09-20 15:44:14',1,'us'),
	(106,'1305641','JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c46.42.520.520/s200x200/1011158_10100393758756104_1916110370_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-09-20 17:59:53',3,'us'),
	(107,'1022351942','Francesca Riela','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c41.41.518.518/s200x200/1234307_10201158915667972_1814255981_n.jpg',NULL,'2013-09-21 10:31:15',4,'it'),
	(108,'1022351942','Francesca Riela','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/s200x200/1005967_10200786525918461_169125431_n.jpg','Vivi in modo sano. Mangia cibi ricchi di antiossidanti e mantieni il peso forma.','2013-09-22 09:25:49',2,'it'),
	(109,'1022351942','Francesca Riela','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/s200x200/1005967_10200786525918461_169125431_n.jpg','Condurremo una vita sana e attraverso la prevenzione lotteremo contro il tumore ','2013-09-22 10:13:21',27,'it'),
	(110,'601621127','Caren Browning','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c87.32.395.395/s200x200/247821_10150203796806128_1279885_n.jpg','Be proactive. Schedule a mammogram.','2013-09-22 13:35:41',1,'us'),
	(111,'11300490','Caitlin Costello','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/c19.0.436.436/s200x200/995487_10101229113623354_2108976566_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-22 14:45:07',2,'us'),
	(112,'100001784446195','Hyunjeong Lee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c50.50.621.621/s200x200/555092_483140221755455_757573957_n.jpg','???? ??? ? ?? ??? ??? ???? ??? ????','2013-09-22 22:24:07',28,'us'),
	(113,'100001784446195','Hyunjeong Lee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c50.50.621.621/s200x200/555092_483140221755455_757573957_n.jpg','?? ?????. ??? ?? ?? ??','2013-09-22 22:40:27',1,'us'),
	(114,'100001784446195','Hyunjeong Lee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c50.50.621.621/s200x200/555092_483140221755455_757573957_n.jpg','?? 30?? ????','2013-09-23 00:32:01',29,'us'),
	(115,'545135613','Hai Au Nguyen Vu','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/c66.66.828.828/s200x200/1208979_10151565540200614_394504571_n.jpg',NULL,'2013-09-23 05:33:13',5,'vn'),
	(116,'100001784446195','Hyunjeong Lee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c50.50.621.621/s200x200/555092_483140221755455_757573957_n.jpg','','2013-09-23 07:01:45',2,'us'),
	(117,'100001784446195','Hyunjeong Lee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c50.50.621.621/s200x200/555092_483140221755455_757573957_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-09-23 07:04:38',3,'us'),
	(118,'5738731','Jacquie Pelusi','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/c66.66.828.828/s200x200/485406_10101891765608408_1642993255_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-23 13:29:19',2,'us'),
	(119,'1311819004','Heather Bergstein','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c50.50.621.621/s200x200/488387_4504454892083_1750235000_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-09-23 13:31:16',3,'us'),
	(120,'824135626','Joanne Lee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c0.135.720.720/s200x200/1234009_10153250010450627_1357524169_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-23 13:31:49',5,'us'),
	(121,'706477395','Kelly Tsou Cook','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c66.66.828.828/s200x200/1233420_10151555322222396_2105791975_n.jpg','empower ourselves with action. Get a mammogram and make healthy choices.','2013-09-23 23:36:57',30,'us'),
	(122,'1305641','JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c46.42.520.520/s200x200/1011158_10100393758756104_1916110370_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-09-24 10:17:07',3,'us'),
	(123,'731124889','Teena Turner','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/c12.163.621.621/s200x200/7794_10151653372474890_544761126_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-24 12:30:56',2,'us'),
	(124,'1018260085','Kat Tanita','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/c44.45.551.551/s200x200/1184905_10201295767209039_1876313794_n.jpg','Be proactive. Schedule a mammogram.','2013-09-24 13:05:23',1,'us'),
	(125,'1018260085','Kat Tanita','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/c44.45.551.551/s200x200/1184905_10201295767209039_1876313794_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-24 13:06:05',5,'us'),
	(126,'1305641','JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c46.42.520.520/s200x200/1011158_10100393758756104_1916110370_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-24 13:12:01',5,'us'),
	(127,'1092258942',NULL,'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/s160x160/186093_1092258942_505493028_n.jpg','','2013-09-24 13:17:09',1,'pt'),
	(128,'515740719','Amber Katz','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c66.66.828.828/s200x200/1175397_10153172353415720_1303181983_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-24 21:23:45',2,'us'),
	(129,'1305641','JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c46.42.520.520/s200x200/1011158_10100393758756104_1916110370_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-25 08:40:40',2,'us'),
	(130,'100005010155504','Jamie Beck','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c178.0.604.604/s200x200/600249_1002029915098_1903163647_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-25 09:24:02',5,'us'),
	(131,'100001349797562','Sanghyun Park','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/c54.54.669.669/s200x200/480834_473334982721491_640290652_n.jpg','???? ????? ??? ??? ?? ?? ????.','2013-09-25 09:39:26',4,'kr'),
	(132,'1305641','JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c46.42.520.520/s200x200/1011158_10100393758756104_1916110370_n.jpg','Be proactive. Schedule a mammogram.','2013-09-25 11:11:17',1,'us'),
	(133,'679680877','Kristin Mason','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c50.50.621.621/s200x200/1231410_10151630355180878_1967834931_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-25 12:32:19',2,'us'),
	(134,'1305641','JaKenna Marise Gilbert','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c46.42.520.520/s200x200/1011158_10100393758756104_1916110370_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-09-25 15:50:27',3,'us'),
	(135,'1147561716','Jurnee Smollett','https://scontent-b.xx.fbcdn.net/hphotos-frc1/c55.75.344.345/s235x350/1185159_10201717565438041_1726137128_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-26 02:55:31',2,'us'),
	(136,'501924919','Kelly McDonnell','https://scontent-a.xx.fbcdn.net/hphotos-prn2/c16.16.202.202/p235x165/1234003_10151846724369920_713446227_n.jpg','Be proactive. Schedule a mammogram.','2013-09-26 10:02:05',1,'us'),
	(137,'1305641','JaKenna Marise Gilbert','https://scontent-a.xx.fbcdn.net/hphotos-ash3/c46.41.519.520/s240x240/1011158_10100393758756104_1916110370_n.jpg','Support someone in our lives.','2013-09-26 11:21:06',6,'us'),
	(138,'608591943','Fran Ca','https://scontent-b.xx.fbcdn.net/hphotos-ash4/c16.16.202.202/p235x165/405897_10151621174321944_1246404350_n.jpg','Be proactive. Schedule a mammogram.','2013-09-26 12:19:41',1,'us'),
	(139,'608591943','Fran Ca','https://scontent-b.xx.fbcdn.net/hphotos-ash4/c16.16.202.202/p235x165/405897_10151621174321944_1246404350_n.jpg',NULL,'2013-09-26 12:39:28',2,'us'),
	(140,'11300490','Caitlin Costello','https://scontent-a.xx.fbcdn.net/hphotos-frc1/c8.0.206.206/p206x206/995487_10101229113623354_2108976566_n.jpg','Drink less. Limit our alcohol intake and toast to a healthier life.','2013-09-26 13:13:36',4,'us'),
	(141,'737516912','Jill Seiman','https://scontent-a.xx.fbcdn.net/hphotos-ash3/c42.18.203.203/p240x240/1229861_10151904132676913_1247045505_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-26 15:02:36',2,'us'),
	(142,'100002418796566','Ingrid Estee Cabrera','https://scontent-b.xx.fbcdn.net/hphotos-ash3/c13.13.173.173/527066_262182793872345_414190972_n.jpg','not drink alcohol!','2013-09-26 15:10:16',31,'us'),
	(143,'1311819004','Heather Bergstein','https://scontent-a.xx.fbcdn.net/hphotos-ash4/c16.16.202.202/p235x165/488387_4504454892083_1750235000_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-26 15:16:56',5,'us'),
	(144,'43907486','Ingrid Cabrera','https://scontent-a.xx.fbcdn.net/hphotos-prn1/c16.16.202.202/p235x165/163376_889174744960_1423893670_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-26 15:28:52',2,'us'),
	(145,'559572655','Stevie Journey','https://scontent-b.xx.fbcdn.net/hphotos-ash3/p200x200/943346_10152192173857656_1261108357_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-26 15:29:56',2,'us'),
	(146,'27904138','Meghan Butler','https://scontent-b.xx.fbcdn.net/hphotos-prn1/p200x200/45980_10100220961698060_1542749629_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-26 15:39:53',2,'us'),
	(147,'1305641','JaKenna Marise Gilbert','https://scontent-a.xx.fbcdn.net/hphotos-ash3/c46.41.519.520/s240x240/1011158_10100393758756104_1916110370_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-09-26 15:48:07',3,'us'),
	(148,'1229070218','Kate DeRosa','https://scontent-b.xx.fbcdn.net/hphotos-frc3/c16.16.202.202/p235x165/972165_10200701388596972_1444811316_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-26 17:37:03',2,'us'),
	(149,'4918406','Shannon Otto','https://scontent-a.xx.fbcdn.net/hphotos-frc3/c56.33.207.207/p240x240/1236043_10102511799685140_1108705815_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-26 17:37:52',2,'us'),
	(150,'727714729','Asli Soycengiz Ayata','https://scontent-a.xx.fbcdn.net/hphotos-ash4/c23.16.206.207/p240x240/287_16954504729_953_n.jpg','Eat antioxidants and not eat the lobby choclates','2013-09-26 18:40:08',32,'us'),
	(151,'1286803386','Stephanie Van Schaik Schneider','https://scontent-a.xx.fbcdn.net/hphotos-ash4/c123.26.332.333/s350x350/315780_1985675763345_2091125_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-26 19:14:18',2,'us'),
	(152,'13903827','Seth Orion Viebrock','https://scontent-b.xx.fbcdn.net/hphotos-prn1/c16.16.202.202/p235x165/61430_10103574766331550_913793749_n.jpg','Be proactive. Schedule a mammogram.','2013-09-26 20:19:16',1,'us'),
	(153,'100001341402997','Sijin Lee','https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash4/c16.16.202.202/p235x165/1234325_540414976013211_1386063367_n.jpg','?? ???? ?? ??? ?? ?? ??.','2013-09-26 21:49:30',1,'kr'),
	(154,'587463934','Ina Casas','https://scontent-a.xx.fbcdn.net/hphotos-ash3/c16.32.202.203/p235x165/1185989_10151620461363935_934767543_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-26 22:10:54',2,'us'),
	(155,'512205185','Nicole Riemma','https://scontent-b.xx.fbcdn.net/hphotos-ash4/c77.16.207.207/p240x240/1000507_10151700769290186_621968203_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-26 22:33:46',2,'us'),
	(156,'1476615559',NULL,'https://scontent-b.xx.fbcdn.net/hphotos-prn1/c56.16.207.207/p240x240/19906_10200200204795941_1449759508_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-27 05:38:06',2,'us'),
	(157,'669436575','Kathi Vogt','https://scontent-a.xx.fbcdn.net/hphotos-frc3/c15.15.194.194/p75x225/996569_10151559847526576_1032867758_n.jpg',NULL,'2013-09-27 06:33:35',2,'de'),
	(158,'100001341402997','Sijin Lee','https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash4/c16.16.202.202/p235x165/1234325_540414976013211_1386063367_n.jpg','?? ???? ?? ??? ?? ?? ??.','2013-09-27 09:29:20',1,'us'),
	(159,'500053638','Ophelia Ceradini','https://scontent-a.xx.fbcdn.net/hphotos-ash3/c16.16.202.202/p235x165/529379_10150905273498639_1136337106_n.jpg','Support someone in our lives.','2013-09-27 10:12:02',6,'us'),
	(160,'500053638','Ophelia Ceradini','https://scontent-a.xx.fbcdn.net/hphotos-ash3/c16.16.202.202/p235x165/529379_10150905273498639_1136337106_n.jpg','maintain a positive mental outlook','2013-09-27 10:20:42',33,'us'),
	(161,'500053638','Ophelia Ceradini','https://scontent-a.xx.fbcdn.net/hphotos-ash3/c33.33.413.413/p480x480/529379_10150905273498639_1136337106_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-27 10:23:55',2,'us'),
	(162,'8642831','Jenny Corbett','https://scontent-b.xx.fbcdn.net/hphotos-ash3/p200x200/1186908_10102460384875867_747263270_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-27 11:12:20',5,'us'),
	(163,'4708373','Annie Weiss','https://scontent-a.xx.fbcdn.net/hphotos-ash2/c16.32.202.202/p235x165/545715_988674331598_125527164_n.jpg','Support someone in our lives.','2013-09-27 11:58:50',6,'us'),
	(164,'52701759','Annie Goodman','https://scontent-a.xx.fbcdn.net/hphotos-prn2/c16.16.202.202/p235x165/971474_968688748348_1091114642_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-09-27 13:30:52',3,'us'),
	(165,'52701759','Annie Goodman','https://scontent-a.xx.fbcdn.net/hphotos-prn2/c16.16.202.202/p235x165/971474_968688748348_1091114642_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-27 13:37:04',5,'us'),
	(166,'763295159','Sienna Farris','https://scontent-b.xx.fbcdn.net/hphotos-ash4/c28.26.332.332/s240x240/999420_10153184054105160_655266194_n.jpg','ladies, we are pushing 40. Let\'s make sure we get our mammograms this year!','2013-09-27 14:07:01',34,'us'),
	(167,'1311819004','Heather Bergstein','https://scontent-a.xx.fbcdn.net/hphotos-ash4/c16.16.202.202/p235x165/488387_4504454892083_1750235000_n.jpg','Support someone in our lives.','2013-09-27 14:24:39',6,'us'),
	(168,'1311819004','Heather Bergstein','https://scontent-a.xx.fbcdn.net/hphotos-ash4/c16.16.202.202/p235x165/488387_4504454892083_1750235000_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-27 15:24:10',2,'us'),
	(169,'1103097','Katy Atlas','https://scontent-b.xx.fbcdn.net/hphotos-prn1/c0.28.205.206/p206x206/559377_10100118908892432_458787424_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-27 16:39:26',2,'us');

/*!40000 ALTER TABLE `circles` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
