package com.example.record.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.record.models.entities.VoteAnswer;

public interface VoteAnswerRepository extends JpaRepository<VoteAnswer, Integer>{

    
}
