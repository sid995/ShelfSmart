'use client';

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from 'next/navigation';
import { signInWithGoogle } from '@/utils/auth';

const SignInContent: React.FC = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign in to SmartShelf
        </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleSignIn}
          sx={{ mt: 2 }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default SignInContent;