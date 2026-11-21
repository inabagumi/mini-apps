# Upstash Redis のモックサーバー

開発・テスト用の [Upstash Redis](https://upstash.com/docs/redis/overall/getstarted) の [REST API](https://upstash.com/docs/redis/features/restapi) のモックです。[Serverless Redis HTTP (SRH)](https://github.com/hiett/serverless-redis-http) と [Valkey](https://valkey.io/) で動作し、リポジトリのルートの [`compose.yaml`](../../compose.yaml) で起動します。起動方法は[ルートの README](../../README.md#モックサーバー) を参照してください。

モックサーバーは `http://localhost:4001` で起動します。

## アプリの設定

`@upstash/redis` の `Redis.fromEnv()` が読み込む環境変数で接続先を切り替えます。

```dotenv
UPSTASH_REDIS_REST_TOKEN=mock
UPSTASH_REDIS_REST_URL=http://localhost:4001
```

トークンは `compose.yaml` の `SRH_TOKEN` と同じ値にしてください。異なる値を指定した場合は `401 Unauthorized` を返します。

## 構成

| サービス | イメージ | 役割 |
| --- | --- | --- |
| `upstash-redis` | `hiett/serverless-redis-http` | REST API のリクエストを Redis のコマンドに変換して `valkey` に送ります。 |
| `valkey` | `valkey-io/valkey` | データを保持します。ポートは公開していません。 |

コマンドは Valkey が実行するので、`@upstash/redis` が使う単一のコマンド (`POST /`)、パイプライン (`POST /pipeline`)、トランザクション (`POST /multi-exec`)、`EVAL` による Lua スクリプトがそのまま動作します。Upstash Redis との違いは [SRH の README](https://github.com/hiett/serverless-redis-http#differences-between-upstash-and-redis-to-note) を参照してください。

Docker Hub の匿名 pull はレート制限にかかることがあるので、SRH は Docker Hub のミラー (`mirror.gcr.io`)、Valkey は GHCR のイメージを使っています。

## データ

データは永続化しないので、モックサーバーを作り直すと空になります。`apps/inaba-jinja` は `fortunes` が空のときに Contentful から取得したおみくじの ID を登録するので、あらかじめデータを用意する必要はありません。

データの確認や削除には REST API を使えます。

```console
$ curl http://localhost:4001 \
    --header 'Authorization: Bearer mock' \
    --header 'Content-Type: application/json' \
    --data '["SMEMBERS", "fortunes"]'
{"result":["fortune-1","fortune-2","fortune-3","fortune-4"]}
$ curl http://localhost:4001 \
    --header 'Authorization: Bearer mock' \
    --header 'Content-Type: application/json' \
    --data '["FLUSHALL"]'
{"result":"OK"}
```
