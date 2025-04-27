package com.example.record.dto.vote;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AnswerResponse {
    
    private int voteAnswerId;

    private int voteQuestionId;

    private int userId;

    private String username;

    private String answer;

    private Date createAt;

    private Date updateAt;

    private Date deleteAt;
}
