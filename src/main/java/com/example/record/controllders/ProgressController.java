package com.example.record.controllders;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.record.dto.progress.ProgressRequest;
import com.example.record.exception.ErrorMessages;
import com.example.record.models.entities.ProgressManagement;
import com.example.record.services.ProgressService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
    
    @Autowired
    ProgressService progressService;

    /**
     * 進捗を更新
     * @param progressRequest 進捗更新リクエスト
     * @param bindingResult バインディング結果
     * @return 成功時は空のレスポンス
     * @throws Exception バリデーションエラーまたはその他の例外
     */
    @PutMapping("/update")
    public ResponseEntity<Void> updateProgress(@Validated @RequestBody ProgressRequest progressRequest, BindingResult bindingResult) throws Exception {
        
        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.ProgressError.VALIDATE_FAIL);
        }

        progressService.updateProgress(progressRequest);
        
        return ResponseEntity.ok().build();
    }

    /**
     * 未完了の親属性レコードリスト取得
     * @return 未完了の親属性レコードのリスト
     */
    @GetMapping("/parent/incomplete")
    public ResponseEntity<List<ProgressManagement>> getIncomplateParentList() {

        List<ProgressManagement> progressList = progressService.getIncomplateProgressParent();

        return new ResponseEntity<>(progressList, HttpStatus.OK);
    }

    /**
     * 完了した親属性レコードリスト取得
     * @return 完了した親属性レコードのリスト
     */
    @GetMapping("/parent/complete")
    public ResponseEntity<List<ProgressManagement>> getComplateParentList() {

        List<ProgressManagement> progressList = progressService.getComplateProgressParent();

        return new ResponseEntity<>(progressList, HttpStatus.OK);
    }

    /**
     * 未完了の子属性レコードリスト取得
     * @return 未完了の子属性レコードのリスト
     */
    @GetMapping("/child")
    public ResponseEntity<List<ProgressManagement>> getChildList() {

        List<ProgressManagement> progressList = progressService.getProgressChild();

        return new ResponseEntity<>(progressList, HttpStatus.OK);
    }
    
    /**
     * 新規登録
     * @param progressRequest 新規登録リクエスト
     * @param bindingResult バインディング結果
     * @return 成功時は空のレスポンス
     * @throws Exception バリデーションエラーまたはその他の例外
     */
    @PostMapping("/register")
    public ResponseEntity<Void> postProgressRegister(@Validated @RequestBody ProgressRequest progressRequest, BindingResult bindingResult) throws Exception {
        
        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.ProgressError.VALIDATE_FAIL);
        }

        progressService.newProgressRegister(progressRequest);
        
        return ResponseEntity.ok().build();
    }
    
}
