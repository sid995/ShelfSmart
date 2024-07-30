import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#FFA000',
    },
    error: {
      main: '#D32F2F',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    success: {
      main: '#388E3C',
    },
    divider: '#BDBDBD',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#81C784', // A lighter green for better contrast in dark mode
    },
    secondary: {
      main: '#FFD54F', // A lighter amber for better visibility
    },
    error: {
      main: '#EF5350', // A slightly lighter red
    },
    background: {
      default: '#121212', // A dark grey, typical for dark modes
      paper: '#1E1E1E', // A slightly lighter dark grey for cards and elevated surfaces
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    },
    success: {
      main: '#66BB6A', // A lighter green for success indicators
    },
    divider: '#424242', // A dark grey for subtle separations
  },
});