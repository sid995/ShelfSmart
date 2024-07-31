'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Item } from '@/utils/firebaseUtils';
import ItemImage from './ItemImage';

interface EditItemFormProps {
  item: Item;
  onSubmit: (formData: FormData) => Promise<{ success?: boolean; error?: string }>;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ item, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const result = await onSubmit(formData);
      if (result.success) {
        router.push('/items');
      } else if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageName(file ? file.name : null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Item Name"
        name="name"
        required
        margin="normal"
        defaultValue={item.name}
      />
      <TextField
        fullWidth
        label="Quantity"
        name="quantity"
        type="number"
        required
        margin="normal"
        defaultValue={item.quantity}
      />
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Current Image:
        </Typography>
        <ItemImage src={item.imageUrl ?? ""} alt={item.name} width={200} height={200} />
      </Box>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        fullWidth
        sx={{ mt: 2, mb: 1 }}
      >
        Upload New Image
        <input
          type="file"
          name="image"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </Button>
      {imageName && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          New file selected: {imageName}
        </Typography>
      )}
      {!imageName && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          Current image: {item.imageUrl}
        </Typography>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => router.back()} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Update Item'}
        </Button>
      </Box>
    </Box>
  );
};

export default EditItemForm;