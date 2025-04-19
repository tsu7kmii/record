package com.example.record.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.record.dto.ErrorResponse;

@ControllerAdvice
public class APIExceptionHandler {

    /**
     *  Exception時のレスポンスをjson, ステータスを422に設定
     */

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleExeption(Exception ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    
}
