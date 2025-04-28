package com.example.record.dto.vote;

import jakarta.annotation.Nonnull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CountRequest {

    Integer voteCountId;

    @Nonnull
    int voteQuestionId;
    
    @Nonnull
    int voteAnswerId;

    @Nonnull
    int userId;
}
