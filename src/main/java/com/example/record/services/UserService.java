package com.example.record.services;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.record.dto.user.AuthResponse;
import com.example.record.dto.user.SignupRequest;
import com.example.record.dto.user.UpdatePasswordRequest;
import com.example.record.dto.user.UserListResponse;
import com.example.record.exception.ErrorMessages;
import com.example.record.models.dao.PasswordTokenRepository;
import com.example.record.models.dao.UserAccountRepository;
import com.example.record.models.entities.PasswordResetToken;
import com.example.record.models.entities.UserAccount;



@Service
public class UserService {
    
    @Autowired
    UserAccountRepository userRepo;

    @Autowired
    PasswordTokenRepository passwordRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    public static final int PERMISSION_LEVEL_ADMIN = 1;

    public static final int PERMISSION_LEVEL_USER = 2;


    /**
     * idマッチ、ユーザーネーム表示用
     * @return
     */
    public List<Map<String, Object>> getUserIdUsernameList(){

        List<UserAccount> users = userRepo.findAll();

        List<Map<String, Object>> userSelectList = new ArrayList<>();

        for (UserAccount userAccount : users) {
            Map<String, Object> user = new HashMap<>();

            user.put("userId", userAccount.getUserId());
            user.put("username", userAccount.getUsername());

            userSelectList.add(user);
        }

        return userSelectList;
    }


    /**
     * プルダウンメニュー、ユーザー選択用
     * @return
     */
    public List<Map<String, Object>> getMenuItemUserList(){

        List<UserAccount> users = userRepo.findByDeleteAtIsNull();

        List<Map<String, Object>> userSelectList = new ArrayList<>();

        for (UserAccount userAccount : users) {
            Map<String, Object> user = new HashMap<>();

            user.put("userId", userAccount.getUserId());
            user.put("username", userAccount.getUsername());

            userSelectList.add(user);
        }

        return userSelectList;
    }


    /**
     * delete_atを更新してアカウントを無効化
     */
    @Transactional(rollbackFor = Exception.class)
    public void deleteUser(int userId) throws Exception {

        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        UserAccount user = userRepo.findByUserId(userId);

        user.setEmail(user.getEmail() + String.valueOf(user.getUserId()));
        user.setUpdateAt(nowDateTime);
        user.setDeleteAt(nowDateTime);

        try {
            userRepo.save(user);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }

    /**
     * 権限レベルをADMINに変更
     */
    @Transactional(rollbackFor = Exception.class)
    public void updatePermissionLevelToAdmin(int userId) throws Exception {

        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        UserAccount user = userRepo.findByUserId(userId);

        if (user.getDeleteAt() != null){
            throw new Exception(ErrorMessages.UserErros.AUTH_ERROR);
        }

        user.setUpdateAt(nowDateTime);
        user.setPermissionLevel(PERMISSION_LEVEL_ADMIN);

        try {
            userRepo.save(user);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }

    /**
     * 権限レベルをUSERに変更
     */
    @Transactional(rollbackFor = Exception.class)
    public void updatePermissionLevelToUser(int userId) throws Exception {

        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        UserAccount user = userRepo.findByUserId(userId);

        if (user.getDeleteAt() != null){
            throw new Exception(ErrorMessages.UserErros.AUTH_ERROR);
        }

        user.setUpdateAt(nowDateTime);
        user.setPermissionLevel(PERMISSION_LEVEL_USER);

        try {
            userRepo.save(user);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }


    /**
     * ユーザー一覧取得
     */
    public List<UserListResponse> getUserList(){

        List<UserAccount> userListByDB = userRepo.findByDeleteAtIsNull();
        List<UserListResponse> userListRes = new ArrayList<>();

        for (UserAccount userAccount : userListByDB) {
            UserListResponse user = new UserListResponse();

            user.setUserId(userAccount.getUserId());
            user.setUsername(userAccount.getUsername());
            user.setEmail(userAccount.getEmail());
            user.setPermissionLevel(userAccount.getPermissionLevel());

            userListRes.add(user);
            
        }

        return userListRes;
    }

    /**
     * アカウント情報取得
     */
    public AuthResponse getUserInfoByEmail(String email){

        UserAccount user = userRepo.findUserAccountByEmail(email);

        AuthResponse userRes = new AuthResponse();


        userRes.setUserId(user.getUserId());
        userRes.setEmail(user.getEmail());
        userRes.setUsername(user.getUsername());
        userRes.setPermissionLevel(user.getPermissionLevel());
        
        return userRes;
    }


    /**
     * メールアドレス重複確認
     */
    public void isEmailRegist(SignupRequest signupRequest) throws RuntimeException{
        
        Optional<UserAccount> isUserRegist = userRepo.findByEmailAndDeleteAtIsNull(signupRequest.getEmail());
        isUserRegist.ifPresent(user -> {
            throw new RuntimeException(ErrorMessages.UserErros.AUTH_ERROR);
        });
    }

    /**
     * 新規登録
     */
    @Transactional(rollbackFor = Exception.class)
    public void newUserRegister(SignupRequest signupRequest) throws Exception{


        UserAccount newUser = new UserAccount();
        newUser.setUsername(signupRequest.getUsername());
        newUser.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        newUser.setEmail(signupRequest.getEmail());
        newUser.setPermissionLevel(PERMISSION_LEVEL_USER); // 新規登録は一般ユーザーとして登録する


        try {
            userRepo.save(newUser);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }

    /**
     * メールアドレス変更
     */
    @Transactional(rollbackFor = Exception.class)
    public void updateNewEmail(String email, String newEmail) throws Exception{

        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        UserAccount user = userRepo.findUserAccountByEmail(email);

        if (user.getDeleteAt() != null){
            throw new Exception(ErrorMessages.UserErros.AUTH_ERROR);
        }

        user.setUpdateAt(nowDateTime);
        user.setEmail(newEmail);

        try {
            userRepo.save(user);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }

    /**
     * 名前変更
     */
    @Transactional(rollbackFor = Exception.class)
    public void updateNewUsername(String email, String newUsername) throws Exception{

        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        UserAccount user = userRepo.findUserAccountByEmail(email);

        if (user.getDeleteAt() != null){
            throw new Exception(ErrorMessages.UserErros.AUTH_ERROR);
        }

        user.setUpdateAt(nowDateTime);
        user.setUsername(newUsername);

        try {
            userRepo.save(user);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }
    }

    /**
     * パスワードリセットURL生成
     */
    @Transactional(rollbackFor = Exception.class, noRollbackFor = UsernameNotFoundException.class)
    public String genPasswordResetToken(String conTextPath, String email) throws UsernameNotFoundException, Exception{

        UserAccount user = userRepo.findByEmailAndDeleteAtIsNull(email)
                            .orElseThrow(() -> {
                                throw new UsernameNotFoundException(ErrorMessages.UserErros.AUTH_ERROR);
                            });
        
        // パスワードリセットトークン作成
        String token = UUID.randomUUID().toString();
        PasswordResetToken myToken = new PasswordResetToken(token,user);
        try {
            passwordRepo.save(myToken);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR); 
        }
        passwordRepo.save(myToken);

        String url = conTextPath + "/user/password?token=" + token;

        return url;
    }

    /**
     * パスワードリセット時 : 新しいパスワードに変更
     */
    @Transactional(rollbackFor = Exception.class)
    public String updateNewPassword(UpdatePasswordRequest updatePasswordRequest) throws Exception{
        Date nowDateTime = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        UserAccount user = passwordRepo.findByToken(updatePasswordRequest.getToken()).getUser();

        if (user.getDeleteAt() != null){
            throw new Exception(ErrorMessages.UserErros.AUTH_ERROR);
        }

        user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
        user.setUpdateAt(nowDateTime);

        try {
            userRepo.save(user);
        } catch (Exception e) {
            throw new Exception(ErrorMessages.GlobalErrors.SQL_ERROR);
        }

        return user.getEmail();
    }

    /**
     * パスワードリセットトークンの検証
     */
    public String validatePasswordResetToken(String token){

        final PasswordResetToken passToken = passwordRepo.findByToken(token);

        return !isTokenFound(passToken) ? "不正なトークンです"
                : isTokenExpired(passToken) ? "有効期限切れのトークンです"
                : null;
    }

    /**
     * トークンの存在確認
     * 
     * @param passToken パスワードリセットトークン
     * @return 存在するかどうか
     */
    private boolean isTokenFound(PasswordResetToken passToken) {
        return passToken != null;
    }

    /**
     * トークンの有効期限確認
     * 
     * @param passToken パスワードリセットトークン
     * @return 有効期限切れかどうか
     */
    private boolean isTokenExpired(PasswordResetToken passToken) {
        final Calendar cal = Calendar.getInstance();
        return passToken.getExpiryDate().before(cal.getTime());
    }
    
}
