package com.example.record.dto.vote;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class QuestionIdRequest {
    
    @NotNull
    private int voteQuestionId;
}
