/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50515
Source Host           : localhost:3306
Source Database       : blend

Target Server Type    : MYSQL
Target Server Version : 50515
File Encoding         : 65001

Date: 2014-12-01 08:47:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `album`
-- ----------------------------
DROP TABLE IF EXISTS `album`;
CREATE TABLE `album` (
  `album_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `spotify_url` varchar(255) NOT NULL,
  `spotfiy_cover_url` varchar(255) DEFAULT NULL,
  `created` datetime NOT NULL,
  `crawled` datetime NOT NULL,
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
  `feed_id` int(11) NOT NULL,
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
-- Table structure for `artist`
-- ----------------------------
DROP TABLE IF EXISTS `artist`;
CREATE TABLE `artist` (
  `artist_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `bio_site` varchar(40) DEFAULT NULL,
  `bio_url` varchar(255) DEFAULT NULL,
  `spotify_url` varchar(255) NOT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`artist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of artist
-- ----------------------------

-- ----------------------------
-- Table structure for `feed`
-- ----------------------------
DROP TABLE IF EXISTS `feed`;
CREATE TABLE `feed` (
  `feed_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `homepage_url` varchar(255) NOT NULL,
  `method` varchar(40) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `public` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`feed_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of feed
-- ----------------------------
