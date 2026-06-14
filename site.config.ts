import type { CardColor } from 'animal-island-ui';

export const siteConfig = {
  name: '你的名字',
  title: 'Animal Island Portfolio',
  description: '欢迎来到我的岛屿作品集 — 前端与全栈项目展示',
  url: 'https://yourdomain.com',
  locale: 'zh-CN',
  author: {
    name: '路飞',
    email: 'lfei7277@gmail.com',
    bio: '产品经理',
  },
  social: {
    github: 'https://github.com/yourname',
    twitter: '',
    email: 'mailto:hello@example.com',
  },
  resumeUrl: '/resume.pdf',
  cardColorByTag: {
    React: 'app-blue',
    TypeScript: 'app-teal',
    Design: 'app-pink',
    Fullstack: 'app-green',
    AI: 'app-yellow',
    Python: 'app-teal',
  } satisfies Record<string, CardColor>,
  defaultCardColor: 'default' as CardColor,
  featuredCardColor: 'app-yellow' as CardColor,
  featuredPattern: 'app-pink' as const,
} as const;

export type SiteConfig = typeof siteConfig;
