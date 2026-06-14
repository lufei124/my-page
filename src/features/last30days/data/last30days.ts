import type { CardColor } from 'animal-island-ui';

export const LAST30DAYS_SOURCES: Array<{
  id: string;
  emoji: string;
  name: string;
  desc: string;
  color: CardColor;
}> = [
  {
    id: 'reddit',
    emoji: '🦝',
    name: 'Reddit',
    desc: '真实讨论与顶评点赞，社区最直白的观点',
    color: 'app-orange',
  },
  {
    id: 'x',
    emoji: '🐦',
    name: 'X / Twitter',
    desc: '热点线程、专家观点与第一时间反应',
    color: 'app-blue',
  },
  {
    id: 'youtube',
    emoji: '📺',
    name: 'YouTube',
    desc: '长视频转录，提炼可引用的关键句',
    color: 'app-red',
  },
  {
    id: 'hn',
    emoji: '🧑‍💻',
    name: 'Hacker News',
    desc: '开发者共识，技术圈真实争论现场',
    color: 'app-teal',
  },
  {
    id: 'polymarket',
    emoji: '🎯',
    name: 'Polymarket',
    desc: '真金白银的预测市场赔率，不是 pundit 猜测',
    color: 'purple',
  },
  {
    id: 'github',
    emoji: '🐙',
    name: 'GitHub',
    desc: 'PR 速度、Star 数、Release 与 Issue 讨论',
    color: 'app-green',
  },
] as const;

export const SAMPLE_BRIEF = {
  topic: 'OpenClaw',
  summary: [
    'Reddit r/ClaudeCode 热议：社区普遍认为 OpenClaw 是执行层，与 Hermes（自改进）和 Paperclip（组织层）形成互补而非竞争。',
    'GitHub 上 openclaw/openclaw 星标持续攀升，近期 Release 聚焦跨设备 Agent 控制。',
    'X 上 @IMJustinBrooke 的比喻走红：「OpenClaw = Charmander，Hermes = Charizard」。',
    'Polymarket 上相关预测市场显示社区对生态持续发展的信心偏高。',
  ],
  stats: [
    { label: 'Reddit 帖', value: '23' },
    { label: 'X 帖', value: '17' },
    { label: 'YouTube', value: '8' },
    { label: 'HN 讨论', value: '4' },
  ],
};

export const INSTALL_COMMANDS = {
  cursor: 'npx skills add mvanhorn/last30days-skill -g -a cursor',
  claude: '/plugin marketplace add mvanhorn/last30days-skill',
  local: 'skills/last30days-skill/skills/last30days',
};

export const REPO_URL = 'https://github.com/mvanhorn/last30days-skill';
