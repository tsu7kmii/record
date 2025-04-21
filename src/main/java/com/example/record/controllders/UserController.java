package com.example.record.controllders;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.record.dto.AuthResponse;
import com.example.record.dto.EmailRequest;
import com.example.record.dto.SignupRequest;
import com.example.record.dto.UpdateEmailRequest;
import com.example.record.dto.UpdatePasswordRequest;
import com.example.record.dto.UpdateUsernameRequest;
import com.example.record.dto.UserIdRequset;
import com.example.record.dto.UserListResponse;
import com.example.record.exception.ErrorMessages;
import com.example.record.services.MailSenderService;
import com.example.record.services.UserService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    MailSenderService mailSenderService;


    @GetMapping("/private/user/menuitem")
    public ResponseEntity<List<Map<String, Object>>> getMenuItemUserList() {

        List<Map<String, Object>> userList = userService.getMenuItemUserList();

        return new ResponseEntity<>(userList, HttpStatus.OK);
    }
    


    /**
     * ユーザー一覧取得
     * 
     * @return レスポンスエンティティ
     */
    @GetMapping("/admin/users")
    public ResponseEntity<List<UserListResponse>> getUserList() {
        
        List<UserListResponse> userList = userService.getUserList();

        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    /**
     * ユーザー削除
     * 
     * @param UserIdRequset ユーザーIDリクエスト
     * @return レスポンスエンティティ
     * @throws Exception 認証エラー
     */
    @DeleteMapping("/admin/disable")
    public ResponseEntity<Void> deleteUser(@RequestBody UserIdRequset userIdRequset, BindingResult bindingResult) throws Exception {

        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.UserErros.AUTH_VALIDATE_FAIL);
        }

        userService.deleteUser(userIdRequset.getUserId());

        return ResponseEntity.ok().build();
    }


    /**
     * ユーザーの権限をUSERに更新
     * 
     * @param UserIdRequset ユーザーIDリクエスト
     * @return レスポンスエンティティ
     * @throws Exception 認証エラー
     */
    @PutMapping("/admin/role/user")
    public ResponseEntity<Void> updateRoleUser(@RequestBody UserIdRequset userIdRequset, BindingResult bindingResult) throws Exception {

        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.UserErros.AUTH_VALIDATE_FAIL);
        }

        userService.updatePermissionLevelToUser(userIdRequset.getUserId());

        return ResponseEntity.ok().build();
    }

    /**
     * ユーザーの権限をADMINに更新
     * 
     * @param UserIdRequset ユーザーIDリクエスト
     * @return レスポンスエンティティ
     * @throws Exception 認証エラー
     */
    @PutMapping("/admin/role/admin")
    public ResponseEntity<Void> updateRoleAdmin(@RequestBody UserIdRequset userIdRequset, BindingResult bindingResult) throws Exception {

        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.UserErros.AUTH_VALIDATE_FAIL);
        }

        userService.updatePermissionLevelToAdmin(userIdRequset.getUserId());

        return ResponseEntity.ok().build();
    }

    /**
     * 新規登録
     * 
     * @param signupRequest 新規登録リクエスト
     * @param bindingResult バインディング結果
     * @return レスポンスエンティティ
     * @throws Exception バリデーションエラー
     */
    @PostMapping("/register")
    public ResponseEntity<Void> postRegister(@Validated @RequestBody SignupRequest signupRequest, BindingResult bindingResult) throws Exception {

        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.UserErros.AUTH_VALIDATE_FAIL);
        }

        userService.isEmailRegist(signupRequest);
        userService.newUserRegister(signupRequest);

        return ResponseEntity.ok().build();
    }

    /**
     * メールアドレス更新
     * 
     * @param updateEmailRequest メールアドレス更新リクエスト
     * @param bindingResult バインディング結果
     * @param userDetails ユーザーディテール
     * @return レスポンスエンティティ
     * @throws Exception バリデーションエラー
     */
    @PutMapping("/private/email")
    public ResponseEntity<Void> updateEmail(@Validated @RequestBody UpdateEmailRequest updateEmailRequest, BindingResult bindingResult, @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.UserErros.AUTH_VALIDATE_FAIL);
        }

        userService.updateNewEmail(userDetails.getUsername(), updateEmailRequest.getNewEmail());
        mailSenderService.sendPasswordChangeSuccessMail(userDetails.getUsername());

        return ResponseEntity.ok().build();
    }

    /**
     * ユーザーネーム更新
     * 
     * @param updateUsernameRequest ユーザーネーム更新リクエスト
     * @param bindingResult バインディング結果
     * @param userDetails ユーザーディテール
     * @return レスポンスエンティティ
     * @throws Exception バリデーションエラー
     */
    @PutMapping("/private/username")
    public ResponseEntity<Void> updateUsername(@Validated @RequestBody UpdateUsernameRequest updateUsernameRequest, BindingResult bindingResult, @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.UserErros.AUTH_VALIDATE_FAIL);
        }

        userService.updateNewUsername(userDetails.getUsername(), updateUsernameRequest.getNewUsername());

        return ResponseEntity.ok().build();
    }

    /**
     * パスワード更新
     * 
     * @param updatePasswordRequest パスワード更新リクエスト
     * @param bindingResult バインディング結果
     * @return レスポンスエンティティ
     * @throws Exception バリデーションエラー、トークン検証エラー
     */
    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(@Validated @RequestBody UpdatePasswordRequest updatePasswordRequest, BindingResult bindingResult) throws Exception {

        if (bindingResult.hasErrors()) {
            throw new Exception(ErrorMessages.UserErros.AUTH_VALIDATE_FAIL);
        }

        // tokenの検証
        String isValidPasswordResetToken = userService.validatePasswordResetToken(updatePasswordRequest.getToken());
        if (isValidPasswordResetToken != null) {
            throw new Exception(ErrorMessages.UserErros.TOKEN_VALIDATE_FAIL);
        }

        userService.updateNewPassword(updatePasswordRequest);

        return ResponseEntity.ok().build();
    }

    /**
     * パスワードリセットメール送信
     * 
     * @param emailRequest メールリクエスト
     * @param request HTTPリクエスト
     * @return レスポンスエンティティ
     * @throws Exception 例外
     */
    @PostMapping("/password")
    public ResponseEntity<Void> sendPasswordEmail(@RequestBody EmailRequest emailRequest, HttpServletRequest request) throws Exception {

        String appURL = userService.genPasswordResetToken(getAppUrl(request), emailRequest.getEmail());
        mailSenderService.sendPasswordResetMail(emailRequest.getEmail(), appURL);

        return ResponseEntity.ok().build();
    }

    /**
     * 認証情報取得
     * 
     * @param userDetails ユーザーディテール
     * @return 認証レスポンス
     * @throws Exception 認証エラー
     */
    @GetMapping("/private/auth")
    public ResponseEntity<AuthResponse> getAuth(@AuthenticationPrincipal UserDetails userDetails) throws Exception {

        if (userDetails == null) {
            throw new Exception(ErrorMessages.UserErros.AUTH_ERROR);
        }

        AuthResponse auth = userService.getUserInfoByEmail(userDetails.getUsername());

        return new ResponseEntity<>(auth, HttpStatus.OK);
    }

    /**
     * アプリケーションのURL取得
     * 
     * @param request リクエスト
     * @return アプリケーションのURL
     */
    private String getAppUrl(HttpServletRequest request) {
        return request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }
}
