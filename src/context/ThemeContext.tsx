'use client';

import { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme, CssBaseline, PaletteMode } from '@mui/material';

type ThemeContextType = {
  toggleColorMode: () => void;
  mode: string;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProviderWrapper: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              // Light mode palette
              primary: { main: '#4CAF50' },
              secondary: { main: '#FFA000' },
              background: { default: '#F5F5F5', paper: '#FFFFFF' },
              text: { primary: '#212121', secondary: '#757575' },
            }
            : {
              // Dark mode palette
              primary: { main: '#81C784' },
              secondary: { main: '#FFD54F' },
              background: { default: '#121212', paper: '#1E1E1E' },
              text: { primary: '#FFFFFF', secondary: '#B0BEC5' },
            }),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};