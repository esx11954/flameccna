import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

function getAnnouncementSidebar() {
  const dir = path.resolve(__dirname, '../announcements')
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .sort((a, b) => {
      const numA = parseInt(a)
      const numB = parseInt(b)
      if (!isNaN(numA) && !isNaN(numB)) return numB - numA
      return b.localeCompare(a)
    })
    .map(file => {
      const name = file.replace('.md', '')
      const filePath = path.join(dir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const fmTitleMatch = content.match(/^title:\s*['"]?(.+?)['"]?\s*$/m)
      const title = fmTitleMatch?.[1] ?? titleMatch?.[1] ?? `Day ${name}`
      return { text: title, link: `/announcements/${name}` }
    })
}

export default defineConfig({
  title: 'CCNA対策講座',
  description: 'CCNA学習のアナウンスと学習事項の掲示板',
  base: '/flameccna/',
  lang: 'ja-JP',

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap',
      },
    ],
  ],

  themeConfig: {
    siteTitle: 'CCNA対策講座',

    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'アナウンス', link: '/announcements/' },
    ],

    sidebar: {
      '/announcements/': [
        {
          text: 'アナウンス一覧',
          items: getAnnouncementSidebar(),
        },
      ],
    },

    outline: {
      label: '目次',
      level: [2, 3],
    },

    docFooter: {
      prev: '前へ',
      next: '次へ',
    },

    returnToTopLabel: 'トップへ戻る',
    darkModeSwitchLabel: 'ダークモード',

    footer: {
      message: 'CCNA対策講座 — 毎日更新',
    },
  },

  markdown: {
    lineNumbers: true,
  },
})
