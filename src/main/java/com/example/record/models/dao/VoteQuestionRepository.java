package com.example.record.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.record.models.entities.VoteQuestion;
import java.util.Date;


public interface VoteQuestionRepository extends JpaRepository<VoteQuestion, Integer>{

    List<VoteQuestion> findByPeriodLessThan(Date todayDate);
    
    VoteQuestion findByVoteQuestionId(int voteQuestionId);

    boolean existsByVoteQuestionIdAndDeleteAtIsNull(int voteQuestionId);
}
