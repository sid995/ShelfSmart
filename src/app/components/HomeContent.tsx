'use client'

import { signOutUser } from '@/utils/auth';
import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

type UserProps = {
  uid: string;
  name: string;
  email: string | undefined;
}

interface HomeContentProps {
  user: UserProps | null | undefined;
}

const HomeContent: React.FC<HomeContentProps> = ({ user }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/signin');
  };

  if (!user) {
    return <div>Loading...</div>; // or a loading indicator if appropriate
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to SmartShelf
        </Typography>
        <Typography variant="h6" gutterBottom>
          Logged in as: {user?.name}
        </Typography>
        <Button variant="contained" onClick={handleSignOut} sx={{ mt: 2 }}>
          Sign Out
        </Button>
      </Box>
    </Container>
  );
};

export default HomeContent;