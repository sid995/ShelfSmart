'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Upload } from "lucide-react"

interface AddItemFormProps {
  onSubmit: (formData: FormData) => Promise<{ success: boolean; error: string | undefined }>;
}

export default function AddItemForm({ onSubmit }: AddItemFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  // const [imageName, setImageName] = useState<string | null>(null);
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
        router.push('/dashboard');
      } else if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // setImageName(file ? file.name : null);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Item Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" name="quantity" type="number" required defaultValue={1} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Upload Image</Label>
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
            <Upload className="mr-2 h-4 w-4" /> Upload Image
          </Button>
        </div>
        {/* {imageName && (
          <p className="text-sm text-gray-500">Selected file: {imageName}</p>
        )} */}
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
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Add Item'}
        </Button>
      </div>
    </form>
  );
}