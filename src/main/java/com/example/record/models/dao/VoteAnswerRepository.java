package com.example.record.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.record.models.entities.VoteAnswer;
import java.util.List;


public interface VoteAnswerRepository extends JpaRepository<VoteAnswer, Integer>{


    List<VoteAnswer> findByVoteQuestionIdAndDeleteAtIsNull(int id);

    VoteAnswer findByVoteAnswerId(int id);

    List<VoteAnswer> findByVoteQuestionId(int id);
}
