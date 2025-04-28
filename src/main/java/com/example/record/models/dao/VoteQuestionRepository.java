package com.example.record.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.record.models.entities.VoteQuestion;
import java.util.Date;


public interface VoteQuestionRepository extends JpaRepository<VoteQuestion, Integer>{

    /**
     * 指定された日付よりも前の期間を持つVoteQuestionのリストを取得します。
     * 
     * @param todayDate 現在の日付
     * @return 指定された日付よりも前の期間を持つVoteQuestionのリスト
     */
    List<VoteQuestion> findByPeriodLessThan(Date todayDate);
    
    /**
     * 指定されたIDを持つVoteQuestionを取得します。
     * 
     * @param voteQuestionId VoteQuestionのID
     * @return 指定されたIDを持つVoteQuestion
     */
    VoteQuestion findByVoteQuestionId(int voteQuestionId);

    /**
     * 指定されたIDを持ち、削除されていないVoteQuestionが存在するかを確認します。
     * 
     * @param voteQuestionId VoteQuestionのID
     * @return 指定されたIDを持ち、削除されていないVoteQuestionが存在する場合はtrue、そうでない場合はfalse
     */
    boolean existsByVoteQuestionIdAndDeleteAtIsNull(int voteQuestionId);
}
