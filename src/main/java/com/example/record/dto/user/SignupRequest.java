package com.example.record.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignupRequest {
    
    @NotBlank
    @Size(min = 2, max = 10, message = "2文字以上,10文字以下")
    private String username;

    @NotBlank
    @Size(min = 5)
    @Pattern(regexp = ".*@.*", message = "メールアドレスには@が必要です")
    private String email;

    @NotBlank
    @Size(min = 6, max = 20, message = "6文字以上,20文字以下")
    @Pattern(regexp = "^(?!.*(password|PASSWORD|Password)).*(?=.*[a-zA-Z])(?=.*\\d)(?!.*(.)\\1{2,}).{6,20}$", message = "パスワードに全角文字は使用できません。また、アルファベット/数字を1文字以上必要であり、同じ文字の繰り返しは使用できません")
    private String password;


}
