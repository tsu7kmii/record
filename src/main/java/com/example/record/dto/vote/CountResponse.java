package com.example.record.dto.vote;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CountResponse {
    
    private int voteCountId;

    private int voteQuestionId;

    private int voteAnswerId;

    private int userId;

    private String username;

    private Date createAt;

}
