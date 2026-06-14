export interface TrendRepo {
  rank: number;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  language: string | null;
  url: string;
  pushedAt: string;
  score: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'error';
  content: string;
}
