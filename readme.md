<!-- 
コマンドパレットを開く
`ctrl p`

>Spring Initializrと入力
`>Spring Initializr`

react project追加

`npm install react react-dom`

他追加するときは同様にnpm install

権限エラーが出る場合
`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

テストするときは npm buildしてreaources/static/に配置のはず



起動
`npm run dev`
build/を/resources/staticに配置
spring 起動
`mvn spring-boot:run`




## デプロイ関係
spring
`pom.xml`における`<packaging>`項目において`jar`であるか`war`であるかに留意する

```
mvn package
```
`/target`に作成される


react
`/front`階層にいることに留意する
依存関係のインストール
```
npm install
```

ビルド
```
npm run build
```

`/build`に作成される
 -->

## record
`front : react`, `server : spring`構成のWebアプリケーションシステム

現在の機能  
・認証機能  
・進捗管理機能  
・投票機能  


サービス公開中 → [こちら](https://record-nsnft.ma2kz.net/)  

## release
公開秘話 -> [here](./releaseLog.md)

クラウドサービス : aws => azure

## dev
 - Java: 17
 - Spring Boot: 3.4.5
 - Spring Security 6.4.5
 - React 19

 - docker
    - mysql
    - phpmyadmin
    - mailhog



## api資料

## エンドポイント保護情報
上位の設定が優先される
|エンドポイント|認証|
|---|---|
|`/api/user/admin/**`|権限ADMIN|
|`/api/user/private/*`*<br/>`/api/user/admin/**`<br/>`/api/progress/**`<br/>`/api/vote/**`|ログイン|
|`/api/**`|csrf|

### auth
|エンドポイント|リクエスト|レスポンス(json)|メソッド|Content-Type|詳細|  
|---|---|---|---|---|---|
|/api/signin|email</br>password|200|POST|x-www-form-urlencoded|ログイン|
|/api/user/logout||200|POST|json|ログアウト|
|/api/csrf||200:String<br/>csrfToken|GET|json|csrfトークン取得|
|/api/user/private/auth||200:<br/>|GET|json|認証情報取得|
|/api/user/password|email|200|POST|json|パスワードリセットメール送信|
|/api/user/password|newPassword<br/>againNewPassword<br/>token|200|PUT|json|パスワード更新|
|/api/user/private/username|newUsername|200|PUT|json|ユーザーネーム更新|
|/api/user/private/email|newEmail|200|PUT|json|メールアドレス更新|
|/api/user/register|username<br/>email<br/>password|200|POST|json|新規登録|
|/api/user/admin/role/admin|userId|200|PUT|json|ユーザーの権限をADMINに更新|
|/api/user/admin/role/user|userId|200|PUT|json|ユーザーの権限をUSERに更新|
|/api/user/admin/disable|userId|200|DELETE|json|ユーザー削除|
|/api/user/admin/users||200:List<br/>userId<br/>username<br/>email<br/>permissionLevel|GET|json|ユーザー一覧取得|
|/api/user/private/users/active||200:List<br>userId<br/>username|GET|json|有効なユーザー一覧取得|
|/api/user/private/users/all||200:List<br>userId<br/>username|GET|json|全ユーザー一覧取得|

### progress
|エンドポイント|リクエスト|レスポンス(json)|メソッド|Content-Type|詳細|  
|---|---|---|---|---|---|
|/api/progress|managementId<br/>(parentId)<br/>userId<br/>title<br/>contents<br/>(link)<br/>status<br/>completionScheduleAt|200|PUT|json|進捗を更新|
|/api/progress/parent/incomplete||200:List<br/>managementId<br/>parentId<br/>userId<br/>title<br/>contents<br/>link<br/>status<br/>completionScheduleAt<br/>createAt<br/>updateAt<br/>deleteAt|GET|json|未完了の親属性レコードリスト取得|
|/api/progress/parent/complete||200:List<br/>managementId<br/>parentId<br/>userId<br/>title<br/>contents<br/>link<br/>status<br/>completionScheduleAt<br/>createAt<br/>updateAt<br/>deleteAt|GET|json|完了した親属性レコードリスト取得|
|/api/progress/child||200:List<br/>managementId<br/>parentId<br/>userId<br/>title<br/>contents<br/>link<br/>status<br/>completionScheduleAt<br/>createAt<br/>updateAt<br/>deleteAt|GET|json|未完了の子属性レコードリスト取得|
|/api/progress|(parentId)<br/>userId<br/>title<br/>contents<br/>(link)<br/>status<br/>completionScheduleAt|200|POST|json|新規登録|

### vote
|エンドポイント|リクエスト|レスポンス(json)|メソッド|Content-Type|詳細|  
|---|---|---|---|---|---|
|/api/vote/question/count|voteQuestionId|200:List<br/>voteCountId<br/>voteQuestionId<br/>voteAnswerId<br/>userId<br/>username<br/>createAt|POST|json|投票結果取得|
|/api/vote/count|voteCountId<br/>voteQuestionId<br/>voteAnswerId<br/>userId|200|DELETE|json|投票を削除|
|/api/vote/count|voteQuestionId<br/>voteAnswerId<br/>userId|200|POST|json|投票を追加|
|/api/vote/question/answer|voteQuestionId|200:List<br/>voteAnswerId<br/>voteQuestionId<br/>userId<br/>username<br/>answer<br/>createAt<br/>updateAt<br/>deleteAt|POST|json|質問別回答一覧取得|
|/api/vote/answer|List<br/>(voteAnswerId)<br/>voteQuestionId<br/>userId<br/>answer|200|PUT|json|質問更新時の回答変更|
|/api/vote/answer|List<br/>voteAnswerId<br/>voteQuestionId<br/>userId<br/>answer|200|POST|json|質問追加時の回答追加|
|/api/vote/question||200:List<br/>voteQuestionId<br/>chatRoomId<br/>userId<br/>username<br/>title<br/>period<br/>createAt<br/>updateAt<br/>deleteAt|GET|json|質問一覧取得|
|/api/vote/question|voteQuestionId<br/>(userId)<br/>(title)<br/>(period)|200|DELETE|json|質問削除|
|/api/vote/question|voteQuestionId<br/>userId<br/>title<br/>period|200:<br/>voteQuestionId|PUT|json|質問更新|
|/api/vote/question|userId<br/>title<br/>period|200:<br/>voteQuestionId|POST|json|質問新規追加|

## ディレクトリ構成
```

├─.mvn
│  └─wrapper
├─.vscode
├─docker            - db用
│  └─db
│      ├─data
│      ├─my.cnf
│      └─sql
├─front             - フロント開発用
│  ├─build          - npmでビルドしたもの
│  ├─node_modules   - 省略
│  ├─public
│  └─src
│      ├─api            - api関連
│      ├─components     - コンポーネント
│      ├─css            - CSS
│      ├─img            - 画像
│      └─pages          - ページ
│          ├─auth       - userや認証関係
│          ├─service    - サービス(進捗管理、投票機能)
│          └─util       - エラー他
├─phpmyadmin
│  └─sessions
├─sample                - sqlサンプルデータ
├─src
│  ├─main
│  │  ├─java
│  │  │  └─com
│  │  │      └─example
│  │  │          └─record
│  │  │              ├─controllders - RestController
│  │  │              ├─dto          - db接続 
│  │  │              │  ├─progress  - 進捗管理
│  │  │              │  ├─user      - ユーザー関係
│  │  │              │  └─vote      - 投票関係
│  │  │              ├─exception    - エラー関係
│  │  │              ├─models       - db接続 
│  │  │              │  ├─dao       - dao
│  │  │              │  └─entities  - エンティティ
│  │  │              ├─properties   - 環境変数設定
│  │  │              ├─securities   - セキュリティ関係、認証系エラーハンドラー
│  │  │              └─services     - サービスパッケージ
│  │  └─resources
│  │      ├─META-INF                - 環境変数の設定json
│  │      ├─resources               - RestAPIのため不使用
│  │      └─templates               - RestAPIのため不使用
│  └─test
│      └─java
│          └─com
│              └─example
│                  └─record
└─target                                - ビルド後の生成物
```