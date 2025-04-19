package com.example.record.controllders;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class CsrfController {
    
    /**
     * CSRF token を取得
     * 
     * @param request HTTPリクエスト
     * @return CSRF token
     */
    @GetMapping("/csrf")
    public String getMethodName(HttpServletRequest request) {
        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        return csrfToken.getToken();
    }
    
}
