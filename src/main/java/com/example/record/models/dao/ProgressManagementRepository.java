package com.example.record.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.record.models.entities.ProgressManagement;

public interface ProgressManagementRepository extends JpaRepository<ProgressManagement, Integer> {


    /**
     * 指定されたIDを持つProgressManagementを取得します。
     * @return ProgressManagement
     */
    ProgressManagement findByManagementId(int id);

    /**
     * 指定されたIDを持ち、削除されていないProgressManagementが存在するかを確認します。
     * @param managementId
     * @return 指定されたIDを持ち、削除されていないProgressManagementが存在する場合はtrue、そうでない場合はfalse
     */
    boolean existsBymanagementIdAndDeleteAtIsNull(int id);

    /**
     * parentIdに指定されたmanagemetIdが有効(自身が子属性でなく、削除されていない)か検証
     * @param managementId
     * @return
     */
    boolean existsByManagementIdAndParentIdIsNullAndDeleteAtIsNull(int managementId);


    /**
     * 未完了の親属性レコード取得
     * @return List<ProgressManagement>
     */
    List<ProgressManagement> findByParentIdIsNullAndDeleteAtIsNull();


    /**
     * 完了済みの親属性レコード取得
     * @return List<ProgressManagement>
     */
    List<ProgressManagement> findByParentIdIsNullAndDeleteAtIsNotNull();


    /**
     * 完了済みの子属性レコード取得
     * @return List<ProgressManagement>
     */
    List<ProgressManagement> findByParentIdIsNotNull();
    
}
