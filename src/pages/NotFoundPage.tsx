import { Link } from 'react-router-dom';
import { Button, Card, Title } from 'animal-island-ui';

export default function NotFoundPage() {
  return (
    <Card type="dashed">
      <Title size="large">404 — 页面走丢了</Title>
      <p>这只狸猫找不到你要去的岛屿。</p>
      <Link to="/">
        <Button type="primary">返回首页</Button>
      </Link>
    </Card>
  );
}
