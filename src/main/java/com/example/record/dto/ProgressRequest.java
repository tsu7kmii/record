package com.example.record.dto;

import java.util.Date;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProgressRequest {
    

    private Integer managementId;
    
    private Integer parentId;

    @NotNull
    private int userId;

    @NotBlank
    @Size(max = 200)
    private String title;

    @NotBlank
    private String contents;

    private String link;

    @NotNull
    @Min(0)
    @Max(5)
    private int status;

    @NotNull
    private Date completionScheduleAt;
}
