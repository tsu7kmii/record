-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: mysql
-- 生成日時: 2025 年 4 月 20 日 15:05
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
-- データベース: `record`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `chat_contents`
--

CREATE TABLE `chat_contents` (
  `chat_contents_id` int NOT NULL,
  `chat_room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `contents` text COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `chat_room`
--

CREATE TABLE `chat_room` (
  `chat_room_id` int NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL,
  `delete_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `progress_management`
--

CREATE TABLE `progress_management` (
  `management_id` int NOT NULL,
  `parent_id` int DEFAULT NULL,
  `chat_room_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `title` varchar(400) COLLATE utf8mb4_general_ci NOT NULL,
  `contents` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '科目',
  `link` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `status` int NOT NULL COMMENT '取り組み中など',
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL COMMENT '兼完了日',
  `completion_schedule_at` datetime NOT NULL COMMENT '完了予定日'
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
-- テーブルのデータのダンプ `user_account`
--

INSERT INTO `user_account` (`user_id`, `user_name`, `password`, `email`, `permission_level`, `create_at`, `update_at`, `delete_at`) VALUES
(1, 'admin', '$2a$10$y6oOhq0D2PjcHjHHEwltaeN8Lg2OegeHoIXuMwaSAQ0nSlSOkulWW', 'sample@a.a', 1, '2024-11-27 16:29:01', NULL, NULL),
(2, '山田', '$2a$10$ZW1a3YzbrSxgUxdYFjkk7uT15F5/bIoJK8tWPusGMXArrFOAh70gK', 'mizuyoshi1@a.a', 2, '2024-11-27 16:29:29', NULL, NULL),
(3, '田中', '$2a$10$ubDzYOJD90r9WagMl5vjjuEPTgiN9E/38raSftjry7DEyCL967Ufy', 'hirao1@a.a', 2, '2024-11-27 16:29:58', NULL, NULL),
(4, '山口', '$2a$10$J8izED2Pi8UbcpEYs.T.QuR1takhzGHC5KVMyX5AlEp3EpYEiAck.', 'sakai1@a.a', 2, '2024-11-27 16:30:11', NULL, NULL),
(5, '堺井', '$2a$10$Y2fjdSeoTsDXT.pNIAjVRudGp/QRGWp7BgbvCn7FPMtLZ0qbFO7RC', 'ooyama1@a.a', 2, '2024-11-27 16:30:32', NULL, NULL),
(6, '川村', '$2a$10$4.C3HdiiXF65arUQchW9o.jRwH5eV2398i6L5yd4HJRuBKNfJwNzq', 'kawamura1@a.a', 2, '2024-11-27 16:30:55', NULL, NULL),
(7, '浅野', '$2a$10$IB434C01XPjMfiSkBTjznuTxHFM0qHXPHMLyObnBxlsFsL4mtH1LO', 'asano1@a.a', 1, '2024-11-27 16:31:53', NULL, NULL);

-- --------------------------------------------------------

--
-- テーブルの構造 `vote_answer`
--

CREATE TABLE `vote_answer` (
  `vote_answer_id` int NOT NULL,
  `vote_question_id` int NOT NULL,
  `answer` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `vote_question`
--

CREATE TABLE `vote_question` (
  `vote_question_id` int NOT NULL,
  `chat_room_id` int DEFAULT NULL,
  `title` varchar(400) COLLATE utf8mb4_general_ci NOT NULL,
  `period` datetime NOT NULL COMMENT 'いつまで',
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `chat_contents`
--
ALTER TABLE `chat_contents`
  ADD PRIMARY KEY (`chat_contents_id`);

--
-- テーブルのインデックス `chat_room`
--
ALTER TABLE `chat_room`
  ADD PRIMARY KEY (`chat_room_id`);

--
-- テーブルのインデックス `progress_management`
--
ALTER TABLE `progress_management`
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
-- テーブルのインデックス `vote_answer`
--
ALTER TABLE `vote_answer`
  ADD PRIMARY KEY (`vote_answer_id`);

--
-- テーブルのインデックス `vote_question`
--
ALTER TABLE `vote_question`
  ADD PRIMARY KEY (`vote_question_id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `chat_contents`
--
ALTER TABLE `chat_contents`
  MODIFY `chat_contents_id` int NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `chat_room`
--
ALTER TABLE `chat_room`
  MODIFY `chat_room_id` int NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `progress_management`
--
ALTER TABLE `progress_management`
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
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- テーブルの AUTO_INCREMENT `vote_answer`
--
ALTER TABLE `vote_answer`
  MODIFY `vote_answer_id` int NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `vote_question`
--
ALTER TABLE `vote_question`
  MODIFY `vote_question_id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
