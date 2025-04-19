-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: mysql
-- 生成日時: 2024 年 11 月 23 日 14:58
-- サーバのバージョン： 8.4.2
-- PHP のバージョン: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `team_management`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `management`
--

CREATE TABLE `management` (
  `management_id` int NOT NULL,
  `user_id` int NOT NULL,
  `subject` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '科目',
  `link` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `status` int NOT NULL COMMENT '取り組み中など',
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL COMMENT '兼完了日',
  `completion_schedule` date NOT NULL COMMENT '完了予定日'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `password_reset_token`
--

CREATE TABLE `password_reset_token` (
  `id` int NOT NULL,
  `token` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `expiry_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `password_reset_token_seq`
--

CREATE TABLE `password_reset_token_seq` (
  `id` int NOT NULL,
  `next_val` bigint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `password_reset_token_seq`
--

INSERT INTO `password_reset_token_seq` (`id`, `next_val`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- テーブルの構造 `user_account`
--

CREATE TABLE `user_account` (
  `user_id` int NOT NULL,
  `user_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `permission_level` mediumint NOT NULL COMMENT '1:admin , 2 :nomel user ,3 other',
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `management`
--
ALTER TABLE `management`
  ADD PRIMARY KEY (`management_id`);

--
-- テーブルのインデックス `password_reset_token`
--
ALTER TABLE `password_reset_token`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `password_reset_token_seq`
--
ALTER TABLE `password_reset_token_seq`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `unique_email` (`email`) USING BTREE;

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `management`
--
ALTER TABLE `management`
  MODIFY `management_id` int NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `password_reset_token_seq`
--
ALTER TABLE `password_reset_token_seq`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- テーブルの AUTO_INCREMENT `user_account`
--
ALTER TABLE `user_account`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
