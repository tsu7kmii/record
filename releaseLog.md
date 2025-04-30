# aws 公開挫折

 - フロント S3 : 
    - React SPA
 - サーバー EC2 : Linux (ubuntu 22.04), RDS : MySQL 
    - nginx 
    - spring 
    - jdk
 - ロードバランサー ALB : 
    - /api/ -> EC2,
    - other -> S3

で同一ドメインでホスト予定であったが、ロードバランサーでS3をVPCに含めてターゲットグループを作成し、振り分け設定をする方法で詰まってしまい挫折。   
よりフロントのReactSPAをEC2で公開することにするが、こうなるとazure Studentで無料枠を使うほうが経済的なのでazureに移行する

## azure 現在公開中
サーバーサイドapiとフロントエンドreactで別々ドメインを割り振ることでcrosの設定を有効活用  

 - フロント 仮想マシン : Linux (ubuntu 22.04)
    - nginx
    - React SPA
 - サーバー 仮想マシン : Linux (ubuntu 22.04), Azure Database for MySQL フレキシブル サーバー
    - nginx 
    - spring 
    - jdk 17
    - mysql-client


## 

nginxデフォルトページの存在に悩まされ`nginx - 404 not found`を出し続けるも削除することで解決 


##  

nginxの設定においてアクセスを:8080に転送させる設定において悩んだが
```
location / {
    proxy_pass http://localhost:8080/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

の形に落ち着き、springを使用している場合、以下の二つが重要になるらしい  
```
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
```  

##

Azure Database for MySQL フレキシブル サーバーではRDSと違ってphpmyadminから生成した`ALTER`含む.sqlファイルを読み込むことが出来ないので修正してから読み込む必要がある


## dev
かなり認証関係において頑張った
 - cros
 - csrf
 - auth

の設定に注意を払い、REST APIで構築したバックエンドにおいて、springはデフォルトでException発生時、status:200でhtmlを返却する。  
しかしこれはapi使用側で問題になるので、通常のExceptionだけでなく、ログインエラー時、認証エラー時、アクセス権限エラー時などのレスポンスをjsonでかつsattusコードも200以外に設定する。  
よりフロント側でapiを使用時に(response.status == 200)で確認している場合に、フロント側で予期しないエラーが発生していた問題を解決できた。

また、db操作においてupdate時も基本的に.saveを使用することで、クエリをコーディングすることなく、更新することでSQLインジェクションの防止などセキュリティリスクを向上させている。

エンドポイントの認証保護等において`.requestMatchers`の順番が現密度が高い順である必要がある  

```
.authorizeHttpRequests(authz -> authz
    .reques~tMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
    // 認証が必要なパスを先に設定
    .requestMatchers("/admin/**", "/api/user/admin/**").hasRole("ADMIN")
    .requestMatchers("/api/user/private/**", "/api/user/admin/**", "/api/progress/**", "/api/vote/**").authenticated()
    .requestMatchers("/", "/signin", "/success", "error/**" ,"/user/**", "/api/**", "/index.html", "/static/**").permitAll()
    .anyRequest()~.authenticated())
```

また当初以下のように、`"/api/**"`、` "/api/user/**"`を変化させたときに、同じエンドポイント`/api/user/auth`(現在は`/api/user/private/auth`)であってもアクセスできる、出来ないの変化が発生する現象が発生していたが、原因の特定に失敗しながら解決の道を考えた結果、上記の形に落ち着いた。
```
.requestMatchers("/", "/signin", "/success", "error/**" ,"/user/**", "/api/**", "/index.html", "/static/**").permitAll()

.requestMatchers("/", "/signin", "/success", "error/**" ,"/user/**", "/api/user/**", "/index.html", "/static/**").permitAll()
```