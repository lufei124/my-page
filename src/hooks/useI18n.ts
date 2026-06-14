/**
 * i18n placeholder — Phase 5: integrate i18next + route prefix /[locale]/
 */
export const defaultLocale = 'zh-CN';

export const supportedLocales = ['zh-CN', 'en'] as const;

export type Locale = (typeof supportedLocales)[number];

export function t(key: string): string {
  return key;
}
