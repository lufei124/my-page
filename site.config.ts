import type { CardColor } from 'animal-island-ui';

export const siteConfig = {
  name: '你的名字',
  title: '狸克发来的岛屿建设日志',
  description:
    '欢迎来我的创意孤岛！全栈村民用代码搬砖、钓鱼、砍树拓荒。',
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
