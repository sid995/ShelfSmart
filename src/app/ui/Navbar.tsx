'use client'

import { Box, List, ListItem, ListItemIcon, ListItemText, Button, Typography } from "@mui/material"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { signOutUser } from "@/utils/auth";

const navItems = [
  { text: 'Items', icon: <DashboardIcon />, path: '/items' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'Recipe', icon: <MenuBookIcon />, path: '/recipe' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/signin');
  };

  return (
    <Box
      sx={{
        width: { xs: '60px', sm: '200px', md: '250px', lg: '300px' },
        height: '100vh',
        bgcolor: 'background.paper',
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.3s ease',
      }}
    >
      <Box>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          {/* <Image
            src="/logo.png"
            alt="SmartShelf Logo"
            width={60}
            height={60}
            style={{ borderRadius: '50%' }}
          /> */}
          {/* Logo */}
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.text}
              button
              selected={pathname === item.path}
              onClick={() => router.push(item.path)}
              sx={{
                py: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: { xs: '100%', sm: 56 } }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiListItemText-primary': { fontWeight: 500 }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<ExitToAppIcon />}
          onClick={handleSignOut}
          sx={{
            justifyContent: 'flex-start',
            px: 2,
            py: 1,
            display: { xs: 'flex', sm: 'flex' },
            '& .MuiButton-startIcon': {
              mr: { xs: 0, sm: 1 }
            },
            '& .MuiButton-endIcon': {
              ml: 0,
              mr: { xs: 0, sm: 1 }
            }
          }}
        >
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Sign Out</Typography>
        </Button>
      </Box>
    </Box>
  )
}