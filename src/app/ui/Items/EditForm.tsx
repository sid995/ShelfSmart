'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload } from "lucide-react";
// import { Item } from '@/utils/firebaseUtils';
import Image from 'next/image';

// interface EditItemFormProps {
//   item: Item;
//   onSubmit: (formData: FormData) => Promise<{ success?: boolean; error?: string }>;
// }

interface EditItemFormProps {
  item: any;
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Item Name</Label>
        <Input id="name" name="name" required defaultValue={item.name} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" name="quantity" type="number" required defaultValue={item.quantity} />
      </div>
      <div className="space-y-2">
        <Label>Current Image:</Label>
        {item.imageUrl && (
          <div className="mt-2">
            <Image src={item.imageUrl} alt={item.name} width={200} height={200} className="rounded-md" />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Upload New Image</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('image')?.click()}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" /> Upload New Image
          </Button>
        </div>
        {imageName ? (
          <p className="text-sm text-gray-500">New file selected: {imageName}</p>
        ) : (
          <p className="text-sm text-gray-500">Current image: {item.imageUrl}</p>
        )}
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Update Item'}
        </Button>
      </div>
    </form>
  );
};

export default EditItemForm;