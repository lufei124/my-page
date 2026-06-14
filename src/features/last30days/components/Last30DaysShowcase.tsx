import { useState } from 'react';
import {
  Button,
  Card,
  CodeBlock,
  Divider,
  Title,
  Typewriter,
} from 'animal-island-ui';
import type { Project } from '@/types/content';
import {
  INSTALL_COMMANDS,
  LAST30DAYS_SOURCES,
  REPO_URL,
  SAMPLE_BRIEF,
} from '../data/last30days';
import styles from './Last30DaysShowcase.module.css';

interface Last30DaysShowcaseProps {
  project: Project;
}

export function Last30DaysShowcase({ project }: Last30DaysShowcaseProps) {
  const [topic, setTopic] = useState('');
  const [researching, setResearching] = useState(false);
  const [showBrief, setShowBrief] = useState(false);

  const displayTopic = topic.trim() || SAMPLE_BRIEF.topic;

  function handleResearch() {
    if (researching) return;
    setShowBrief(false);
    setResearching(true);
    window.setTimeout(() => {
      setResearching(false);
      setShowBrief(true);
    }, 1400);
  }

  return (
    <div className={styles.showcase}>
      <section className={styles.hero} aria-label="Last30Days 介绍">
        <div className={styles.heroBadge}>📰 岛屿情报站</div>
        <Title size="large" color="app-green">
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

      <section className={styles.demo} aria-label="调研演示">
        <Title size="small" color="app-blue">
          试试输入话题
        </Title>
        <p className={styles.demoHint}>
          输入任意人物、产品或技术关键词，体验动森风格的情报简报预览（演示数据，非实时调用）。
        </p>
        <div className={styles.demoForm}>
          <input
            className={styles.topicInput}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="例如：OpenClaw、Nano Banana Pro、Universal Epic Universe"
            onKeyDown={(e) => e.key === 'Enter' && handleResearch()}
          />
          <Button
            type="primary"
            size="large"
            onClick={handleResearch}
          >
            {researching ? '调研中…' : '开始调研 🍃'}
          </Button>
        </div>

        {researching && (
          <Card color="app-yellow" pattern="app-pink" className={styles.loadingCard}>
            <p className={styles.loadingText}>
              正在搜索 Reddit、X、YouTube、HN…
            </p>
          </Card>
        )}

        {showBrief && !researching && (
          <Card color="app-teal" className={styles.briefCard}>
            <div className={styles.briefHeader}>
              <span className={styles.briefIcon}>📋</span>
              <Title size="small" color="app-green">
                {displayTopic} · 近 30 天简报
              </Title>
            </div>
            <div className={styles.stats}>
              {SAMPLE_BRIEF.stats.map((item) => (
                <div key={item.label} className={styles.stat}>
                  <span className={styles.statValue}>{item.value}</span>
                  <span className={styles.statLabel}>{item.label}</span>
                </div>
              ))}
            </div>
            <Typewriter speed={28}>
              <ul className={styles.briefList}>
                {SAMPLE_BRIEF.summary.map((line) => (
                  <li key={line}>{line.replace('OpenClaw', displayTopic)}</li>
                ))}
              </ul>
            </Typewriter>
            <p className={styles.briefNote}>
              完整调研需在本机安装 Skill 后于 Cursor / Claude Code 中运行{' '}
              <code>/last30days {displayTopic}</code>
            </p>
          </Card>
        )}
      </section>

      <section className={styles.sources} aria-label="数据来源">
        <Title size="small" color="app-yellow">
          多平台情报源
        </Title>
        <p className={styles.sectionHint}>
          不是 SEO 排序，而是按真实互动量（点赞、评论、赔率）综合评分。
        </p>
        <div className={styles.sourceGrid}>
          {LAST30DAYS_SOURCES.map((source) => (
            <Card
              key={source.id}
              color={source.color}
              className={styles.sourceCard}
            >
              <span className={styles.sourceEmoji}>{source.emoji}</span>
              <strong>{source.name}</strong>
              <p>{source.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.install} aria-label="安装方式">
        <Title size="small" color="app-pink">
          安装到 Cursor
        </Title>
        <Card color="default" className={styles.installCard}>
          <p className={styles.installLabel}>全局安装（推荐）</p>
          <CodeBlock code={INSTALL_COMMANDS.cursor} />
          <Divider type="dashed-brown" />
          <p className={styles.installLabel}>Claude Code 插件</p>
          <CodeBlock code={INSTALL_COMMANDS.claude} />
          <Divider type="dashed-brown" />
          <p className={styles.installLabel}>本仓库已嵌入</p>
          <p className={styles.embedPath}>
            子模块路径：<code>{INSTALL_COMMANDS.local}</code>
          </p>
        </Card>
        <div className={styles.actions}>
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            <Button type="primary" size="large">
              上游 GitHub
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
