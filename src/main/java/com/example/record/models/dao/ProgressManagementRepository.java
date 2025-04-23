package com.example.record.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.record.models.entities.ProgressManagement;

public interface ProgressManagementRepository extends JpaRepository<ProgressManagement, Integer> {




    /**
     * parentIdに指定されたmanagemetIdが有効(自身が子属性でなく、削除されていない)か検証
     * @param managementId
     * @return
     */
    boolean existsByManagementIdAndParentIdIsNullAndDeleteAtIsNull(int managementId);


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
