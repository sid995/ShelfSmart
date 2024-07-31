'use client';

import { Typography, Button, Box, Paper } from '@mui/material';
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
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Column - Sign In */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            borderRadius: 2,
            maxWidth: '400px',
            width: '90%',
          }}
        >
          <Box sx={{ mb: 3 }}>
            {/* Logo Here */}
          </Box>
          <Typography component="h1" variant="h4" sx={{ mb: 3, color: 'text.primary' }}>
            Sign in to SmartShelf
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<GoogleIcon />}
            onClick={handleSignIn}
            className="hover-scale"
            sx={{
              color: "white",
              py: 1.5,
              textTransform: 'none',
              fontSize: '1.2rem',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Sign in with Google
          </Button>
          <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary', textAlign: 'center' }}>
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </Paper>
      </Box>

      {/* Right Column - Video */}
      <Box
        sx={{
          width: '50%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <video
          poster="/grocery_background_still.jpg"
          autoPlay
          preload='auto'
          loop
          muted
          playsInline
          width="100%"
          height="100%"
          style={{
            objectFit: 'cover',
            position: 'absolute',
            top: -60,
            left: 0,
          }}
        >
          <source src="/grocery_background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Box>
  );
};

export default SignInContent;