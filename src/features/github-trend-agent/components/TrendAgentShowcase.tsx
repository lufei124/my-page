import { useMemo, useState } from 'react';
import { Button, Card, Divider, Table, Title } from 'animal-island-ui';
import type { TableColumn } from 'animal-island-ui';
import { IslandScrollArea } from '@/components/ui/IslandScrollArea';
import type { Project } from '@/types/content';
import {
  DEEPSEEK_API_KEY,
  DEFAULT_MODEL,
  QUICK_PROMPTS,
  SYSTEM_PROMPT,
} from '../constants';
import { chatWithDeepSeek } from '../services/deepseekChat';
import {
  fetchWeeklyTrendingRepos,
  formatReposForPrompt,
} from '../services/githubTrending';
import { translateDescriptionsToZh } from '../services/translateDescriptions';
import type { ChatMessage, TrendRepo } from '../types';
import styles from './TrendAgentShowcase.module.css';

interface TrendAgentShowcaseProps {
  project: Project;
}

const AGENT_CONFIG = {
  deepseekKey: import.meta.env.VITE_DEEPSEEK_API_KEY || DEEPSEEK_API_KEY,
  model: DEFAULT_MODEL,
};

const rankColumns: TableColumn[] = [
  { title: '#', dataIndex: 'rank', width: 52, align: 'center' },
  {
    title: '仓库',
    render: (_, record) => (
      <a
        href={String(record.url)}
        target="_blank"
        rel="noreferrer"
        className={styles.repoName}
      >
        {String(record.fullName)}
      </a>
    ),
  },
  {
    title: '简介',
    dataIndex: 'description',
    render: (value) => (
      <span className={styles.repoDesc}>{String(value ?? '')}</span>
    ),
  },
  { title: '⭐', dataIndex: 'stars', width: 72, align: 'center' },
  { title: '🍴', dataIndex: 'forks', width: 72, align: 'center' },
  {
    title: '得分',
    dataIndex: 'score',
    width: 72,
    align: 'center',
    render: (value) => Math.round(Number(value)).toLocaleString(),
  },
  {
    title: '语言',
    dataIndex: 'language',
    width: 88,
    render: (value) => String(value ?? '-'),
  },
];

function createMessage(
  role: ChatMessage['role'],
  content: string,
): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
  };
}

export function TrendAgentShowcase({ project }: TrendAgentShowcaseProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage(
      'assistant',
      '你好，岛民！我是 GitHub 趋势 Agent 🏝️ 告诉我你想关注什么方向，我会拉取近 7 天活跃仓库，按 star / fork 综合得分排榜，再用 DeepSeek V4 帮你解读。',
    ),
  ]);
  const [input, setInput] = useState('');
  const [repos, setRepos] = useState<TrendRepo[]>([]);
  const [loading, setLoading] = useState(false);

  const canSend = useMemo(
    () => Boolean(input.trim()) && !loading,
    [input, loading],
  );

  const rankData = useMemo(
    () =>
      repos.map((repo) => ({
        ...repo,
        score: Math.round(repo.score),
        language: repo.language ?? '-',
      })),
    [repos],
  );

  async function handleSend(text = input.trim()) {
    if (!text || loading) return;

    const userMessage = createMessage('user', text);
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const trending = await fetchWeeklyTrendingRepos();
      const descriptions = await translateDescriptionsToZh(
        trending.map((repo) => repo.description),
        AGENT_CONFIG.deepseekKey.trim(),
        AGENT_CONFIG.model,
      );
      const trendingWithZh = trending.map((repo, index) => ({
        ...repo,
        description: descriptions[index] ?? repo.description,
      }));
      setRepos(trendingWithZh);

      const priorMessages = messages
        .filter((item) => item.role !== 'error')
        .slice(-6)
        .map((item) => ({
          role: item.role as 'user' | 'assistant',
          content: item.content,
        }));

      const reply = await chatWithDeepSeek({
        apiKey: AGENT_CONFIG.deepseekKey.trim(),
        model: AGENT_CONFIG.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...priorMessages,
          {
            role: 'user',
            content: `【本周 GitHub 热门项目数据（按综合得分排序）】\n${formatReposForPrompt(trendingWithZh)}\n\n【用户问题】\n${text}`,
          },
        ],
      });

      setMessages((prev) => [...prev, createMessage('assistant', reply)]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '请求失败，请稍后重试';
      setMessages((prev) => [...prev, createMessage('error', message)]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.showcase}>
      <section className={styles.hero} aria-label="Agent 介绍">
        <div className={styles.heroBadge}>🤖 岛屿 Agent</div>
        <Title size="large" color="app-blue">
          {project.title}
        </Title>
        <p className={styles.heroDesc}>{project.summary}</p>
        <div className={styles.heroTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      <Divider type="wave-yellow" />

      <div className={styles.workspace}>
        <section className={styles.chatPanel} aria-label="对话区">
          <Title size="small" color="app-yellow">
            对话
          </Title>
          <IslandScrollArea
            className={styles.messagesWrap}
            maxHeight={360}
            aria-label="对话消息"
          >
            <div className={styles.messages}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.message} ${styles[message.role]}`}
                >
                  {message.content}
                </div>
              ))}
              {loading && (
                <div className={`${styles.message} ${styles.assistant}`}>
                  正在拉取 GitHub 数据并请求 DeepSeek V4…
                </div>
              )}
            </div>
          </IslandScrollArea>
          <div className={styles.quickPrompts}>
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className={styles.quickPrompt}
                onClick={() => handleSend(prompt)}
                disabled={loading}
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className={styles.inputRow}>
            <input
              className={styles.chatInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="例如：帮我看看这周 AI Agent 方向的热门仓库"
              onKeyDown={(e) => e.key === 'Enter' && canSend && handleSend()}
              disabled={loading}
            />
            <Button
              type="primary"
              size="large"
              onClick={() => handleSend()}
              disabled={!canSend}
            >
              发送
            </Button>
          </div>
        </section>

        <section className={styles.rankPanel} aria-label="热门排行">
          <Title size="small" color="app-pink">
            本周数据榜
          </Title>
          {repos.length === 0 ? (
            <Card color="app-yellow" className={styles.emptyRank}>
              发送消息后，这里会显示基于 GitHub 近 7 天活跃数据的排行榜。
            </Card>
          ) : (
            <div className={styles.rankTableWrap}>
              <Table
                columns={rankColumns}
                dataSource={rankData}
                rowKey="fullName"
                striped
                scroll={{ y: 420 }}
                emptyText="暂无排行数据"
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
