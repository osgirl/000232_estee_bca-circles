# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 40west.esteeonline.com (MySQL 5.5.19-log)
# Database: bca_stronger
# Generation Time: 2013-09-15 03:58:07 +0000
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
	(1,'100000668092783','Click Threetimes','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c44.232.552.552/s200x200/521936_557013464330918_372918279_n.jpg','Wear mostly red with the occasional pink.','2013-09-12 18:24:43',20,'united-states'),
	(2,'39607548','Mili Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c29.0.492.492/s200x200/35983_634844729307_2603981_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-09-12 18:28:12',3,'united-states'),
	(3,'39607548','Mili Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c29.0.492.492/s200x200/35983_634844729307_2603981_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-12 18:31:07',5,'united-states'),
	(4,'100000668092783','Click Threetimes','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c44.232.552.552/s200x200/521936_557013464330918_372918279_n.jpg','wear red instead of pink but at least have a pink ribbon.','2013-09-12 18:31:45',21,'united-states'),
	(5,'534664939','Jason Tordsen','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/c40.39.495.495/s480x480/190039_10151682394019940_679632902_n.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-09-12 18:31:58',3,'united-states'),
	(6,'100003864400490','MiliTest Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c92.27.337.337/s200x200/541355_102947009844112_1320561337_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-13 15:30:04',2,'united-states'),
	(45,'100003988000326','Sean\'ouch O\'siwon Oh','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/602151_222830621193203_2008726580_a.jpg','Donate. Fund breast cancer research and help eradicate this disease.','2013-09-14 08:46:35',3,'united-states'),
	(46,'100003988000326','Sean\'ouch O\'siwon Oh','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/602151_222830621193203_2008726580_a.jpg','Be proactive. Schedule a mammogram.','2013-09-14 08:53:32',1,'united-states'),
	(47,'100003988000326','Sean\'ouch O\'siwon Oh','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/602151_222830621193203_2008726580_a.jpg','Support someone in our lives.','2013-09-14 09:00:50',6,'united-states'),
	(48,'100003988000326','Sean\'ouch O\'siwon Oh','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/602151_222830621193203_2008726580_a.jpg','Support someone in our lives.','2013-09-14 09:26:23',6,'united-states'),
	(49,'8642831','Jenny Corbett','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c99.132.828.828/s200x200/1186908_10102460384875867_747263270_n.jpg','Walk together, cook healthy together, and support each other.','2013-09-14 10:36:26',5,'united-states'),
	(50,'100002351527147','Stevie AtEstee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/229231_110157705739280_4642739_n.jpg','start an organization for women','2013-09-14 10:46:45',23,'united-states'),
	(51,'100002351527147','Stevie AtEstee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/229231_110157705739280_4642739_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-14 10:51:24',2,'united-states'),
	(52,'100002351527147','Stevie AtEstee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/229231_110157705739280_4642739_n.jpg','Run in a marathon','2013-09-14 11:27:22',24,'united-states'),
	(53,'100002351527147','Stevie AtEstee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/229231_110157705739280_4642739_n.jpg','Drink less. Limit our alcohol intake and toast to a healthier life.','2013-09-14 11:33:50',4,'united-states'),
	(54,'100000404706068','Dashus Ciccone','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c42.42.528.528/s200x200/538792_473845989305554_1241218199_n.jpg','start an organization for women','2013-09-14 12:04:40',23,'united-states'),
	(55,'100002351527147','Stevie AtEstee','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/229231_110157705739280_4642739_n.jpg','Support someone in our lives.','2013-09-14 12:12:51',6,'united-states'),
	(56,'100000404706068','Dashus Ciccone','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c42.42.528.528/s200x200/538792_473845989305554_1241218199_n.jpg','Be proactive. Schedule a mammogram.','2013-09-14 12:33:45',1,'united-states'),
	(57,'100003864400490','MiliTest Kuo','https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c92.27.337.337/s200x200/541355_102947009844112_1320561337_n.jpg','Live healthily. Eat antioxidant-rich food and maintain a healthy weight.','2013-09-14 22:29:32',2,'united-states');

/*!40000 ALTER TABLE `circles` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
