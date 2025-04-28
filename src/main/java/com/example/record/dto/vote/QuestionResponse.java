package com.example.record.dto.vote;

import java.util.Date;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class QuestionResponse {

    private int voteQuestionId;

    private Integer chatRoomId;

    private int userId;

    private String username;

    private String title;

    private Date period;

    private Date createAt;

    private Date updateAt;

    private Date deleteAt;
}
