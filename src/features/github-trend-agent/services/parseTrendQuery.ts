export interface TrendQuery {
  days: number;
  title: string;
  summary: string;
  language?: string;
  keyword?: string;
}

const LANGUAGE_PATTERNS: Array<{ pattern: RegExp; code: string; label: string }> =
  [
    { pattern: /\bpython\b|Python/i, code: 'python', label: 'Python' },
    {
      pattern: /\btypescript\b|\bts\b|TypeScript/i,
      code: 'typescript',
      label: 'TypeScript',
    },
    {
      pattern: /\bjavascript\b|\bjs\b|JavaScript|前端/i,
      code: 'javascript',
      label: 'JavaScript',
    },
    { pattern: /\brust\b|Rust/i, code: 'rust', label: 'Rust' },
    { pattern: /\bgolang\b|\bgo\b|Go/i, code: 'go', label: 'Go' },
    { pattern: /\bjava\b|Java/i, code: 'java', label: 'Java' },
  ];

function detectDays(text: string): number {
  if (/今日|今天|每日|24\s*小时|一天|daily/i.test(text)) {
    return 1;
  }
  if (/本月|30\s*天|三十天|monthly/i.test(text)) {
    return 30;
  }
  if (/本周|7\s*天|七天|这周|weekly/i.test(text)) {
    return 7;
  }
  return 7;
}

function periodLabel(days: number): string {
  if (days === 1) return '近 24 小时';
  if (days === 7) return '近 7 天';
  if (days === 30) return '近 30 天';
  return `近 ${days} 天`;
}

function periodTitle(days: number): string {
  if (days === 1) return '今日';
  if (days === 7) return '本周';
  if (days === 30) return '本月';
  return `近${days}天`;
}

function detectLanguage(text: string): { code: string; label: string } | null {
  for (const item of LANGUAGE_PATTERNS) {
    if (item.pattern.test(text)) {
      return { code: item.code, label: item.label };
    }
  }
  return null;
}

function detectKeyword(text: string, languageLabel?: string): string | undefined {
  const quoted = text.match(/[「"']([^「"']+)[」"']/);
  if (quoted?.[1]) {
    return quoted[1].trim();
  }

  const topicPatterns = [
    /AI\s*Agent/i,
    /人工智能|机器学习|大模型|LLM|RAG|Agent/i,
    /开源|DevOps|数据库|爬虫|游戏/i,
  ];

  for (const pattern of topicPatterns) {
    const match = text.match(pattern);
    if (match?.[0]) {
      return match[0].trim();
    }
  }

  if (/前端/.test(text) && languageLabel !== 'JavaScript') {
    return '前端';
  }

  return undefined;
}

export function parseTrendQuery(userText: string): TrendQuery {
  const days = detectDays(userText);
  const language = detectLanguage(userText);
  const keyword = detectKeyword(userText, language?.label);

  const filters = [keyword, language?.label].filter(Boolean);
  const titleCore =
    filters.length > 0
      ? `${periodTitle(days)} ${filters.join(' ')}`
      : periodTitle(days);

  return {
    days,
    title: `${titleCore} 数据榜`,
    summary: `${periodLabel(days)}活跃仓库${filters.length ? ` · ${filters.join(' / ')}` : ''}`,
    language: language?.code,
    keyword,
  };
}
