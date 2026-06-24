Convert pending/* into the next numbered announcements/NN.md, commit, delete the pending file, then git push.

## Steps

1. **pendingファイルを確認** — `pending/` 内のファイルを Glob で列挙する。なければ「処理対象がありません」と報告して終了。

2. **次の番号を決定** — `announcements/*.md`（index.md除く）の最大番号 + 1 を使う。

3. **直近のフォーマットを確認** — 最新の `announcements/NN.md` を Read して frontmatter・見出し構成を把握する。

4. **`announcements/NN.md` を作成** — CLAUDE.md のフォーマット規則に従って Write する。
   - frontmatter: `title:` と `date:`（pendingファイル名の日付 `YYYY/MM/DD` 形式）
   - `# NN` 見出し
   - 本文はpendingの内容を整形（`*` ではなく `-`、行末スペース除去、Slack絵文字→Unicode変換）

5. **pendingファイルを削除** — `pending/` ファイルはGit管理外のため **PowerShellの `Remove-Item`** で削除する（`git rm` は使わない）。

6. **コミット** — `git add announcements/NN.md && git commit -m "feat: YYYY/MM/DDのアナウンスを追加（NN）"`

7. **プッシュ** — `git push origin main`
