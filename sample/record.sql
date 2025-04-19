-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: mysql
-- 生成日時: 2024 年 11 月 27 日 16:47
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

--
-- テーブルのデータのダンプ `management`
--

INSERT INTO `management` (`management_id`, `user_id`, `subject`, `link`, `status`, `create_at`, `update_at`, `delete_at`, `completion_schedule`) VALUES
(1, 5, 'モードで切り替わるオノを作成しました。次は、魔法の杖を追加します。', 'https://github.com/Hanakawalab-Minecraft/UniqueItemsMod', 5, '2024-10-14 16:33:29', NULL, '2024-10-21 16:37:59', '2024-10-21'),
(2, 5, '魔法の杖を追加しました。次は、魔法系のアーマーの追加します', 'https://github.com/Hanakawalab-Minecraft/UniqueItemsMod', 5, '2024-10-21 16:34:07', NULL, '2024-10-28 16:37:59', '2024-10-28'),
(3, 5, '魔法系のアーマー追加しました。次は、新しいエンチャントを追加します。', 'https://github.com/Hanakawalab-Minecraft/UniqueItemsMod', 5, '2024-11-04 16:34:26', NULL, '2024-11-11 16:37:59', '2024-11-11'),
(4, 5, '引き続き飛行できるエンチャントを作成します。', 'https://github.com/Hanakawalab-Minecraft/UniqueItemsMod', 5, '2024-10-28 16:34:46', NULL, '2024-12-04 16:37:59', '2024-12-04'),
(5, 4, 'part17-3進行中です。木の自然生成をコメントアウトしpart18に進みます', 'https://www.youtube.com/playlist?list=PLWwlnq188K5w95GuBYAEbgVFJ_BqSr8OW', 5, '2024-10-14 16:35:23', NULL, '2024-10-21 16:37:59', '2024-10-21'),
(6, 4, 'オリジナルアイテム”ランダムスキル付与の食べ物”の作成を行います', 'https://github.com/Hanakawalab-Minecraft/UniqueItemsMod', 5, '2024-10-28 16:35:49', NULL, '2024-11-04 16:37:59', '2024-11-04'),
(7, 4, 'オリジナルアイテムの追加で一部完了したのですがエンチャントからの追加も作成します', 'https://github.com/Hanakawalab-Minecraft/UniqueItemsMod', 5, '2024-11-11 16:36:10', NULL, '2024-11-11 16:37:59', '2024-11-25'),
(8, 6, 'オリジナルの武器の追加の途中まで進んでいるので引き続き進めていきます', 'https://github.com/Hanakawalab-Minecraft/UniqueItemsMod', 5, '2024-10-28 16:36:56', NULL, '2024-11-04 16:37:59', '2024-11-04'),
(9, 6, 'オリジナルの武器の追加を進行中で、引き続き進めていきます', 'https://github.com/Hanakawalab-Minecraft/UniqueItemsMod', 5, '2024-10-28 16:37:07', NULL, '2024-11-04 16:37:59', '2024-12-04'),
(10, 4, '１個目のオリジナルアイテムの動作確認後、アイテム紹介文の作成に入ります（ブランチは切っています）', '', 1, '2024-11-27 16:43:15', '2024-11-27 16:44:03', NULL, '2024-12-02'),
(11, 3, '今週中に動画パートを終わらせます。', '', 1, '2024-11-27 16:43:26', '2024-11-27 16:43:48', NULL, '2024-12-02'),
(12, 5, 'アイテムを経験値に変換するアイテム作成終わりました。\r\n次は、新しいチェストを追加します。特徴(容量増加、できれば整頓機能)を作成します。', '', 1, '2024-11-27 16:43:38', '2024-11-27 16:44:40', NULL, '2024-12-04'),
(13, 6, 'オリジナルの武器がもうすぐで終わるので終わらせてからチラシ裏の案の作成に入ります', '', 1, '2024-11-27 16:44:12', NULL, NULL, '2024-12-02'),
(14, 5, 'モードで切り替わるオノを作成しました。次は、魔法の杖を追加します。', 'https://github.com/Hanakawalab-Minecraft/UniqueItemsMod', 5, '2023-10-14 16:33:29', NULL, '2023-10-21 16:37:59', '2023-10-21'),
(15, 1, '動画編集のチュートリアルを完了しました。次は効果音の追加を行います。', 'https://www.youtube.com/watch?v=example1', 5, '2022-01-05 12:34:56', NULL, '2022-01-12 12:34:56', '2022-01-12'),
(16, 2, '新しい記事のドラフト作成中です。レビュー後に公開予定です。', 'https://zenn.dev/example_article', 5, '2022-02-15 09:23:45', '2022-02-15 09:23:45', '2022-02-22 09:23:45', '2022-02-22'),
(17, 3, 'プロジェクト管理ツールの改善提案をまとめました。', 'https://qiita.com/example_project', 5, '2022-03-10 15:45:23', NULL, '2022-03-14 15:45:23', '2022-03-17'),
(18, 4, 'コードリファクタリングに取り組んでいます。来週までに完了予定です。', 'https://www.youtube.com/watch?v=example2', 5, '2022-04-01 10:11:12', '2022-04-01 10:11:12', '2022-04-08 10:11:12', '2022-04-08'),
(19, 5, '次の開発ステージに向けた資料を準備中です。', 'https://zenn.dev/example_stage', 5, '2022-05-20 08:22:33', NULL, '2022-05-24 08:22:33', '2022-05-27'),
(20, 6, '新しいAPIの動作確認を行い、問題が解消しました。', 'https://qiita.com/example_api', 5, '2023-01-15 14:34:21', NULL, '2023-01-22 14:34:21', '2023-01-22'),
(21, 7, 'ブログ記事の内容を更新しました。レビューを依頼中です。', 'https://zenn.dev/example_blog', 5, '2023-02-10 09:45:13', '2023-02-10 09:45:13', '2023-02-14 09:45:13', '2023-02-17'),
(22, 1, 'ツールのUI改善案を提出しました。実装開始予定です。', 'https://www.youtube.com/watch?v=example3', 5, '2023-03-08 11:23:12', NULL, '2023-03-15 11:23:12', '2023-03-15'),
(23, 2, '次期リリースに向けたスケジュール調整を行いました。', 'https://zenn.dev/example_release', 5, '2024-01-10 14:12:45', '2024-01-10 14:12:45', '2024-01-17 14:12:45', '2024-01-17'),
(24, 3, '新機能のデザインモックを作成し、レビューを依頼中です。', 'https://qiita.com/example_design', 5, '2024-02-15 16:34:21', NULL, '2024-02-22 16:34:21', '2024-02-22'),
(25, 4, '開発環境の設定手順を文書化しました。', 'https://www.youtube.com/watch?v=example4', 5, '2024-03-10 11:45:12', '2024-03-10 11:45:12', '2024-03-14 11:45:12', '2024-03-17'),
(26, 1, 'ユーザー認証システムの実装を開始', 'https://zenn.dev/example_auth', 5, '2024-04-01 10:00:00', '2024-04-01 10:00:00', '2024-04-05 10:00:00', '2024-04-08'),
(27, 2, 'パフォーマンス最適化の調査完了', 'https://qiita.com/example_perf', 5, '2024-04-02 11:30:00', NULL, '2024-04-08 15:00:00', '2024-04-09'),
(28, 3, '新規機能のテスト実施中', 'https://youtube.com/watch?v=test123', 5, '2024-04-03 14:15:00', NULL, '2024-04-07 14:15:00', '2024-04-10'),
(29, 4, 'データベース設計の見直し', 'https://zenn.dev/example_db', 5, '2024-04-04 09:45:00', '2024-04-04 09:45:00', '2024-04-10 17:00:00', '2024-04-11'),
(30, 5, 'APIドキュメントの更新作業', 'https://qiita.com/example_api_doc', 5, '2024-04-05 13:20:00', NULL, '2024-04-09 13:20:00', '2024-04-12'),
(31, 6, 'フロントエンド改修完了', 'https://youtube.com/watch?v=front123', 5, '2024-04-06 15:45:00', NULL, '2024-04-12 16:00:00', '2024-04-13'),
(32, 7, 'セキュリティ監査の実施', 'https://zenn.dev/example_security', 5, '2024-04-07 11:10:00', '2024-04-07 11:10:00', '2024-04-11 11:10:00', '2024-04-14'),
(33, 1, 'ログ解析システムの構築', 'https://qiita.com/example_logging', 5, '2024-04-08 10:30:00', NULL, '2024-04-14 12:00:00', '2024-04-15'),
(34, 2, 'チュートリアル動画の作成', 'https://youtube.com/watch?v=tutorial123', 5, '2024-04-09 14:20:00', NULL, '2024-04-13 14:20:00', '2024-04-16'),
(35, 3, 'バッチ処理の最適化', 'https://zenn.dev/example_batch', 5, '2024-04-10 09:15:00', '2024-04-10 09:15:00', '2024-04-16 18:00:00', '2024-04-17'),
(36, 4, 'エラーハンドリングの改善', 'https://qiita.com/example_error', 5, '2024-04-11 16:40:00', NULL, '2024-04-15 16:40:00', '2024-04-18'),
(37, 5, 'ユーザーインターフェース改善', 'https://youtube.com/watch?v=ui123', 5, '2024-04-12 11:25:00', NULL, '2024-04-18 14:00:00', '2024-04-19'),
(38, 6, 'キャッシュシステムの導入', 'https://zenn.dev/example_cache', 5, '2024-04-13 13:50:00', '2024-04-13 13:50:00', '2024-04-17 13:50:00', '2024-04-20'),
(39, 7, 'テスト自動化の実装', 'https://qiita.com/example_test', 5, '2024-04-14 10:05:00', NULL, '2024-04-20 11:00:00', '2024-04-21'),
(40, 1, 'デプロイメントプロセスの改善', 'https://youtube.com/watch?v=deploy123', 5, '2024-04-15 15:30:00', NULL, '2024-04-19 15:30:00', '2024-04-22');


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
  MODIFY `management_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
