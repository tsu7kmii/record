package com.example.record.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.record.models.entities.PasswordResetToken;
import com.example.record.models.entities.UserAccount;

import java.util.Date;
import java.util.stream.Stream;

public interface PasswordTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    /**
     * トークンで検索
     * @param token トークン
     * @return パスワードリセットトークン
     */
    PasswordResetToken findByToken(String token);

    /**
     * ユーザーで検索
     * @param user ユーザー
     * @return パスワードリセットトークン
     */
    PasswordResetToken findByUser(UserAccount user);

    /**
     * 有効期限が指定日より前のトークンを全て取得
     * @param now 現在の日付
     * @return パスワードリセットトークンのストリーム
     */
    Stream<PasswordResetToken> findAllByExpiryDateLessThan(Date now);

    /**
     * 有効期限が指定日より前のトークンを削除
     * @param now 現在の日付
     */
    void deleteByExpiryDateLessThan(Date now);

    /**
     * 指定日より前の全ての期限切れトークンを削除
     * @param now 現在の日付
     */
    @Modifying
    @Query("delete from PasswordResetToken t where t.expiryDate <= ?1")
    void deleteAllExpiredSince(Date now);
}
