package com.example.record.models.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.record.models.entities.UserAccount;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {


    /**
     * 検索されたアカウントが存在するかチェック
     * @param userId
     * @return
     */
    boolean existsByUserIdAndDeleteAtIsNull(int userId);


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

}
