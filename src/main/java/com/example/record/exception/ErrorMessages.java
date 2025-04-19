package com.example.record.exception;

/**
 * エラーメッセージを定義するクラス
 */
public final class ErrorMessages {
    private ErrorMessages() {}

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
    public static final class ManagementError {

        public static final String NOT_FOUND_ITEM = "指定されたマネジメント項目は存在しないか、既に完了済の可能性があります";
  
    }

    /**
     * 全体のエラーメッセージ
     */
    public static final class GlobalErrors {
    
        public static final String SQL_ERROR = "SQL実行時エラー";
    }
}
