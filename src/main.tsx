import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'animal-island-ui/style';
import { router } from './router';
import { SeasonalThemeProvider } from './hooks/SeasonalTheme';
import './styles/global.css';
import './styles/scroll.css';
import './styles/seasonal.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <SeasonalThemeProvider>
        <RouterProvider router={router} />
      </SeasonalThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
