-- phpMyAdmin SQL Dump
-- version 3.3.9.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 07, 2013 at 03:09 PM
-- Server version: 5.5.9
-- PHP Version: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bca`
--

-- --------------------------------------------------------

--
-- Table structure for table `circles`
--

CREATE TABLE `circles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_fb_id` int(11) NOT NULL,
  `users_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `users_photo_url` text NOT NULL,
  `goal` text CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  `language` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `circles`
--

INSERT INTO `circles` VALUES(1, 2147483647, 'Sean Oh', 'http://profile.ak.fbcdn.net/hprofile-ak-ash4/275760_100003988000326_1919791226_n.jpg', 'Love healthily. Eat antioxidant-rich food and maintain a healthy weight.', '2013-07-31 11:50:53', 0);
INSERT INTO `circles` VALUES(2, 39607548, 'Mili Kuo', 'http://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2013-07-31 11:54:51', 0);
INSERT INTO `circles` VALUES(3, 534664939, 'Jason Tordsen', 'http://profile-b.xx.fbcdn.net/hprofile-prn1/623695_534664939_1207367401_n.jpg', 'Aliquam at velit pharetra, pretium nisl sed, semper mauris.', '2013-07-31 11:55:48', 0);

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `filename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` VALUES(5, '2013-08-07 14:57:28', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a tortor nisl.', 'photo_1375901848.jpg');
INSERT INTO `photos` VALUES(6, '2013-08-07 14:57:57', 'In varius nisl in urna sagittis, eget gravida nibh dapibus.', 'photo_1375901877.jpg');
INSERT INTO `photos` VALUES(7, '2013-08-07 14:58:14', '', 'photo_1375901894.jpg');
