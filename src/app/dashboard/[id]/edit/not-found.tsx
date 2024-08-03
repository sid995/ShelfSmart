import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        Oops! The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        component={Link}
        href="/items"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Go Back to Items
      </Button>
    </Box>
  );
}