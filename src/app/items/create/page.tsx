import { Box, Typography } from '@mui/material';
import { redirect } from 'next/navigation';
import { addItem } from '@/utils/firebaseUtils';
import AddItemForm from '@/app/ui/Items/create-form';

export default function CreateItemPage() {
  async function handleAddItem(formData: FormData) {
    'use server'

    const name = formData.get('name') as string;
    const quantity = parseInt(formData.get('quantity') as string);
    const imageFile = formData.get('image') as File;

    if (!name || !quantity || !imageFile) {
      throw new Error('Missing required fields');
    }

    try {
      await addItem(name, quantity, imageFile);
      return { success: true };
    } catch (error) {
      console.error('Error adding item:', error);
      return { error: 'Failed to add item. Please try again.' };
      // Handle the error appropriately
      // You might want to return an error message to display to the user
    }
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Item
      </Typography>
      <AddItemForm onSubmit={handleAddItem} />
    </Box>
  );
}