'use client'

import { signInWithGoogle, signOutUser } from '@/utils/auth';
import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import GoogleIcon from "@mui/icons-material/Google";

interface HomeContentProps {
  user: string | null | undefined;
}

const HomeContent: React.FC<HomeContentProps> = ({ user }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/signin');
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.refresh(); // Refresh the page to update the user state
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to SmartShelf
        </Typography>
        {user ? (
          <>
            <Typography variant="h6" gutterBottom>
              Logged in as: {user}
            </Typography>
            <Button variant="contained" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Please sign in to access your inventory.
            </Typography>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={handleSignIn}
              sx={{ mt: 2 }}
            >
              Sign in with Google
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default HomeContent;