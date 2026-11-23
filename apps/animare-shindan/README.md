# あなたのオタクタイプ診断 by あにまーれ

[あなたのオタクタイプ診断 by あにまーれ (あにまーれ診断)](https://shindan.animare.cafe/) は有閑喫茶あにまーれや有閑喫茶あにまーれに所属するメンバーを題材とした非公式のウェブサービスです。[あなたのオタクタイプ診断 by IRIAM](https://shindan.iriam.com/) をオリジナルとして、デザインやレイアウトの転用をしていますが素材の流用は一切行っていません。

## お知らせ

[お知らせ](https://shindan.animare.cafe/list) に表示するリリースは DB の `releases` テーブルに保存しています。リリースを追加するときは、`apps/animare-shindan` で `releases` テーブルに行を追加するマイグレーションを作成し、本番の DB に適用してください。

```console
$ pnpm exec prisma migrate dev --create-only --name add_release_v5_0_0
$ # 作成された migration.sql に INSERT 文を書く
$ pnpm exec prisma migrate deploy
```

## ライセンス

[MIT](LICENSE)
