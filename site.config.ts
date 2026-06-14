import type { CardColor } from 'animal-island-ui';

export const siteConfig = {
  name: '狸克发来的岛屿建设日志',
  title: '狸克发来的岛屿建设日志',
  description:
    '欢迎来我的创意孤岛！全栈村民用代码搬砖、钓鱼、砍树拓荒。',
  url: 'https://yourdomain.com',
  author: {
    name: '路飞',
  },
  social: {
    github: 'https://github.com/yourname',
  },
  cardColorByTag: {
    React: 'app-blue',
    TypeScript: 'app-teal',
    Design: 'app-pink',
    Fullstack: 'app-green',
    AI: 'app-yellow',
    Agent: 'app-blue',
    Python: 'app-teal',
  } satisfies Record<string, CardColor>,
  defaultCardColor: 'default' as CardColor,
  featuredPattern: 'app-pink' as const,
} as const;

export type SiteConfig = typeof siteConfig;
