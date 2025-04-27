package com.example.record.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.record.models.entities.UserAccount;
import com.example.record.models.entities.VoteCount;

import java.util.List;


public interface VoteCountRepository extends JpaRepository<VoteCount, Integer>{

    boolean existsByVoteQuestionIdAndUserAndDeleteAtIsNull(int qId, UserAccount user);

    VoteCount findByVoteCountId(int id);

    boolean existsByVoteCountIdAndDeleteAtIsNull(int id);
     
    List<VoteCount> findByVoteQuestionIdAndDeleteAtIsNull(int id);
}
