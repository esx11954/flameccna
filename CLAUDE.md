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
- 各ファイルには frontmatter `title:` と `date:` と `#` 見出しを必ず入れる

### アナウンスの種別とフォーマット

**① 日次タスク（今日やること系）**
```markdown
---
title: "番号"
date: "YYYY/MM/DD"
---

# 番号

## 今日やること
...

## ゴール
...
```

**② 課題・配布物（Day N 課題系）**
```markdown
---
title: Day N 課題
date: "YYYY/MM/DD"
---

# Day N 課題

## ■ 【必須課題】
...

## ■ 【任意課題】
...

## ■ 【配布物】
...
```
- 課題ファイルのリンクは `[ダウンロード](URL)` 形式、フォームは `[開く](URL)` 形式

### pending フォルダ
- `pending/` にユーザーが下書きテキストを置く運用
- ファイル名: `YYYY-MM0DD_連番.txt`（例: `2026-05021_1.txt` = 2026/05/21 の1件目）
- 処理後は pending ファイルを削除する

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
