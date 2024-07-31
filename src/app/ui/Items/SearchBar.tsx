import { InputAdornment, TextField, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[200],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.grey[300],
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    padding: '9px 14px',
    paddingLeft: '40px', // Make room for the search icon
    fontSize: '0.875rem',
  },
}));

export default function SearchBar({ placeholder, handleSearch, defaultValue }: any) {
  return (
    <StyledTextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      // onChange={(e) => handleSearch(e.target.value)}
      defaultValue={defaultValue}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ position: 'absolute', left: 8 }}>
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      inputProps={{
        'aria-label': 'search',
      }}
    />
  );
}