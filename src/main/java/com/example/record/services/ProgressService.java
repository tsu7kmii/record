package com.example.record.services;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
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
     * 更新
     * @param request
     * @return
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public void updateProgress(ProgressRequest request) throws Exception{

        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        ProgressManagement progress = new ProgressManagement();
        progress.setManagementId(request.getManagementId());
        progress.setParentId(request.getParentId());
        progress.setUserId(request.getUserId());
        progress.setTitle(request.getTitle());
        progress.setContents(request.getContents());
        progress.setLink(request.getLink());
        progress.setStatus(request.getStatus());
        progress.setCompletionScheduleAt(request.getCompletionScheduleAt());
        progress.setUpdateAt(nowDateTime);


        if (request.getStatus() == STATUS_5_COMPLATED){
            progress.setDeleteAt(nowDateTime);
        }

        try {
            progressRepo.save(progress);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }


    /**
     * 追加
     * @param request
     * @return
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public void newProgressRegister(ProgressRequest request) throws Exception{

        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        ProgressManagement progress = new ProgressManagement();
        progress.setParentId(request.getParentId());
        progress.setUserId(request.getUserId());
        progress.setTitle(request.getTitle());
        progress.setContents(request.getContents());
        progress.setLink(request.getLink());
        progress.setStatus(request.getStatus());
        progress.setCompletionScheduleAt(request.getCompletionScheduleAt());

        if (request.getStatus() == STATUS_5_COMPLATED){
            progress.setDeleteAt(nowDateTime);
        }


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
     * 完了済みの親属性レコードリスト取得
     * @return
     */
    public List<ProgressManagement> getComplateProgressParent(){

        List<ProgressManagement> progressList = progressRepo.findByParentIdIsNullAndDeleteAtIsNotNull();

        return progressList;
    }

    /**
     * 子属性レコードリスト取得
     * @return
     */
    public List<ProgressManagement> getProgressChild(){

        List<ProgressManagement> progressList = progressRepo.findByParentIdIsNotNull();

        return progressList;
    }



    
}
