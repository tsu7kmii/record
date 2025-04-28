package com.example.record.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.record.models.entities.UserAccount;
import com.example.record.models.entities.VoteCount;

import java.util.List;

public interface VoteCountRepository extends JpaRepository<VoteCount, Integer>{

    /**
     * 指定された質問IDとユーザーを持ち、削除されていないVoteCountが存在するかを確認します。
     * 
     * @param qId 質問ID
     * @param user ユーザーアカウント
     * @return 指定された条件を満たすVoteCountが存在する場合はtrue、そうでない場合はfalse
     */
    boolean existsByVoteQuestionIdAndUserAndDeleteAtIsNull(int qId, UserAccount user);

    /**
     * 指定されたIDを持つVoteCountを取得します。
     * 
     * @param id VoteCountのID
     * @return 指定されたIDを持つVoteCount
     */
    VoteCount findByVoteCountId(int id);

    /**
     * 指定されたIDを持ち、削除されていないVoteCountが存在するかを確認します。
     * 
     * @param id VoteCountのID
     * @return 指定された条件を満たすVoteCountが存在する場合はtrue、そうでない場合はfalse
     */
    boolean existsByVoteCountIdAndDeleteAtIsNull(int id);
     
    /**
     * 指定された質問IDを持ち、削除されていないVoteCountのリストを取得します。
     * 
     * @param id 質問ID
     * @return 指定された条件を満たすVoteCountのリスト
     */
    List<VoteCount> findByVoteQuestionIdAndDeleteAtIsNull(int id);
}
