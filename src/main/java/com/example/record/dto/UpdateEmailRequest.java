package com.example.record.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Setter
@Getter
public class UpdateEmailRequest {
    
    @NotBlank
    @Size(min = 5)
    @Pattern(regexp = ".*@.*", message = "メールアドレスには@が必要です")
    private String newEmail;
}
