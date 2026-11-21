# Mini Apps

[![GitHub Actions](https://github.com/inabagumi/mini-apps/actions/workflows/node.js.yml/badge.svg)](https://github.com/inabagumi/mini-apps/actions/workflows/node.js.yml)

[Haneru Developers](https://haneru.dev/) が開発と運用を行っているアプリケーションのモノレポです。

## アプリケーション

| ディレクトリ | 名前 | URL |
| --- | --- | --- |
| [`apps/774-ink`](apps/774-ink/README.md) | 774.ink | https://774.ink/ |
| [`apps/hanerubeat`](apps/hanerubeat/README.md) | Haneru Beat! | https://hanerubeat.app/ |
| [`apps/inaba-jinja`](apps/inaba-jinja/README.md) | 因幡神社 | https://inaba-jinja.com/ |
| [`apps/neru-camera`](apps/neru-camera/README.md) | ねるカメラ | https://neru.camera/ |
| [`website`](website/README.md) | Haneru Developers Website | https://haneru.dev/ |

## 共有パッケージ

| ディレクトリ | パッケージ名 | 説明 |
| --- | --- | --- |
| [`packages/components`](packages/components) | `@inabagumi/components` | 共有の React コンポーネント |
| [`packages/theme`](packages/theme) | `@inabagumi/theme` | 共有の Tailwind CSS のテーマ |

## 開発

### 必要なもの

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

Node.js と pnpm のバージョンは [`package.json`](package.json) の `devEngines` で指定しています。

### セットアップ

```console
$ git clone https://github.com/inabagumi/mini-apps.git
$ cd mini-apps
$ pnpm install
```

`.env.local.sample` や `.env.local.example` があるアプリでは、必要に応じてそれをもとに `.env.local` を作成してください。

### コマンド

リポジトリのルートで実行すると [Turborepo](https://turborepo.com/) を通じてすべてのアプリとパッケージに対して実行されます。

| コマンド         | 内容                                 |
| ---------------- | ------------------------------------ |
| `pnpm dev`       | 開発サーバーを起動する               |
| `pnpm build`     | ビルドする                           |
| `pnpm test`      | テストを実行する                     |
| `pnpm typegen`   | 型定義を生成する                     |
| `pnpm typecheck` | 型チェックを行う                     |
| `pnpm check`     | リントとフォーマットのチェックを行う |
| `pnpm fix`       | リントとフォーマットの問題を修正する |

特定のアプリやパッケージだけを対象にする場合は `--filter` にパッケージ名を指定します。

```console
$ pnpm dev --filter @inabagumi/inaba-jinja
```

### モックサーバー

`apps/inaba-jinja` と `apps/neru-camera` は Contentful からデータを取得します。`apps/inaba-jinja` はおみくじの抽選に Upstash Redis も使います。認証情報がない環境では、[`compose.yaml`](compose.yaml) で定義しているモックサーバーに接続することで、コードを書き換えずにビルドや動作確認ができます。

| モックサーバー | URL | 使用するアプリ |
| --- | --- | --- |
| [`mocks/contentful`](mocks/contentful/README.md) | http://localhost:4000 | `apps/inaba-jinja`, `apps/neru-camera` |
| [`mocks/upstash-redis`](mocks/upstash-redis/README.md) | http://localhost:4001 | `apps/inaba-jinja` |

| 環境 | セットアップ |
| --- | --- |
| Dev Container | Dev Container の作成時にモックサーバーが起動し、各アプリの `.env.local` が作成されます。 |
| Claude Code のクラウドセッション | SessionStart フック ([`.claude/hooks/session-start.sh`](.claude/hooks/session-start.sh)) で Docker デーモンとモックサーバーが起動し、各アプリの `.env.local` が作成されます。 |
| その他の環境 | 以下のコマンドを実行してください。Docker と Docker Compose が必要です。 |

```console
$ ./scripts/start-mocks.sh
$ ./scripts/setup-mock-env.sh
```

`scripts/setup-mock-env.sh` は `.env.local.example` のモックサーバー向けの設定をもとに `.env.local` を作成します。すでに `.env.local` がある場合は変更しないので、必要に応じて `.env.local.example` を参考に設定してください。

### 開発サーバーのポート

`pnpm dev` ですべての開発サーバーを同時に起動できるように、それぞれのポートを固定しています。

| ディレクトリ       | URL                   |
| ------------------ | --------------------- |
| `apps/774-ink`     | http://localhost:3000 |
| `apps/hanerubeat`  | http://localhost:3001 |
| `apps/inaba-jinja` | http://localhost:3002 |
| `apps/neru-camera` | http://localhost:3003 |
| `website`          | http://localhost:3004 |

モックサーバーは http://localhost:4000 と http://localhost:4001 で起動します。

## ライセンス

[MIT](LICENSE)

ただし画像ファイルなどのソースコード以外のファイルについてはそれぞれの著作者が権利を有しています。

## 免責事項

このリポジトリのアプリケーションは因幡はねるさんのファンによって開発と運用が行われている非公式なものです。これらのアプリケーションに対する問い合わせを因幡はねるさんや関連する個人、もしくは団体に対して行うのはお止めください。
