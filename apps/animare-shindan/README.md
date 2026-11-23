# あなたのオタクタイプ診断 by あにまーれ

[あなたのオタクタイプ診断 by あにまーれ (あにまーれ診断)](https://shindan.animare.cafe/) は有閑喫茶あにまーれや有閑喫茶あにまーれに所属するメンバーを題材とした非公式のウェブサービスです。[あなたのオタクタイプ診断 by IRIAM](https://shindan.iriam.com/) をオリジナルとして、デザインやレイアウトの転用をしていますが素材の流用は一切行っていません。

## 開発

### テスト

テストはテスト用のシードデータ ([`prisma/seed/data.ts`](prisma/seed/data.ts)) を使用し、本番環境のデータには依存しません。データベースを使用するテストにはPostgreSQLが必要です。リポジトリーのルートで `docker compose up --detach --wait postgres` を実行してPostgreSQLを起動し、`TEST_DATABASE_URL` に接続先を設定してください。CIでも同じコマンドでテストを実行しています。

```bash
export TEST_DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/postgres
```

#### 単体テスト

[Vitest](https://vitest.dev/) で採点などのロジックやコンポーネントをテストします。テストファイルはテスト対象と同じディレクトリーに `*.test.ts` または `*.test.tsx` として配置します。

```bash
pnpm test
```

シードやマイグレーションのテストは、一時的なスキーマを作成してマイグレーションを適用し、終了時に削除します。`TEST_DATABASE_URL` が設定されていない場合は省略されます (CIでは失敗します)。

#### E2Eテスト

[Playwright](https://playwright.dev/) でトップページから診断を開始し、質問への回答や前の質問への移動を経て結果ページが表示されるまでの流れをテストします。テストは [`e2e`](e2e) ディレクトリーに配置します。初回はブラウザーをインストールしてください。

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

E2Eテストは `TEST_DATABASE_URL` のサーバーに `animare_shindan_e2e` データベースを作成し直してマイグレーションとシードを適用したうえで、アプリケーションをビルドしてポート3105で起動します ([`playwright.config.ts`](playwright.config.ts))。`.env.local` の `DATABASE_URL` などは使用しません。

### データベースへの接続

アプリケーションとシードは標準では [Neon](https://neon.com/) のサーバーレスドライバーで `DATABASE_URL` に接続します。Neon以外のPostgreSQL (`compose.yaml` のPostgreSQLなど) に接続する場合は、`DATABASE_ADAPTER=pg` を設定して [node-postgres](https://node-postgres.com/) を使用してください。

## ライセンス

[MIT](../../LICENSE)
