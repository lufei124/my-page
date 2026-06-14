import { createContext, useContext, useEffect, type ReactNode } from 'react';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

function getSeason(month: number): Season {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

const SeasonalThemeContext = createContext<Season>('spring');

export function SeasonalThemeProvider({ children }: { children: ReactNode }) {
  const season = getSeason(new Date().getMonth() + 1);

  useEffect(() => {
    document.body.dataset.season = season;
  }, [season]);

  return (
    <SeasonalThemeContext.Provider value={season}>
      {children}
    </SeasonalThemeContext.Provider>
  );
}

export function useSeasonalTheme() {
  return useContext(SeasonalThemeContext);
}
