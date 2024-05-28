import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function Teacher() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          Mi aplicación React
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'© '}
          {new Date().getFullYear()}
          {' Tu nombre o tu compañía.'}
        </Typography>
      </Container>
    </Box>
  );
}

export default Teacher;