package com.example.record.controllders;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.record.dto.vote.AnswerRequest;
import com.example.record.dto.vote.AnswerResponse;
import com.example.record.dto.vote.QuestionIdRequest;
import com.example.record.dto.vote.QuestionRequest;
import com.example.record.dto.vote.QuestionResponse;
import com.example.record.exception.ErrorMessages;
import com.example.record.services.UserService;
import com.example.record.services.VoteServise;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@RequestMapping("/api/vote")
public class VoteController {

    @Autowired
    VoteServise voteServise;

    @Autowired
    UserService userService;

    
    /**
     * 質問別回答一覧取得
     * @return
     * @throws Exception
     */
    @PostMapping("/question/answer")
    public ResponseEntity<List<AnswerResponse>> getAnswerList(@Validated @RequestBody QuestionIdRequest questionidRequest, BindingResult bindingResult) throws Exception {
        
        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.VoteError.VALIDATE_FAIL);
        }

        List<AnswerResponse> answerList = voteServise.getAnswerList(questionidRequest.getVoteQuestionId());

        return new ResponseEntity<>(answerList, HttpStatus.OK);
    }


    /**
     * 質問追加時の回答変更
     * @param lAnswerRequests
     * @param bindingResult
     * @return
     * @throws Exception
     */
    @PutMapping("/answer")
    public ResponseEntity<Void> updateAnswer(@Validated @RequestBody List<AnswerRequest> lAnswerRequests, BindingResult bindingResult) throws Exception {
        
        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.VoteError.VALIDATE_FAIL);
        }

        for (AnswerRequest request : lAnswerRequests){
            userService.isUserNotDeleted(request.getUserId());
        }

        voteServise.updateAnster(lAnswerRequests);

        return ResponseEntity.ok().build();
    }


    /**
     * 質問追加時の回答追加
     * @param lAnswerRequests
     * @param bindingResult
     * @return
     * @throws Exception
     */
    @PostMapping("/answer")
    public ResponseEntity<Void> createAnswer(@Validated @RequestBody List<AnswerRequest> lAnswerRequests, BindingResult bindingResult) throws Exception {
        
        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.VoteError.VALIDATE_FAIL);
        }

        for (AnswerRequest request : lAnswerRequests){
            userService.isUserNotDeleted(request.getUserId());
        }

        voteServise.createAnster(lAnswerRequests);

        return ResponseEntity.ok().build();
    }


    /**
     * 質問一覧取得
     * @return
     * @throws Exception
     */
    @GetMapping("/question")
    public ResponseEntity<List<QuestionResponse>> getQuestionList() throws Exception{

        voteServise.validatePeriod();

        List<QuestionResponse> questionList = voteServise.getQuestionList();

        return new ResponseEntity<>(questionList, HttpStatus.OK);
    }
    

    /**
     * 質問削除
     * @param questionRequest
     * @return
     * @throws Exception
     */
    @DeleteMapping("/question")
    public ResponseEntity<Void> deleteQuestion(@RequestBody QuestionRequest questionRequest) throws Exception {


        voteServise.deleteQuestion(questionRequest);
        
        
        return ResponseEntity.ok().build();
    }

    /**
     * 質問更新
     * @param questionRequest
     * @param bindingResult
     * @return
     * @throws Exception
     */
    @PutMapping("/question")
    public ResponseEntity<Object> updateQuestion(@Validated @RequestBody QuestionRequest questionRequest, BindingResult bindingResult) throws Exception {
        
        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.VoteError.VALIDATE_FAIL);
        }

        int voteQuestionId = voteServise.updateQuestion(questionRequest);
        return ResponseEntity.ok().body(Map.of("voteQuestionId", voteQuestionId));
    }

    /**
     * 質問新規追加
     * @param questionRequest
     * @param bindingResult
     * @return
     * @throws Exception
     */
    @PostMapping("/question")
    public ResponseEntity<Object> createQuestion(@Validated @RequestBody QuestionRequest questionRequest, BindingResult bindingResult) throws Exception {
        
        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.VoteError.VALIDATE_FAIL);
        }

        userService.isUserNotDeleted(questionRequest.getUserId());

        int voteQuestionId = voteServise.createQuestion(questionRequest);
        return ResponseEntity.ok().body(Map.of("voteQuestionId", voteQuestionId));
    }
}
