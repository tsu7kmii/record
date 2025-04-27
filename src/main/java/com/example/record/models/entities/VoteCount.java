package com.example.record.models.entities;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "vote_count")
@Data
public class VoteCount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_count_id")
    private int voteCountId;

    @Column(name = "vote_question_id")
    private int voteQuestionId;

    @Column(name = "vote_answer_id")
    private int voteAnswerId;

    @OneToOne(targetEntity = UserAccount.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private UserAccount user;

    @Column(name = "create_at",insertable = false, updatable = false)
    private Date createAt;

    @Column(name = "update_at")
    private Date updateAt;

    @Column(name = "delete_at")
    private Date deleteAt;

}
