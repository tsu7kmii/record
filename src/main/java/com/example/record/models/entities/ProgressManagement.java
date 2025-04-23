package com.example.record.models.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "progress_management")
@Data
public class ProgressManagement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "management_id")
    private int managementId;

    @Column(name = "parent_id")
    private Integer parentId;

    @Column(name = "chat_room_id")
    private Integer chatRoomId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "title")
    private String title;

    @Column(name = "contents")
    private String contents;

    @Column(name = "link")
    private String link;

    /**
     * 0 : 未着手
     * 1 : 取り組み中
     * 2 : 待機
     * 3 : レビュー待ち
     * 4 : 処理待ち
     * 5 : 完了
     */
    @Column(name = "status")
    private int status;

    @Column(name = "create_at",insertable = false)
    private Date createAt;

    @Column(name = "update_at")
    private Date updateAt;

    @Column(name = "delete_at")
    private Date deleteAt;

    @Column(name = "completion_schedule_at")
    private Date completionScheduleAt;
    
}
