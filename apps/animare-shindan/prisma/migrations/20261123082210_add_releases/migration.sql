-- CreateTable
CREATE TABLE "releases" (
    "body" TEXT NOT NULL,
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "published_at" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "releases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "releases_slug_key" ON "releases"("slug");

-- Migrate the releases from inabagumi/animare-shindan on GitHub.
INSERT INTO "releases" ("body", "published_at", "slug", "title") VALUES
    ('あにまーれオタクタイプ診断を公開しました。

Version 1.0 で診断結果に表示される VTuber は以下の通りです。(※今後も随時追加予定)

- 因幡はねる', '2019-04-21 11:48:27', 'v1.0.0', 'Version 1.0'),
    ('表示される VTuber を更新しました。

Version 1.1 で診断結果に表示される VTuber は以下の通りです。(※今後も随時追加予定)

- 因幡はねる
- 因幡はねる
- 因幡はねる', '2019-04-21 11:49:27', 'v1.1.0', 'Version 1.1'),
    ('表示される VTuber を更新しました。

Version 1.2 で診断結果に表示される VTuber は以下の通りです。(※今後も随時追加予定)

- 因幡はねる
- 因幡はねる
- 因幡はねる
- 因幡はねる
- 因幡はねる
- 因幡はねる', '2019-04-21 11:51:13', 'v1.2.0', 'Version 1.2'),
    ('表示される VTuber を更新しました。

Version 1.3 で診断結果に表示される VTuber は以下の通りです。(※今後も随時追加予定)

- 因幡はねる
- 因幡はねる
- 因幡はねる
- 因幡はねる
- 因幡はねる
- 因幡はねる
- 因幡はねる
- 因幡はねる
- 因幡はねる
- 因幡はねる', '2019-04-27 13:06:48', 'v1.3.0', 'Version 1.3'),
    ('内部処理の最新化を行いました。', '2020-10-08 23:06:32', 'v2.0.0', 'Version 2.0'),
    ('質問やデータを[PlanetScale](https://planetscale.com/)に保存するようにしました。これによりデータの更新性が向上しました。
', '2021-10-05 04:10:29', 'v3.0.0', 'Version 3.0'),
    ('[App Router](https://nextjs.org/docs/app)を使うようにリファクタリングを実施いたしました。', '2023-05-11 10:21:17', 'v4.0.0', 'Version 4.0');
