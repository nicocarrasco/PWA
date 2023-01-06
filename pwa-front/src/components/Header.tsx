import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

type Props =
{
  isCustomName?: boolean,
  name: string,
  children?: React.ReactNode,
  headerChildren?: React.ReactNode
};

function Header({
  name, isCustomName = false, children, headerChildren,
}:Props) {
  const { t } = useTranslation(['navigation']);

  return (
    <Stack sx={{
      position: 'sticky',
      flex: 1,
      top: 0,
      backgroundColor: 'rgba(31, 32, 40, 0.65)',
      backdropFilter: 'blur(12px)',
      zIndex: 2,
      paddingLeft: '16px',
      paddingTop: '8px',
      paddingBottom: '8px',
    }}
    >
      <Stack alignItems="center" direction="row" spacing={2}>
        {headerChildren}
        <Typography
          variant="h6"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {isCustomName ? name : t(name)}
        </Typography>
      </Stack>
      {children}
    </Stack>
  );
}

export default Header;
