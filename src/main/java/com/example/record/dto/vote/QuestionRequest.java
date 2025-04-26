package com.example.record.dto.vote;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class QuestionRequest {
    
    private Integer voteQuestionId;

    @NotNull
    private int userId;

    @NotBlank
    @Size(max = 200)
    private String title;

    @NotNull
    private Date period;

}
