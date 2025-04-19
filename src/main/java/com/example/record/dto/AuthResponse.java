package com.example.record.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthResponse {

    private String username;

    private String email;

    private int permissionLevel;
    
}
