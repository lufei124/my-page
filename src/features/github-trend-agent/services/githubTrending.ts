import type { TrendRepo } from '../types';

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

function weekAgoDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split('T')[0];
}

function computeScore(item: GitHubSearchItem): number {
  return (
    item.stargazers_count * 1 +
    item.forks_count * 0.3 +
    item.watchers_count * 0.2
  );
}

export async function fetchWeeklyTrendingRepos(
  githubToken?: string,
  limit = 20,
): Promise<TrendRepo[]> {
  const since = weekAgoDate();
  const query = encodeURIComponent(`pushed:>${since} stars:>20`);
  const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=${Math.min(limit, 30)}`;

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (githubToken?.trim()) {
    headers.Authorization = `Bearer ${githubToken.trim()}`;
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

export function formatReposForPrompt(repos: TrendRepo[]): string {
  return JSON.stringify(
    repos.map((repo) => ({
      rank: repo.rank,
      name: repo.fullName,
      stars: repo.stars,
      forks: repo.forks,
      language: repo.language,
      score: Math.round(repo.score),
      description: repo.description,
      url: repo.url,
    })),
    null,
    2,
  );
}
