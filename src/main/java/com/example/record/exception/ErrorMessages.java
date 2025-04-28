package com.example.record.exception;

/**
 * エラーメッセージを定義するクラス
 */
public final class ErrorMessages {
    private ErrorMessages() {}

    /**
     * 投票関係のエラーメッセージ
     */
    public static final class VoteError {

        public static final String OVERLAPPING_FAIL = "重複エラー";

        public static final String DELETED_FAIL = "期限エラー";

        public static final String VALIDATE_FAIL = "バリデーションエラー";
  
    }

    /**
     * ユーザー認証関係のエラーメッセージ
     */
    public static final class UserErros {

        public static final String AUTH_VALIDATE_FAIL = "バリデーションエラー";

        public static final String TOKEN_VALIDATE_FAIL = "有効期限エラー";

        public static final String AUTH_ERROR = "認証エラー";
        
    }

    /**
     * 進捗管理関係のエラーメッセージ
     */
    public static final class ProgressError {

        public static final String VALIDATE_FAIL = "バリデーションエラー";
  
    }

    /**
     * 全体のエラーメッセージ
     */
    public static final class GlobalErrors {
    
        public static final String SQL_ERROR = "SQL実行時エラー";
    }
}
