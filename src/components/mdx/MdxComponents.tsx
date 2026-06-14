import {
  CodeBlock,
  Collapse,
  Divider,
  Title,
} from 'animal-island-ui';
import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => <Title size="large">{children}</Title>,
  h2: ({ children }) => (
    <Title size="middle" color="app-teal">
      {children}
    </Title>
  ),
  h3: ({ children }) => (
    <Title size="small" color="app-orange">
      {children}
    </Title>
  ),
  hr: () => <Divider type="line-brown" />,
  pre: ({ children }) => {
    const child = children as { props?: { children?: string } };
    const code = child?.props?.children ?? '';
    return <CodeBlock code={String(code)} />;
  },
  Collapse,
};
