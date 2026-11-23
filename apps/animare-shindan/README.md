# あなたのオタクタイプ診断 by あにまーれ

[あなたのオタクタイプ診断 by あにまーれ (あにまーれ診断)](https://shindan.animare.cafe/) は有閑喫茶あにまーれや有閑喫茶あにまーれに所属するメンバーを題材とした非公式のウェブサービスです。[あなたのオタクタイプ診断 by IRIAM](https://shindan.iriam.com/) をオリジナルとして、デザインやレイアウトの転用をしていますが素材の流用は一切行っていません。

## 開発

### テスト

シードのテストはPostgreSQLを使用します。`TEST_DATABASE_URL` が設定されていない場合は省略されます (CIでは失敗します)。リポジトリーのルートで `docker compose up --detach --wait postgres` を実行してPostgreSQLを起動し、次のようにテストを実行してください。

```bash
TEST_DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/postgres pnpm test
```

テストは一時的なスキーマを作成してマイグレーションを適用し、終了時に削除します。

## ライセンス

[MIT](../../LICENSE)
