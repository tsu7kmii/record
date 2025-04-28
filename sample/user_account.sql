-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: mysql
-- 生成日時: 2025 年 4 月 29 日 00:22
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
(1, '管理者', '$2a$10$y6oOhq0D2PjcHjHHEwltaeN8Lg2OegeHoIXuMwaSAQ0nSlSOkulWW', 'sample@a.a', 1, '2024-11-27 16:29:01', '2025-04-28 21:48:23', NULL),
(2, '山田', '$2a$10$ZW1a3YzbrSxgUxdYFjkk7uT15F5/bIoJK8tWPusGMXArrFOAh70gK', 'mizuyoshi1@a.a', 2, '2024-11-27 16:29:29', '2025-04-23 23:33:44', NULL),
(3, '田中', '$2a$10$ubDzYOJD90r9WagMl5vjjuEPTgiN9E/38raSftjry7DEyCL967Ufy', 'hirao1@a.a3', 2, '2024-11-27 16:29:58', '2025-04-23 23:59:50', NULL),
(4, '山口', '$2a$10$J8izED2Pi8UbcpEYs.T.QuR1takhzGHC5KVMyX5AlEp3EpYEiAck.', 'sakai1@a.a', 2, '2024-11-27 16:30:11', NULL, NULL),
(5, '堺井', '$2a$10$Y2fjdSeoTsDXT.pNIAjVRudGp/QRGWp7BgbvCn7FPMtLZ0qbFO7RC', 'ooyama1@a.a', 2, '2024-11-27 16:30:32', NULL, NULL),
(6, '川村', '$2a$10$4.C3HdiiXF65arUQchW9o.jRwH5eV2398i6L5yd4HJRuBKNfJwNzq', 'kawamura1@a.a', 2, '2024-11-27 16:30:55', '2025-04-23 23:33:41', NULL),
(7, '浅野', '$2a$10$IB434C01XPjMfiSkBTjznuTxHFM0qHXPHMLyObnBxlsFsL4mtH1LO', 'asano1@a.a', 1, '2024-11-27 16:31:53', NULL, NULL),
(8, 'madako', '$2a$10$S3em..8aHLkpMGAqqaeSue/5ieDfCyZVmaBMka6ukZ/oUk4U3qA4C', 'madako@a.a', 2, '2025-04-27 22:45:14', NULL, NULL),
(9, 'izumi', '$2a$10$d8kHCdwoGOpqCnY6tO4oQ.iz7XCYfxLt6cbMoMXT2WN8x7kzjzCFy', 'izumi@a.a', 2, '2025-04-28 00:41:41', NULL, NULL),
(10, 'sakaisan', '$2a$10$.g/QlOICmv0OE8dLiozBjOEJ0FFlGps2KfjuaQavpWHNfLbMk6AjG', 'sakaisan@a.a', 2, '2025-04-28 22:00:24', NULL, NULL);

--
-- ダンプしたテーブルのインデックス
--

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
-- テーブルの AUTO_INCREMENT `user_account`
--
ALTER TABLE `user_account`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
