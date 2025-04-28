package com.example.record.exception;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import jakarta.servlet.http.HttpServletResponse;

@ControllerAdvice
public class APIExceptionHandler {

    /**
     *  Exception時のレスポンスをjson, ステータスを422に設定
     */

    @ExceptionHandler(Exception.class)
    public void handleExeption(Exception ex, HttpServletResponse response) throws IOException {

        if (ex.getMessage() != null && ex.getMessage().contains("No static resource")) {
            // リダイレクト処理
            response.sendRedirect("/error/not-found");
            return;
        }

        if (ex.getMessage() != null && ex.getMessage().contains("Request method")) {
            // リダイレクト処理
            response.sendRedirect("/error/not-found");
            return;
        }

        // 通常のエラーレスポンス
        response.setStatus(HttpStatus.UNPROCESSABLE_ENTITY.value());
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("{\"message\": \"" + ex.getMessage() + "\", \"status\": 422}");
    }
    
}
