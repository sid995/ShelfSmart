'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Item } from '@/utils/firebaseUtils';
import Link from 'next/link';
import SearchBar from './SearchBar';

interface ItemsProps {
  initialItems: Item[];
}

const Items: React.FC<ItemsProps> = ({ initialItems }) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    // Implement add item logic
    console.log('Add item clicked');
  };

  const handleEditItem = (id: string) => {
    // Implement edit item logic
    console.log('Edit item clicked', id);
  };

  const handleDeleteItem = (id: string) => {
    // Implement delete item logic
    console.log('Delete item clicked', id);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Items
      </h1>
      <Box sx={{ display: 'flex', mb: 4 }}>
        <SearchBar
          placeholder="Search..."
        // handleSearch={(value) => {/* Your search handling logic */}}
        // defaultValue={searchParams.get('query')?.toString()}
        />
        <Button
          component={Link}
          href="/items/create"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddItem}
          sx={{
            ml: 3,
            color: "white",
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Add Item
        </Button>
      </Box>

      <List>
        {filteredItems.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditItem(item.id)} sx={{ mr: 1 }}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {filteredItems.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
          No items found.
        </Typography>
      )}
    </Box>
  );
};

export default Items;