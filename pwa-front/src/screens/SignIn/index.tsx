import React from 'react';
import {
  Button,
  Card, Stack, TextField, Typography,
} from '@mui/material';
import Colors from '../../constants/colors.constants';

function SignIn() {
  return (
    <Stack width="100%" height="100vh" justifyContent="center" alignItems="center">
      <Typography fontWeight={700} fontSize="50px">
        Add Title here
      </Typography>
      <Card elevation={5} sx={{ borderRadius: '20px', p: '20px', marginTop: '2rem' }}>
        <Typography fontWeight={500} fontSize="25px" pb="10px">Sign in:</Typography>
        <Stack width="23em" p="10px" spacing={4}>
          <TextField
            variant="outlined"
            type="text"
            label="Username"
            InputLabelProps={{ sx: { color: Colors.primary } }}
            required
            placeholder="Enter your username"
            size="small"
          />
          <TextField
            variant="outlined"
            type="password"
            label="Password"
            required
            InputLabelProps={{ sx: { color: Colors.primary } }}
            placeholder="Enter your password"
            size="small"
          />
        </Stack>
        <Stack pt="20px" alignItems="center">
          <Button>Login</Button>
        </Stack>
      </Card>
    </Stack>
  );
}

export default SignIn;
