'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteItem, Item } from '@/utils/firebaseUtils';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { useRouter } from "next/navigation"
import ItemImage from './ItemImage';

interface ItemsProps {
  initialItems: Item[];
}

const Items: React.FC<ItemsProps> = ({ initialItems }) => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditItem = (id: string) => {
    router.push(`/items/${id}/edit`);
  };

  const handleDeleteClick = (item: Item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        await deleteItem(itemToDelete.id);
        setItems(items.filter(item => item.id !== itemToDelete.id));
        setDeleteDialogOpen(false);
        setItemToDelete(null);
      } catch (error) {
        console.error("Error deleting item:", error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
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
          <ListItem key={item.id} divider sx={{ display: 'flex', alignItems: 'center' }}>
            <ItemImage src={item.imageUrl ?? ""} alt={item.name} width={50} height={50} />
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
              sx={{ ml: 2 }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditItem(item.id)} sx={{ mr: 1 }}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(item)}>
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
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {itemToDelete?.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Items;