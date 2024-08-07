'use client'

import React, { useEffect } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { toast } from "../../ui/use-toast";
import Image from "next/image"
import { createInventoryItem, updateInventoryItem } from "@/lib/firestoreApi";
import { CurrentSessionType, NewCreatedInventory } from "@/lib/definitions";
import { Timestamp } from "firebase/firestore";
import { uploadImage } from "@/lib/storage";

interface ItemFormProps {
  session?: CurrentSessionType;
  initialData?: NewCreatedInventory;
}

const ItemForm = ({ session, initialData }: ItemFormProps) => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageSrc || null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setQuantity(initialData.quantity.toString());
      setExpiryDate(initialData.expiryDate ? new Date(initialData.expiryDate.seconds * 1000).toISOString().split('T')[0] : '');
      setImagePreview(initialData.imageSrc);
    }

    return () => {
      setName('');
      setQuantity('');
      setExpiryDate('');
      setImage(null);
      setImagePreview(null);
    };
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let imageSrc = initialData?.imageSrc || '';
    if (image) {
      imageSrc = await uploadImage(image);
    }

    const itemData = {
      name,
      quantity: Number(quantity),
      expiryDate: expiryDate ? Timestamp.fromDate(new Date(expiryDate)) : null,
      imageSrc
    };

    try {
      if (initialData) {
        await updateInventoryItem(initialData.id!, itemData);
        toast({
          description: "Item updated successfully",
        });
      } else {
        await createInventoryItem(session!.user.id, itemData);
        toast({
          description: "Item added successfully",
        });
      }
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast({
        description: "Failed to save item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm text-gray-800 hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Go to dashboard
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Add New Item</h1>
      <div className="flex flex-row flex-auto w-4/5">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md w-1/2 pr-1"
        >
          <div>
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : (initialData ? 'Update Item' : 'Add Item')}
          </Button>
        </form>
        <div className="flex flex-col flex-auto pl-2 max-w-[300px]">
          <Label htmlFor="image">Item Image</Label>
          <div className="mt-2">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
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
          {imagePreview && (
            <div className="mt-4 w-full object-contain">
              <Image
                src={imagePreview}
                alt="Preview"
                width={200}
                height={200}
                className="rounded-md mx-auto object-fit"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemForm