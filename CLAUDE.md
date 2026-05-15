# CLAUDE.md — flameccna

## プロジェクト概要

CCNA対策講座の学習事項・アナウンスを掲載する掲示板サイト。  
VitePressで構築し、GitHub Pages（`esx11954/flameccna`）でホスティング。

- URL: `https://esx11954.github.io/flameccna/`
- 毎日1ページ追加していく運用

---

## ディレクトリ構成

```
serves/
├── .github/
│   └── workflows/
│       └── deploy.yml        # mainブランチpush時に自動デプロイ
├── .vitepress/
│   ├── config.ts             # サイト設定・サイドバー自動生成
│   └── theme/
│       ├── index.ts          # デフォルトテーマ読み込み
│       └── custom.css        # フォント(Noto Sans JP)・カラー設定
├── announcements/
│   ├── index.md              # アナウンス一覧ページ
│   ├── 1.md                  # 各アナウンスページ（番号順）
│   ├── 2.md
│   └── ...
├── index.md                  # ホームページ
├── package.json
└── CLAUDE.md
```

---

## 取り決め

### コンテンツ追加
- `announcements/` に `{番号}.md` を追加するだけでサイドバーに自動反映される
- サイドバーは数字の降順（新しい順）で表示
- サイドバーの表示テキストはファイル名（番号）のみ
- 各ファイルには frontmatter `title:` と `#` 見出しを必ず入れる

### Markdownフォーマット
- リストは `- **ラベル：** 内容` 形式（`*` + 空行 + 内容 はNG）
- 行末スペース不可
- Slack絵文字（`:white_check_mark:` など）は `✅` 等のUnicode絵文字に変換
- リンクは `[テキスト](URL)` 形式（生URL羅列はNG）

### デプロイ
- `main` ブランチへのpushで GitHub Actions が自動ビルド・デプロイ
- ローカル確認: `npm run docs:dev` → `http://localhost:5173/flameccna/`
- ビルド確認: `npm run docs:build`

### Git運用
- pushはgitコマンド（`git add` → `git commit` → `git push`）で行う
- エラーが発生した場合は自己解決せず報告して方針を確認する
