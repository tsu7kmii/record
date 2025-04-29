package com.example.record.dto.progress;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProgressResponse {
    
    private int managementId;

    private Integer parentId;

    private Integer chatRoomId;

    private int userId;

    private String username;

    private String title;

    private String contents;

    private String link;

    /**
     * 0 : 未着手
     * 1 : 取り組み中
     * 2 : 待機
     * 3 : レビュー待ち
     * 4 : 処理待ち
     * 5 : 完了
     */
    private int status;

    private Date createAt;

    private Date updateAt;

    private Date deleteAt;

    private Date completionScheduleAt;
    
}
