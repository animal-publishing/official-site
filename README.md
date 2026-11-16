# あにまる出版 静的サイト

GitHub Pagesで公開するための静的サイト一式です。

## 公開手順
1. GitHubでPublicリポジトリを作成
2. このフォルダ内のファイル・フォルダをすべてリポジトリ直下へアップロード
3. Settings → Pages → Deploy from a branch
4. Branch: `main` / Folder: `/ (root)` を選んでSave

## 作品データ
作品データは `data/books.json`、作者データは `data/authors.json`、イベント情報は `data/events.json` で管理します。
画像は `assets/images/` に置きます。現状、詳細ページは個別HTMLファイルです。

## 画像・作品情報の更新
表紙画像は `assets/images/`、作品情報は `data/books.json`、作者情報は `data/authors.json` で管理します。
