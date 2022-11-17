import { alpha, createTheme } from '@mui/material';
import palette from './palette.theme';
import fonts from '../assets/fonts';
import Colors from '../constants/colors.constants';

const theme = createTheme({
  palette,
  typography: {
    fontFamily: 'YoutubeSans, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `${fonts}
      html {
          height: 100%;
          -webkit-font-smoothing: auto;
        }
        body {
          height: 100%;
          scrollbar-color: ${Colors.primary} ${alpha(Colors.primary, 0.1)};
          scrollbar-width: thin;
        }
        .scrollable {
          mask-image: linear-gradient(
            to bottom,
            transparent,
            white 20px,
            white calc(100% - 20px),
            transparent
          );
        }
        .scrollable-horizontal {
          mask-image: linear-gradient(
            to right,
            transparent,
            white 20px,
            white calc(100% - 20px),
            transparent
          );
        }
        div#root {
          height: 100%;
        }
        *::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        *::-webkit-scrollbar-track {
          background-color: ${alpha(Colors.primary, 0.1)};
          border-radius: 4px;
          margin: 15px;
        }
        *::-webkit-scrollbar-thumb {
          background-color: ${Colors.primary};
          border-radius: 4px;`,
    },
  },
});

export default theme;
