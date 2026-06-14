import { chatWithDeepSeek } from './deepseekChat';

function isMostlyChinese(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return true;
  const chinese = trimmed.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  return chinese / trimmed.length > 0.3;
}

function parseTranslationArray(raw: string, expectedLength: number): string[] | null {
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    const parsed = JSON.parse(cleaned) as unknown;
    if (!Array.isArray(parsed) || parsed.length !== expectedLength) {
      return null;
    }
    return parsed.map((item) => String(item ?? '').trim());
  } catch {
    return null;
  }
}

export async function translateDescriptionsToZh(
  descriptions: string[],
  apiKey: string,
  model: string,
): Promise<string[]> {
  if (descriptions.length === 0) return [];

  const pendingIndexes = descriptions
    .map((text, index) => ({ text, index }))
    .filter(
      ({ text }) =>
        text.trim() &&
        text !== '暂无简介' &&
        !isMostlyChinese(text),
    );

  if (pendingIndexes.length === 0) {
    return descriptions;
  }

  const payload = pendingIndexes.map(({ text }) => text);

  try {
    const reply = await chatWithDeepSeek({
      apiKey,
      model,
      messages: [
        {
          role: 'system',
          content:
            '将 GitHub 仓库简介翻译成简洁自然的简体中文。只输出 JSON 字符串数组，顺序与输入一致，不要 markdown 或解释。',
        },
        {
          role: 'user',
          content: JSON.stringify(payload),
        },
      ],
    });

    const translated = parseTranslationArray(reply, payload.length);
    if (!translated) {
      return descriptions;
    }

    const result = [...descriptions];
    pendingIndexes.forEach(({ index }, i) => {
      result[index] = translated[i] || descriptions[index];
    });
    return result;
  } catch {
    return descriptions;
  }
}
