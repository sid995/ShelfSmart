'use client';

import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to your Dashboard, {user.displayName}
      </Typography>
      <Button variant="contained" onClick={signOut}>
        Sign Out
      </Button>
    </Box>
  );
};