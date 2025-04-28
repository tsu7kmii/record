package com.example.record.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.record.models.entities.VoteAnswer;
import java.util.List;

public interface VoteAnswerRepository extends JpaRepository<VoteAnswer, Integer>{

    /**
     * 指定された質問IDを持ち、削除されていないVoteAnswerのリストを取得します。
     * 
     * @param id 質問ID
     * @return 指定された条件を満たすVoteAnswerのリスト
     */
    List<VoteAnswer> findByVoteQuestionIdAndDeleteAtIsNull(int id);

    /**
     * 指定されたIDを持つVoteAnswerを取得します。
     * 
     * @param id VoteAnswerのID
     * @return 指定されたIDを持つVoteAnswer
     */
    VoteAnswer findByVoteAnswerId(int id);

    /**
     * 指定された質問IDを持つVoteAnswerのリストを取得します。
     * 
     * @param id 質問ID
     * @return 指定された質問IDを持つVoteAnswerのリスト
     */
    List<VoteAnswer> findByVoteQuestionId(int id);
}
