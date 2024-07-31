import { Box, Typography } from '@mui/material';
import { addItem } from '@/utils/firebaseUtils';
import AddItemForm from '@/app/ui/Items/CreateForm';
import { cookies } from 'next/headers';
import { adminAuth } from '@/config/firebaseAdminConfig';

export default function CreateItemPage() {
  async function handleAddItem(formData: FormData) {
    'use server'

    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    let userId: string | undefined;

    if (token) {
      try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (error) {
        console.error('Error verifying token:', error);
        // Proceed without userId if token verification fails
      }
    }

    const name = formData.get('name') as string;
    const quantity = parseInt(formData.get('quantity') as string);
    const imageFile = formData.get('image') as File | null;

    if (!name || !quantity) {
      return { success: false, error: 'Missing required fields' };
    }

    try {
      if (imageFile) {
        const buffer = await imageFile.arrayBuffer();
        await addItem(name, quantity, Buffer.from(buffer), imageFile.type, userId);
      } else {
        await addItem(name, quantity, undefined, undefined, userId);
      }

      return { success: true, error: undefined };
    } catch (error) {
      console.error('Error adding item:', error);
      return { success: false, error: 'Failed to add item. Please try again.' };
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