/// <reference types="vite/client" />

declare module 'animal-island-ui/style';

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
