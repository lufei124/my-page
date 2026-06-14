# Animal Island Portfolio

动森风格个人作品集网站。基于 [animal-island-ui](https://github.com/guokaigdg/animal-island-ui) 组件库，配合 Vite + React + MDX 内容驱动架构，支持项目展示、关于页与联系表单。

## 功能概览

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | Hero 欢迎语、实时时间 HUD、项目网格 |
| 项目 | `/projects` | 按标签 Tabs 筛选的项目列表 |
| 项目详情 | `/projects/:slug` | MDX 案例正文 + 外链 |
| 关于 | `/about` | 简介、联系表单、FAQ、简历下载、Phone 装饰 |

旧路径 `/contact`、`/blog` 会自动重定向。

构建产物额外包含：

- `dist/sitemap.xml` — 站点地图

## 技术栈

- **框架**：Vite 6 + React 18 + TypeScript
- **路由**：React Router 7（懒加载 + Suspense）
- **UI**：[animal-island-ui](https://github.com/guokaigdg/animal-island-ui)（动森治愈风组件）
- **内容**：MDX + frontmatter（`import.meta.glob` 构建期加载）
- **动画**：Framer Motion 页面过渡
- **SEO**：react-helmet-async + JSON-LD
- **部署**：Docker + Nginx SPA fallback

## 快速开始

### 环境要求

- Node.js 20+
- npm 9+

### 安装与运行

```bash
# 进入项目目录
cd "d:\UGit\my page"

# 安装依赖
npm install

# 开发模式（默认 http://localhost:5173）
npm run dev

# 生产构建（含 sitemap）
npm run build

# 预览构建结果
npm run preview
```

### 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查 + 构建 + 生成 sitemap |
| `npm run preview` | 预览 `dist/` |
| `npm run typecheck` | 仅 TypeScript 检查 |
| `npm run lint` | ESLint 检查 |
| `npm run sitemap` | 单独生成 sitemap.xml |

## 项目结构

```
my page/
├── content/                 # MDX 内容（版本管理）
│   ├── projects/*.mdx       # 项目案例
│   └── */_meta.json         # 排序元数据（可选）
├── public/                  # 静态资源（favicon、OG 图、robots.txt）
├── scripts/
│   └── generate-sitemap.ts  # 构建后生成 sitemap
├── src/
│   ├── components/          # 布局、区块、SEO、MDX 映射
│   ├── features/            # 按功能划分的页面（projects/about）
│   ├── hooks/               # SeasonalTheme、i18n 等
│   ├── lib/                 # MDX 加载、SEO 工具、CMS/搜索占位
│   ├── pages/               # 首页、404
│   ├── styles/              # 全局样式、季节 overlay
│   ├── main.tsx             # 入口（必须 import animal-island-ui/style）
│   └── router.tsx           # 路由定义
├── site.config.ts           # 站点配置（姓名、导航、社交、Card 配色）
├── Dockerfile               # 多阶段 Docker 构建
├── nginx.conf               # Nginx SPA 配置
└── vite.config.ts           # Vite + MDX 插件
```

## 站点配置

编辑根目录 [`site.config.ts`](site.config.ts)：

```ts
export const siteConfig = {
  name: '你的名字',           // 导航栏与 SEO 站点名
  title: 'Animal Island Portfolio',
  description: '站点描述',
  url: 'https://yourdomain.com',  // 用于 sitemap、OG、canonical
  author: { name, email, bio },
  social: { github, twitter, email },
  resumeUrl: '/resume.pdf',   // 将 PDF 放到 public/
  nav: [ /* 导航项 */ ],
  cardColorByTag: {           // 标签 → Card 颜色映射
    React: 'app-blue',
    TypeScript: 'app-teal',
  },
};
```

修改 `url` 后，同步更新 [`public/robots.txt`](public/robots.txt) 中的 Sitemap 地址。

### 环境变量（可选）

在项目根目录创建 `.env.local`：

```env
VITE_SITE_URL=https://yourdomain.com
VITE_CONTENT_SOURCE=mdx
```

## 内容编写

### 新增项目

在 `content/projects/` 下创建 `.mdx` 文件，文件名即 URL slug：

```mdx
---
title: "项目名"
date: "2025-03-15"
tags: ["React", "TypeScript"]
featured: true
cardColor: "app-blue"
summary: "一句话描述"
links:
  demo: "https://example.com"
  github: "https://github.com/you/repo"
---

## 项目背景

正文支持 Markdown / GFM…

\`\`\`tsx
import { Card } from 'animal-island-ui';
\`\`\`
```

**frontmatter 字段说明**

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 项目标题 |
| `date` | 是 | 日期，用于排序 |
| `tags` | 是 | 标签数组，用于 Tabs 筛选 |
| `summary` | 是 | 卡片摘要 |
| `featured` | 否 | `true` 时使用精选 Card 样式 |
| `cardColor` | 否 | 覆盖 Card 颜色（13 色之一） |
| `cover` | 否 | 封面图路径，如 `/images/xxx.jpg` |
| `links` | 否 | `demo` / `github` 外链 |

保存后重新运行 `npm run dev` 或 `npm run build` 即可生效。

### Card 颜色参考

| 用途 | 推荐 color |
|------|------------|
| 默认 | `default` |
| 前端 | `app-blue` |
| 全栈 | `app-teal` |
| 设计 | `app-pink` |
| 精选 | `app-yellow` + pattern |

完整色板见 [animal-island-ui AI_USAGE.md](https://github.com/guokaigdg/animal-island-ui/blob/main/AI_USAGE.md)。

## 部署

### Docker

```bash
docker build -t animal-island-portfolio .
docker run -p 8080:80 animal-island-portfolio
```

访问 http://localhost:8080

### 静态托管

`npm run build` 后将 `dist/` 目录上传到任意静态托管（Nginx、Cloudflare Pages、GitHub Pages 等）。SPA 需配置 fallback 到 `index.html`，参考 [`nginx.conf`](nginx.conf)。

### CI

GitHub Actions 工作流见 [`.github/workflows/ci.yml`](.github/workflows/ci.yml)：push/PR 时自动 lint、typecheck、build。

## 扩展能力（已预留）

| 模块 | 文件 | 说明 |
|------|------|------|
| 多语言 | `src/hooks/useI18n.ts` | 预留 i18next 接入 |
| CMS | `src/lib/cms.ts` | `VITE_CONTENT_SOURCE=mdx\|cms` |
| 搜索 | `src/lib/search.ts` | 预留 Fuse.js |
| 季节主题 | `src/hooks/SeasonalTheme.tsx` | 按月份自动切换背景 overlay |

新增板块步骤：

1. 在 `src/features/<name>/` 添加页面
2. 在 `src/router.tsx` 注册路由
3. 在 `site.config.ts` 的 `nav` 添加链接
4. 在 `scripts/generate-sitemap.ts` 补充静态路由（如有）

## UI 组件使用注意

本项目 UI 统一使用 `animal-island-ui`，请勿自建 Button/Card 等 primitive。

```tsx
import { Button, Card, Title } from 'animal-island-ui';
import 'animal-island-ui/style'; // 仅在 main.tsx 引入一次
```

开发时请遵守组件库 API，详见 `node_modules/animal-island-ui/AI_USAGE.md` 或 [官方文档](https://github.com/guokaigdg/animal-island-ui)。

## 许可说明

- 本项目代码：MIT（可按需调整）
- **animal-island-ui**：MIT 开源，作者声明面向个人学习与非商业演示；求职作品集通常可接受，商业用途请阅读[上游 README 条款](https://github.com/guokaigdg/animal-island-ui#notes)

## 相关文档

- 详细实施计划：[PLAN.md](PLAN.md)
- 合并方案记录：`.cursor/plans/portfolio_merge_plan_6645a564.plan.md`
