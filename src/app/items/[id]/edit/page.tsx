import { Box, Typography } from '@mui/material';
import { getItem, updateItem } from '@/utils/firebaseUtils';
import { notFound } from 'next/navigation';
import EditItemForm from '@/app/ui/Items/EditForm';

export default async function EditItemPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id);

  if (!item) {
    notFound();
  }

  async function handleUpdateItem(formData: FormData) {
    'use server'

    const name = formData.get('name') as string;
    const quantity = parseInt(formData.get('quantity') as string);
    const imageFile = formData.get('image') as File | null;

    if (!name || !quantity) {
      return { error: 'Missing required fields' };
    }

    try {
      await updateItem(params.id, name, quantity, imageFile || undefined);
      return { success: true };
    } catch (error) {
      console.error('Error updating item:', error);
      return { error: 'Failed to update item. Please try again.' };
    }
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Item
      </Typography>
      <EditItemForm item={item} onSubmit={handleUpdateItem} />
    </Box>
  );
}