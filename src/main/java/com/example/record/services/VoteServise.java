package com.example.record.services;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.record.dto.vote.AnswerRequest;
import com.example.record.dto.vote.AnswerResponse;
import com.example.record.dto.vote.CountRequest;
import com.example.record.dto.vote.CountResponse;
import com.example.record.dto.vote.QuestionRequest;
import com.example.record.dto.vote.QuestionResponse;
import com.example.record.exception.ErrorMessages;
import com.example.record.models.dao.UserAccountRepository;
import com.example.record.models.dao.VoteAnswerRepository;
import com.example.record.models.dao.VoteCountRepository;
import com.example.record.models.dao.VoteQuestionRepository;
import com.example.record.models.entities.VoteAnswer;
import com.example.record.models.entities.VoteCount;
import com.example.record.models.entities.VoteQuestion;

@Service
public class VoteServise {
    
    @Autowired
    VoteAnswerRepository voteAnswerRepo;

    @Autowired
    VoteCountRepository voteCountRepo;

    @Autowired
    VoteQuestionRepository voteQuestionRepo;

    @Autowired
    UserAccountRepository userRepo;


    /**
     * 投票結果取得
     * @param id
     * @return
     */
    public List<CountResponse> getCountList(int id){

        List<VoteCount> counts = voteCountRepo.findByVoteQuestionIdAndDeleteAtIsNull(id);

        List<CountResponse> countRes = new ArrayList<>();
        for (VoteCount count : counts){
            CountResponse res = new CountResponse();
            res.setVoteCountId(count.getVoteCountId());
            res.setVoteQuestionId(count.getVoteQuestionId());
            res.setVoteAnswerId(count.getVoteAnswerId());
            res.setUserId(count.getUser().getUserId());
            res.setUsername(count.getUser().getUsername());
            res.setCreateAt(count.getCreateAt());

            countRes.add(res);
        }
        return countRes;
    }


    /**
     * 投票を削除
     * @param request
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public void deleteCount(CountRequest request) throws Exception {

        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        // 開催中か
        if (!voteCountRepo.existsByVoteQuestionIdAndVoteAnswerIdAndUserIdAndDeleteAtIsNull(request.getVoteQuestionId(), request.getVoteAnswerId(), request.getUserId())){
            throw new Exception(ErrorMessages.VoteError.OVERLAPPING_FAIL);
        }

        // 有効なレコードか
        if (!voteCountRepo.existsByVoteCountIdAndDeleteAtIsNull(request.getVoteCountId())){
            throw new Exception(ErrorMessages.VoteError.DELETED_FAIL);
        }

        VoteCount count = voteCountRepo.findByVoteCountId(request.getVoteCountId());
        count.setUpdateAt(nowDateTime);
        count.setDeleteAt(nowDateTime);

        // 同一人物か
        if (count.getUser().getUserId() != request.getUserId()){
            throw new Exception(ErrorMessages.UserErros.AUTH_ERROR);
        }

        try {
            voteCountRepo.save(count);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }


    /**
     * 投票を追加
     * @param request
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public void createCount(CountRequest request) throws Exception {

        // 開催中か
        if (!voteCountRepo.existsByVoteQuestionIdAndVoteAnswerIdAndUserIdAndDeleteAtIsNull(request.getVoteQuestionId(), request.getVoteAnswerId(), request.getUserId())){
            throw new Exception(ErrorMessages.VoteError.OVERLAPPING_FAIL);
        }

        VoteCount count = new VoteCount();

        count.setVoteQuestionId(request.getVoteQuestionId());
        count.setVoteAnswerId(request.getVoteAnswerId());
        count.setUser(userRepo.findByUserId(request.getUserId()));

        try {
            voteCountRepo.save(count);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }


    /**
     * 回答リスト取得
     * @return
     */
    public List<AnswerResponse> getAnswerList(int id){

        List<VoteAnswer> answers = voteAnswerRepo.findByVoteQuestionIdAndDeleteAtIsNull(id);

        List<AnswerResponse> answerRes = new ArrayList<>();
        for (VoteAnswer answer : answers){

            AnswerResponse res = new AnswerResponse();
            res.setVoteAnswerId(answer.getVoteAnswerId());
            res.setVoteQuestionId(answer.getVoteQuestionId());
            res.setUserId(answer.getUser().getUserId());
            res.setUsername(answer.getUser().getUsername());
            res.setAnswer(answer.getAnswer());
            res.setCreateAt(answer.getCreateAt());
            res.setUpdateAt(answer.getUpdateAt());
            res.setDeleteAt(answer.getDeleteAt());

            answerRes.add(res);
        }

        return answerRes;
    }


    /**
     * 回答内容更新(削除含む)
     * @param lRequests
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public void updateAnster(List<AnswerRequest> lRequests) throws Exception{

        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        List<VoteAnswer> answerList = new ArrayList<>();

        List<VoteAnswer> beforeAnswers = voteAnswerRepo.findByVoteQuestionId(lRequests.get(0).getVoteQuestionId());

        for (AnswerRequest request : lRequests){

            if (request.getVoteAnswerId() != null){
                // 更新時に内容が更新された項目
                VoteAnswer answer = voteAnswerRepo.findByVoteAnswerId(request.getVoteAnswerId());
                answer.setAnswer(request.getAnswer());
                answer.setUpdateAt(nowDateTime);

                answerList.add(answer);

                beforeAnswers.removeIf(ans -> ans.getVoteAnswerId() == answer.getVoteAnswerId());

            } else {
                // 更新時に新規追加した項目
                VoteAnswer answer = new VoteAnswer();
                answer.setVoteQuestionId(request.getVoteQuestionId());
                answer.setUser(userRepo.findByUserId(request.getUserId()));
                answer.setAnswer(request.getAnswer());

                answerList.add(answer);
            }
        }

        // 更新時に削除した項目
        for (VoteAnswer beforeAns : beforeAnswers){
            VoteAnswer answer = voteAnswerRepo.findByVoteAnswerId(beforeAns.getVoteAnswerId());

            answer.setUpdateAt(nowDateTime);
            answer.setDeleteAt(nowDateTime);

            answerList.add(answer);
        }


        try {
            voteAnswerRepo.saveAll(answerList);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }


    /**
     * 回答登録
     * @param lRequests
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public void createAnster(List<AnswerRequest> lRequests) throws Exception{

        List<VoteAnswer> answerList = new ArrayList<>();

        for (AnswerRequest request : lRequests){
            VoteAnswer answer = new VoteAnswer();
            answer.setVoteQuestionId(request.getVoteQuestionId());
            answer.setUser(userRepo.findByUserId(request.getUserId()));
            answer.setAnswer(request.getAnswer());

            answerList.add(answer);
        }


        try {
            voteAnswerRepo.saveAll(answerList);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }


    /**
     * 期限が修了したものを削除にする
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public void validatePeriod() throws Exception{
        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        List<VoteQuestion> questions = voteQuestionRepo.findByPeriodLessThan(nowDateTime);

        for (VoteQuestion question : questions){
            question.setUpdateAt(nowDateTime);
            question.setDeleteAt(nowDateTime);
        }

        try {
            voteQuestionRepo.saveAll(questions);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }


    /**
     * 質問リスト取得
     * @return
     */
    public List<QuestionResponse> getQuestionList(){

        List<VoteQuestion> questions = voteQuestionRepo.findAll();

        List<QuestionResponse> questionRes = new ArrayList<>();
        for (VoteQuestion question : questions){

            QuestionResponse res = new QuestionResponse();
            res.setVoteQuestionId(question.getVoteQuestionId());
            res.setChatRoomId(question.getChatRoomId());
            res.setUserId(question.getUser().getUserId());
            res.setUsername(question.getUser().getUsername());
            res.setTitle(question.getTitle());
            res.setPeriod(question.getPeriod());
            res.setCreateAt(question.getCreateAt());
            res.setUpdateAt(question.getUpdateAt());
            res.setDeleteAt(question.getDeleteAt());

            questionRes.add(res);
        }

        return questionRes;
    }


    /**
     * 質問削除
     * @param request
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public void deleteQuestion(QuestionRequest request) throws Exception{

        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        if (!voteQuestionRepo.existsByVoteQuestionIdAndDeleteAtIsNull(request.getVoteQuestionId())){
            throw new Exception(ErrorMessages.VoteError.DELETED_FAIL);
        }

        VoteQuestion question = voteQuestionRepo.findByVoteQuestionId(request.getVoteQuestionId());

        question.setUpdateAt(nowDateTime);
        question.setDeleteAt(nowDateTime);

        try {
            voteQuestionRepo.save(question);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }


    /**
     * 質問内容更新
     * @param request
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public int updateQuestion(QuestionRequest request) throws Exception{

        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        if (!voteQuestionRepo.existsByVoteQuestionIdAndDeleteAtIsNull(request.getVoteQuestionId())){
            throw new Exception(ErrorMessages.VoteError.DELETED_FAIL);
        }

        VoteQuestion question = voteQuestionRepo.findByVoteQuestionId(request.getVoteQuestionId());

        question.setTitle(request.getTitle());
        question.setPeriod(request.getPeriod());
        question.setUpdateAt(nowDateTime);

        try {
            VoteQuestion savedQuestion = voteQuestionRepo.save(question);
            return savedQuestion.getVoteQuestionId();
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }


    /**
     * 質問追加
     * @param request
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public int createQuestion(QuestionRequest request) throws Exception{

        VoteQuestion question = new VoteQuestion();
        question.setUser(userRepo.findByUserId(request.getUserId()));
        question.setTitle(request.getTitle());
        question.setPeriod(request.getPeriod());


        try {
            VoteQuestion savedQuestion = voteQuestionRepo.save(question);
            return savedQuestion.getVoteQuestionId();
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }
}
