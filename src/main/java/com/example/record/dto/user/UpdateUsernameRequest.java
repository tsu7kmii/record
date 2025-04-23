package com.example.record.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateUsernameRequest {
    
    @NotBlank
    @Size(min = 3, max = 10, message = "3文字以上,10文字以下")
    private String newUsername;
}