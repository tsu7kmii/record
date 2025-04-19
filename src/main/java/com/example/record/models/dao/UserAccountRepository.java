package com.example.record.models.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.record.models.entities.UserAccount;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {

    /**
     * ユーザーIDでユーザーアカウントを検索
     * @param userId ユーザーID
     * @return UserAccount ユーザーアカウント
     */
    UserAccount findByUserId(Integer userId);

    /**
     * メールアドレスでユーザーアカウントを検索
     * @param email メールアドレス
     * @return ユーザーアカウントのオプショナル
     */
    Optional<UserAccount> findByEmailAndDeleteAtIsNull(String email);

    /**
     * メールアドレスでユーザーアカウントを検索
     * @param email メールアドレス
     * @return UserAccount ユーザーアカウント
     */
    UserAccount findUserAccountByEmail(String email);

    /**
     * 削除されていないユーザーアカウントを検索
     * @return 削除されていないユーザーアカウントのリスト
     */
    List<UserAccount> findByDeleteAtIsNull();

    /**
     * ユーザーIDでdelete_atを更新してアカウントを無効化
     * @param userId ユーザーID
     * @return 更新された行数
     */
    @Modifying
    @Transactional
    @Query("UPDATE UserAccount u SET u.updateAt = CURRENT_TIMESTAMP, u.deleteAt = CURRENT_TIMESTAMP WHERE u.userId = :userId")
    int updateDeleteAtByUserId(int userId);

    /**
     * ユーザーIDで権限レベルを更新
     * @param userId ユーザーID
     * @param permissionLevel 権限レベル
     * @return 更新された行数
     */
    @Modifying
    @Transactional
    @Query("UPDATE UserAccount u SET u.permissionLevel = :permissionLevel, u.updateAt = CURRENT_TIMESTAMP WHERE u.userId = :userId")
    int updatePermissionLevelByUserId(int userId, int permissionLevel);

    /**
     * メールアドレスでパスワードを更新
     * @param email メールアドレス
     * @param password 新しいパスワード
     * @return 更新された行数
     */
    @Modifying
    @Transactional
    @Query("UPDATE UserAccount u SET u.password = :password, u.updateAt = CURRENT_TIMESTAMP WHERE u.email = :email")
    int updatePasswordByEmail(String email, String password);

    /**
     * メールアドレスでユーザー名を更新
     * @param email メールアドレス
     * @param username 新しいユーザー名
     * @return 更新された行数
     */
    @Modifying
    @Transactional
    @Query("UPDATE UserAccount u SET u.username = :username, u.updateAt = CURRENT_TIMESTAMP WHERE u.email = :email")
    int updateUsernameByEmail(String email, String username);

    /**
     * メールアドレスでメールアドレスを更新
     * @param email 現在のメールアドレス
     * @param newEmail 新しいメールアドレス
     * @return 更新された行数
     */
    @Modifying
    @Transactional
    @Query("UPDATE UserAccount u SET u.email = :newEmail, u.updateAt = CURRENT_TIMESTAMP WHERE u.email = :email")
    int updateEmailByEmail(String email, String newEmail);
}
