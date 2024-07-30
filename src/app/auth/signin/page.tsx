import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { redirect } from 'next/navigation';
import { SignInButton } from '@/app/components/Button/SignInButton';
import { app } from '@/utils/firebaseConfig';

export default async function SignIn() {
  const auth = getAuth(app);

  // Check if the user is already signed in
  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });

  if (user) {
    redirect('/');
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign in to Pantry Tracker
        </Typography>
        <SignInButton />
      </Box>
    </Container>
  );
}

