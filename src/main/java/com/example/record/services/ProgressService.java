package com.example.record.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.record.dto.ProgressRequest;
import com.example.record.exception.ErrorMessages;
import com.example.record.models.dao.ProgressManagementRepository;
import com.example.record.models.entities.ProgressManagement;

@Service
public class ProgressService {

    @Autowired
    ProgressManagementRepository progressRepo;


    public static final int STATUS_0_NOT_STARTED = 0;           // 未着手
    public static final int STATUS_1_IN_PRROGRESS = 1;          // 取り組み中
    public static final int STATUS_2_ON_HOLD = 2;               // 待機
    public static final int STATUS_3_WAITING_FOR_REVIEW = 3;    // レビュー待ち
    public static final int STATUS_4_WAIT_FOR_PROCESSING = 4;   // 処理待ち
    public static final int STATUS_5_COMPLATED = 5;             // 完了



    /**
     * 
     * 取得（親）未と年
     * 
     * 取得（子）未と年
     * 
     * 
     * 追加（一緒でいけるはず）
     * 
     * 更新
     * 
     * 削除
     * 
     */


    /**
     * 追加
     * @param request
     * @return
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public void newProgressRegister(ProgressRequest request) throws Exception{

        ProgressManagement progress = new ProgressManagement();
        progress.setParentId(request.getParentId());
        progress.setUserId(request.getUserId());
        progress.setTitle(request.getTitle());
        progress.setContents(request.getContents());
        progress.setLink(request.getLink());
        progress.setStatus(request.getStatus());
        progress.setCompletionScheduleAt(request.getCompletionScheduleAt());


        try {
            progressRepo.save(progress);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }

    /**
     * 未完了の親属性レコードリスト取得
     * @return
     */
    public List<ProgressManagement> getIncomplateProgressParent(){

        List<ProgressManagement> progressList = progressRepo.findByParentIdIsNullAndDeleteAtIsNull();

        return progressList;
    }

    /**
     * 未完了の子属性レコードリスト取得
     * @return
     */
    public List<ProgressManagement> getIncomplateProgressChild(){

        List<ProgressManagement> progressList = progressRepo.findByParentIdIsNotNullAndDeleteAtIsNull();

        return progressList;
    }

    /**
     * 完了済みの親属性レコードリスト取得
     * @return
     */
    public List<ProgressManagement> getComplateProgressParent(){

        List<ProgressManagement> progressList = progressRepo.findByParentIdIsNullAndDeleteAtIsNotNull();

        return progressList;
    }

    /**
     * 完了済みの子属性レコードリスト取得
     * @return
     */
    public List<ProgressManagement> getComplateProgressChild(){

        List<ProgressManagement> progressList = progressRepo.findByParentIdIsNotNullAndDeleteAtIsNotNull();

        return progressList;
    }



    
}
