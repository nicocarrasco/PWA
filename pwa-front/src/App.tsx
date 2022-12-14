import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import getThemeCreated from 'styles/theme';
import {
  ThemeSelectorProvider,
  useContextTheme,
} from 'contexts/ThemeSelectorProvider';
import { UserProvider } from 'contexts/UserProvider';
import AppSelector from 'screens/AppSelector';
import moment from 'moment';

import i18n from 'i18n';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientApi } from 'api/initializers/reactQuery';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import useAxiosInterceptors from 'hooks/useAxiosInterceptors';
import useOnlineStatus from 'hooks/useOnlineStatus';

function Initializer() {
  const { theme } = useContextTheme();
  const { t } = useTranslation(['common']);

  // Initialize online status and axios interceptors
  useOnlineStatus();
  const { isFetching } = useAxiosInterceptors();

  return (
    <ThemeProvider theme={getThemeCreated(theme)}>
      <CssBaseline />
      {isFetching ? t('loading') : <AppSelector />}
    </ThemeProvider>

  );
}

function App() {
  moment.locale(i18n.language);

  return (
    <UserProvider>
      <QueryClientProvider client={queryClientApi}>
        <BrowserRouter>
          <ThemeSelectorProvider>
            <Initializer />
          </ThemeSelectorProvider>
        </BrowserRouter>
      </QueryClientProvider>
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
