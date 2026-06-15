import type { TrendRepo } from '../types';
import type { TrendQuery } from './parseTrendQuery';

interface GitHubSearchItem {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  html_url: string;
  pushed_at: string;
}

interface GitHubSearchResponse {
  items: GitHubSearchItem[];
  total_count: number;
}

export interface FetchTrendingOptions {
  days?: number;
  language?: string;
  keyword?: string;
  githubToken?: string;
  limit?: number;
}

function daysAgoDate(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

function computeScore(item: GitHubSearchItem): number {
  return (
    item.stargazers_count * 1 +
    item.forks_count * 0.3 +
    item.watchers_count * 0.2
  );
}

function buildSearchQuery(options: FetchTrendingOptions): string {
  const since = daysAgoDate(options.days ?? 7);
  const parts = [`pushed:>${since}`, 'stars:>20'];

  if (options.language) {
    parts.push(`language:${options.language}`);
  }

  if (options.keyword?.trim()) {
    parts.push(options.keyword.trim());
  }

  return parts.join(' ');
}

export async function fetchTrendingRepos(
  options: FetchTrendingOptions = {},
): Promise<TrendRepo[]> {
  const limit = options.limit ?? 20;
  const query = encodeURIComponent(buildSearchQuery(options));
  const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=${Math.min(limit, 30)}`;

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (options.githubToken?.trim()) {
    headers.Authorization = `Bearer ${options.githubToken.trim()}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      response.status === 403
        ? 'GitHub API 限流，请稍后再试或填写 GitHub Token'
        : `GitHub 数据获取失败 (${response.status}): ${detail.slice(0, 120)}`,
    );
  }

  const data = (await response.json()) as GitHubSearchResponse;

  return data.items
    .map((item) => ({
      fullName: item.full_name,
      description: item.description ?? '暂无简介',
      stars: item.stargazers_count,
      forks: item.forks_count,
      watchers: item.watchers_count,
      language: item.language,
      url: item.html_url,
      pushedAt: item.pushed_at,
      score: computeScore(item),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
}

export async function fetchWeeklyTrendingRepos(
  githubToken?: string,
  limit = 20,
): Promise<TrendRepo[]> {
  return fetchTrendingRepos({ days: 7, githubToken, limit });
}

export function formatReposForPrompt(
  repos: TrendRepo[],
  query: TrendQuery,
): string {
  return JSON.stringify(
    {
      title: query.title,
      summary: query.summary,
      items: repos.map((repo) => ({
        rank: repo.rank,
        name: repo.fullName,
        stars: repo.stars,
        forks: repo.forks,
        language: repo.language,
        score: Math.round(repo.score),
        description: repo.description,
        url: repo.url,
      })),
    },
    null,
    2,
  );
}
