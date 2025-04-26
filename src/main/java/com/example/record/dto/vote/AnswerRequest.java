package com.example.record.dto.vote;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AnswerRequest {

    private Integer voteAnswerId;
    
    @NotNull
    private int voteQuestionId;

    @NotNull
    private int userId;

    @NotBlank
    @Size(max = 250)
    private String answer;

}
