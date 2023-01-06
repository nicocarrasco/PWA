import { Fab, Stack, useTheme } from '@mui/material';
import Chat from 'components/Chat';
import { useContextCommu } from 'contexts/CommuProvider';
import useWindowDimensions from 'hooks/useWindowDimensions';
import React, { useEffect, useState } from 'react';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from './Navbar';

type Props = {
  children: React.ReactNode
};

function NavigationWrapper({ children }: Props) {
  const { commuId } = useContextCommu();
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [bottomFabChat, setBottomFabChat] = useState('8px');
  const { width } = useWindowDimensions();
  const theme = useTheme();

  useEffect(() => {
    if (width >= theme.breakpoints.values.lg) {
      setIsChatModalOpen(false);
    }
    if (width < theme.breakpoints.values.sm) {
      setBottomFabChat('64px');
    } else {
      setBottomFabChat('8px');
    }
  }, [width, theme]);

  useEffect(() => {
    const bodyEl = document.querySelector('body');
    if (bodyEl) {
      if (isChatModalOpen) {
        bodyEl.style.overflow = 'hidden';
      } else {
        bodyEl.style.overflow = 'visible';
      }
    }
  }, [isChatModalOpen]);

  return (
    <Stack direction="row" justifyContent={{ sm: 'end', lg: 'center' }}>
      <Stack
        sx={{
          borderRight: { xs: 'none', sm: `1px solid ${theme.palette.grey[300]}` },
          borderTop: { xs: `1px solid ${theme.palette.grey[300]}`, sm: 'none' },
          display: 'flex',
          position: 'fixed',
          left: 0,
          bottom: 0,
          zIndex: 1,
          height: { xs: '56px', sm: '100%' },
          width: { xs: '100%', sm: '25%' },
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: `${theme.palette.background.default}`,
        }}
      >
        <Navbar />
      </Stack>
      <Stack
        sx={{
          position: 'relative',
          zIndex: 0,
          width: { xs: '100%', sm: '75%', lg: '50%' },
        }}
        pb={{ xs: '55px', sm: '0' }}
      >
        {children}
      </Stack>
      {commuId && (
      <Fab
        color="secondary"
        sx={{
          display: { xs: 'flex', lg: 'none' },
          position: 'fixed',
          bottom: bottomFabChat,
          right: '8px',
          zIndex: 1,
        }}
        onClick={() => setIsChatModalOpen(true)}
      >
        <ChatBubbleIcon />
      </Fab>
      )}
      <Stack
        sx={{
          borderLeft: `1px solid ${theme.palette.grey[300]}`,
          width: isChatModalOpen ? '100%' : '25%',
          zIndex: 2,
          backgroundColor: theme.palette.background.default,
          display: { xs: isChatModalOpen ? 'flex' : 'none', lg: 'flex' },
          position: 'fixed',
          right: 0,
          height: '100%',
        }}
      >
        {commuId && (
        <>
          {isChatModalOpen && (
          <ArrowBackIcon
            fontSize="large"
            sx={{
              cursor: 'pointer',
              margin: '8px',
            }}
            onClick={() => setIsChatModalOpen(false)}
          />
          )}
          <Chat commuId={commuId} isChatModalOpen={isChatModalOpen} />
        </>
        )}
      </Stack>
    </Stack>
  );
}

export default NavigationWrapper;
