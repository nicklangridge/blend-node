/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50510
Source Host           : localhost:3306
Source Database       : tb

Target Server Type    : MYSQL
Target Server Version : 50510
File Encoding         : 65001

Date: 2014-11-30 13:28:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `album`
-- ----------------------------
DROP TABLE IF EXISTS `album`;
CREATE TABLE `album` (
  `album_id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `spotify_url` varchar(255) NOT NULL,
  `spotfiy_cover_url` varchar(255) DEFAULT NULL,
  `artist_name` varchar(255) NOT NULL,
  `artist_bio` varchar(255) DEFAULT NULL,
  `artist_bio_site` varchar(40) DEFAULT NULL,
  `artist_bio_url` varchar(255) DEFAULT NULL,
  `artist_spotify_url` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `checked` datetime NOT NULL,
  PRIMARY KEY (`album_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of album
-- ----------------------------

-- ----------------------------
-- Table structure for `album_region`
-- ----------------------------
DROP TABLE IF EXISTS `album_region`;
CREATE TABLE `album_region` (
  `album_id` int(11) NOT NULL,
  `region` varchar(9) NOT NULL,
  `created` datetime NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`album_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of album_region
-- ----------------------------

-- ----------------------------
-- Table structure for `album_review`
-- ----------------------------
DROP TABLE IF EXISTS `album_review`;
CREATE TABLE `album_review` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `album_id` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `active` datetime NOT NULL,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of album_review
-- ----------------------------

-- ----------------------------
-- Table structure for `album_tag`
-- ----------------------------
DROP TABLE IF EXISTS `album_tag`;
CREATE TABLE `album_tag` (
  `album_id` int(11) NOT NULL,
  `tag` varchar(40) NOT NULL,
  PRIMARY KEY (`album_id`,`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of album_tag
-- ----------------------------

-- ----------------------------
-- Table structure for `source`
-- ----------------------------
DROP TABLE IF EXISTS `source`;
CREATE TABLE `source` (
  `source_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `homepage_url` varchar(255) DEFAULT NULL,
  `module` varchar(40) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `public` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`source_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of source
-- ----------------------------
INSERT INTO `source` VALUES ('1', 'AfroMonk', null, 'AfroMonk', '1', '1');
