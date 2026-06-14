import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Loading } from 'animal-island-ui';
import { IslandLayout } from '@/components/layout/IslandLayout';

const HomePage = lazy(() => import('@/pages/HomePage'));
const Last30DaysPage = lazy(
  () => import('@/features/last30days/pages/Last30DaysPage'),
);
const GithubTrendAgentPage = lazy(
  () => import('@/features/github-trend-agent/pages/GithubTrendAgentPage'),
);
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading active />}>{children}</Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <IslandLayout />,
    children: [
      {
        index: true,
        element: (
          <LazyPage>
            <HomePage />
          </LazyPage>
        ),
      },
      {
        path: 'projects/github-trend-agent',
        element: (
          <LazyPage>
            <GithubTrendAgentPage />
          </LazyPage>
        ),
      },
      {
        path: 'projects/last30days',
        element: (
          <LazyPage>
            <Last30DaysPage />
          </LazyPage>
        ),
      },
      {
        path: 'projects',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'projects/:slug',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'about',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'contact',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'blog',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'blog/*',
        element: <Navigate to="/" replace />,
      },
      {
        path: '*',
        element: (
          <LazyPage>
            <NotFoundPage />
          </LazyPage>
        ),
      },
    ],
  },
]);
