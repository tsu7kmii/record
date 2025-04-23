package com.example.record.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.record.models.entities.ProgressManagement;

public interface ProgressManagementRepository extends JpaRepository<ProgressManagement, Integer> {


    /**
     * 未完了の親属性レコード取得
     * @return
     */
    List<ProgressManagement> findByParentIdIsNullAndDeleteAtIsNull();


    /**
     * 完了済みの親属性レコード取得
     * @return
     */
    List<ProgressManagement> findByParentIdIsNullAndDeleteAtIsNotNull();


    /**
     * 完了済みの子属性レコード取得
     * @return
     */
    List<ProgressManagement> findByParentIdIsNotNull();
    
}
