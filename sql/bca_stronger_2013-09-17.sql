# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 40west.esteeonline.com (MySQL 5.5.19-log)
# Database: bca_stronger
# Generation Time: 2013-09-17 14:55:57 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


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
	(1,'1','100004398844628','Jay T D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(2,'1','717193386','Matt D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/c39.8.103.103/s100x100/382149_10150392776188387_111754726_a.jpg'),
	(3,'1','621136361','Ephraim K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c0.10.111.111/s100x100/228510_8457006361_572_s.jpg'),
	(4,'2','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(5,'3','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(6,'3','100003988000326','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c9.9.113.113/s100x100/602151_222830621193203_2008726580_s.jpg'),
	(7,'4','621136361','Ephraim K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c0.10.111.111/s100x100/228510_8457006361_572_s.jpg'),
	(8,'4','100004398844628','Jay T D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(9,'5','100001445991666','QAhotmail T.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c37.37.459.459/s200x200/1186238_570274929697368_853778460_n.jpg'),
	(10,'6','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(68,'45','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(69,'46','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(70,'46','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(71,'47','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(72,'47','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(73,'48','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(74,'49','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(75,'50','100000404706068','Dashus C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c9.9.113.113/s100x100/538792_473845989305554_1241218199_s.jpg'),
	(76,'50','100002766141618','Chris E.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(77,'50','100002791573808','Payton C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c9.9.113.113/s100x100/262444_102292656540453_609351_s.jpg'),
	(81,'51','100002791573808','Payton C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c9.9.113.113/s100x100/262444_102292656540453_609351_s.jpg'),
	(82,'51','100000404706068','Dashus C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c9.9.113.113/s100x100/538792_473845989305554_1241218199_s.jpg'),
	(83,'52','100000404706068','Dashus C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c9.9.113.113/s100x100/538792_473845989305554_1241218199_s.jpg'),
	(84,'52','100002766141618','Chris E.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(85,'52','100002791573808','Payton C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c9.9.113.113/s100x100/262444_102292656540453_609351_s.jpg'),
	(86,'53','100000404706068','Dashus C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c9.9.113.113/s100x100/538792_473845989305554_1241218199_s.jpg'),
	(87,'54','100002351527147','Stevie A.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c9.9.113.113/s100x100/229231_110157705739280_4642739_s.jpg'),
	(88,'55','100000404706068','Dashus C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c9.9.113.113/s100x100/538792_473845989305554_1241218199_s.jpg'),
	(89,'55','100002791573808','Payton C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c9.9.113.113/s100x100/262444_102292656540453_609351_s.jpg'),
	(90,'56','100002351527147','Stevie A.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c9.9.113.113/s100x100/229231_110157705739280_4642739_s.jpg'),
	(94,'59','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(95,'59','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(96,'60','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(97,'60','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(98,'61','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(99,'61','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(100,'62','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(101,'63','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(102,'64','1305641','JaKenna G.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c46.42.520.520/s200x200/1011158_10100393758756104_1916110370_n.jpg'),
	(108,'67','8642831','Jenny C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c13.17.113.113/s100x100/1186908_10102460384875867_747263270_s.jpg'),
	(109,'65','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c178.0.604.604/s200x200/252231_1002029915278_1941483569_n.jpg'),
	(110,'65','100003988000326','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/602151_222830621193203_2008726580_a.jpg'),
	(111,'66','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c178.0.604.604/s200x200/252231_1002029915278_1941483569_n.jpg'),
	(112,'66','39607548','Mili K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c29.0.492.492/s200x200/35983_634844729307_2603981_n.jpg'),
	(113,'66','100003988000326','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/602151_222830621193203_2008726580_a.jpg'),
	(114,'68','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(115,'68','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(116,'69','100002351527147','Stevie A.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c9.9.113.113/s100x100/229231_110157705739280_4642739_s.jpg'),
	(117,'69','100002766141618','Chris E.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(118,'70','39607548','Mili K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c7.0.116.116/s100x100/35983_634844729307_2603981_s.jpg'),
	(119,'70','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(120,'71','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(123,'57','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(124,'57','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(125,'57','100003988000326','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c9.9.113.113/s100x100/602151_222830621193203_2008726580_s.jpg'),
	(126,'58','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(127,'58','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(128,'58','100003988000326','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c9.9.113.113/s100x100/602151_222830621193203_2008726580_s.jpg'),
	(132,'73','100003988000326','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c9.9.113.113/s100x100/602151_222830621193203_2008726580_s.jpg'),
	(133,'73','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(136,'74','100002351527147','Stevie A.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c9.9.113.113/s100x100/229231_110157705739280_4642739_s.jpg'),
	(137,'74','100002766141618','Chris E.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(138,'75','100003864400490','MiliTest K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c32.9.117.117/s100x100/541355_102947009844112_1320561337_a.jpg'),
	(139,'75','1305641','JaKenna G.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c10.9.111.111/s100x100/1011158_10100393758756104_1916110370_s.jpg'),
	(140,'75','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(141,'76','1311819004','Heather B.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c9.9.113.113/s100x100/488387_4504454892083_1750235000_s.jpg'),
	(142,'76','763295159','Sienna F.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c10.9.111.111/s100x100/999420_10153184054105160_655266194_s.jpg'),
	(143,'72','100003988000326','Sean\'ouch O.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c9.9.113.113/s100x100/602151_222830621193203_2008726580_s.jpg'),
	(144,'72','100004250646791','Jason C.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c34.0.113.113/s100x100/252231_1002029915278_1941483569_a.jpg'),
	(145,'77','1331910001','Alyssa B.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c0.10.102.102/s100x100/1175000_10200796005685768_1826509187_s.jpg'),
	(147,'79','1331910001','Alyssa B.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c0.10.102.102/s100x100/1175000_10200796005685768_1826509187_s.jpg'),
	(149,'78','10717066','John L.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c18.26.156.156/s100x100/945399_10102011729160538_1730608956_a.jpg'),
	(152,'80','691049698','Summer K.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c12.12.156.156/s100x100/971888_10151607349849699_2105103331_a.jpg'),
	(153,'80','15927490','Jake H.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c9.9.113.113/s100x100/16285_10101652642218700_2097288274_s.jpg'),
	(154,'80','508826219','Georgina M.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/c13.12.155.155/s100x100/285395_10151394819161220_1148285866_a.jpg'),
	(158,'81','100001349556432','Erin D.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c9.9.113.113/s100x100/155614_486777468043901_573691477_s.jpg'),
	(159,'82','599050647','Kate B.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c13.12.155.155/s100x100/1011865_10152962685940648_998909351_a.jpg'),
	(160,'82','813770693','Amy S.','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c25.10.131.131/s100x100/392805_10152675395660694_836938171_a.jpg');

/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
