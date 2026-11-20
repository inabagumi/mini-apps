# Contentful のモックサーバー

開発・テスト用の [Contentful](https://www.contentful.com/) の [Content Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/) のモックです。[WireMock](https://wiremock.org/) で動作し、リポジトリのルートの [`compose.yaml`](../../compose.yaml) で起動します。起動方法は[ルートの README](../../README.md#モックサーバー) を参照してください。

モックサーバーは `http://localhost:4000` で起動します。

## アプリの設定

SDK の `host` と `insecure` で接続先を切り替えます。各アプリでは次の環境変数で設定します。

```dotenv
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=mock
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=mock
CONTENTFUL_HOST=localhost:4000
CONTENTFUL_INSECURE=true
```

アクセストークンには任意の値を使えます。アセットの URL がスペース ID `mock` を含むので、スペース ID は `mock` にしてください。`CONTENTFUL_HOST` を設定すると、`apps/inaba-jinja` では `next/image` がモックサーバーの画像を読み込めるようになります。

## リクエスト

[`mappings`](mappings) で次のリクエストに応答します。どちらも `Authorization: Bearer <任意の値>` ヘッダーが必要です。

| リクエスト | レスポンス |
| --- | --- |
| `GET /spaces/:space/environments/:environment/entries?content_type=:contentType` | [`__files/content-types/:contentType.json`](__files/content-types) |
| `GET /spaces/:space/environments/:environment/entries?sys.id=:id` | [`__files/entries/:id.json`](__files/entries) |

SDK の `getEntries` は前者、`getEntry` は後者のリクエストを送ります。`limit`, `skip`, `select`, `order` などのほかのクエリパラメーターは無視して、ファイルの内容をそのまま返します。存在しない ID を指定した場合は `500 Internal Server Error` を返すので、SDK はエラーを投げます。

アセットのファイルは [`__files/mock`](__files/mock) から `GET /mock/:id/:fileName` で配信します。WireMock の静的ファイルの配信を使っているので、CORS と Range リクエストにも対応しています。

## フィクスチャ

フィクスチャは Content Delivery API のレスポンスと同じ形式です。リクエストのたびに読み込むので、モックサーバーを再起動せずに変更を反映できます。

| コンテンツタイプ | アプリ | ファイル |
| --- | --- | --- |
| `fortune` | `apps/inaba-jinja` | `content-types/fortune.json` (ID の一覧) と `entries/fortune-*.json` (リンクしているアセットを `includes` に含むエントリー) |
| `overlay` | `apps/neru-camera` | `content-types/overlay.json` (リンクしているアセットを `includes` に含むエントリーの一覧) |

エントリーを追加するときは、それぞれのファイルを合わせて更新してください。アセットの `fields.file.url` は `http://localhost:4000/mock/:id/:fileName` の形式で、`details.image` には画像のサイズを指定します。
