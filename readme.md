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