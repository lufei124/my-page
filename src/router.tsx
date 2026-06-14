import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Loading } from 'animal-island-ui';
import { IslandLayout } from '@/components/layout/IslandLayout';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ProjectsPage = lazy(() => import('@/features/projects/pages/ProjectsPage'));
const ProjectDetailPage = lazy(
  () => import('@/features/projects/pages/ProjectDetailPage'),
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
        path: 'projects',
        element: (
          <LazyPage>
            <ProjectsPage />
          </LazyPage>
        ),
      },
      {
        path: 'projects/:slug',
        element: (
          <LazyPage>
            <ProjectDetailPage />
          </LazyPage>
        ),
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
