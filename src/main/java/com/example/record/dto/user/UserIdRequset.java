package com.example.record.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserIdRequset {

    @NotBlank
    private int userId;
    
}
