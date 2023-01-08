import React, { useLayoutEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import getThemeCreated from 'styles/theme';
import {
  ThemeSelectorProvider,
  useContextTheme,
} from 'contexts/ThemeSelectorProvider';
import { useContextUser, UserProvider } from 'contexts/UserProvider';
import AppSelector from 'screens/AppSelector';
import moment from 'moment';

import i18n from 'i18n';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientApi } from 'api/initializers/reactQuery';
import { api } from 'api/initializers/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useQueryMe } from 'api/user';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const accessToken = localStorage.getItem('accessToken');

function Initializer() {
  if (accessToken) api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  const { theme } = useContextTheme();
  const { setUser } = useContextUser();
  const [enabled, setEnabled] = useState(false);
  const [isLoading, setIsloading] = useState(!!accessToken);
  const { t } = useTranslation(['common', 'notification']);

  useQueryMe({
    enabled,
    onSettled: () => setIsloading(false),
    onSuccess: (payload) => {
      setUser({ ...payload });
    },
    retry: false,
  });

  useLayoutEffect(() => {
    const resInterceptor = (response: AxiosResponse) => response.data;

    const errInterceptor = (error: AxiosError<{ message: string }>) => {
      if ((error.response?.status === 401 && error.response?.data?.message === 'Unauthorized')
      || (error.response?.status === 404 && error.response?.data?.message === 'USER_NOT_FOUND')) {
        localStorage.removeItem('accessToken');
        setUser(null);
      } else if (error.response?.data?.message) {
        toast(t(error.response?.data?.message, { ns: 'notification', defaultValue: t('UNKNOW_ERROR', { ns: 'notification' }) }));
      }

      throw (error);
    };

    const interceptor = api.interceptors.response.use(resInterceptor, errInterceptor);
    setEnabled(!!accessToken);

    return () => api.interceptors.response.eject(interceptor);
  }, [setUser, t]);

  return (
    <ThemeProvider theme={getThemeCreated(theme)}>
      <CssBaseline />
      {isLoading ? t('loading') : <AppSelector />}
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
