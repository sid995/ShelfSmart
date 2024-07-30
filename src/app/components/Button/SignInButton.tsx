'use client';
import { useRouter } from 'next/navigation';
import { app } from '@/utils/firebaseConfig';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@mui/material';

export function SignInButton() {
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signIn();
      router.push('/');
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={handleSignIn}
    >
      Sign In with Google
    </Button>
  );
}