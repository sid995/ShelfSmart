'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
// import { deleteItem, Item } from '@/utils/firebaseUtils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash, Plus } from 'lucide-react';
import ItemImage from './ItemImage';

interface ItemsProps {
  initialItems: {}[];
  // initialItems: Item[];
}

const Items: React.FC<ItemsProps> = ({ initialItems }) => {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditItem = (id: string) => {
    router.push(`/items/${id}/edit`);
  };

  const handleDeleteClick = (item: any) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        // await deleteItem(itemToDelete.id);
        setItems(items.filter((item: any) => item.id !== itemToDelete.id));
        setDeleteDialogOpen(false);
        setItemToDelete(null);
      } catch (error) {
        console.error("Error deleting item:", error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="mb-4 text-xl md:text-2xl font-bold">Items</h1>
      <div className="flex mb-4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow"
        />
        <Button asChild className="ml-3 whitespace-nowrap">
          <Link href="/items/create">
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Link>
        </Button>
      </div>

      <ul className="divide-y divide-gray-200">
        {filteredItems.map((item: any) => (
          <li key={item.id} className="py-4 flex items-center">
            <ItemImage src={item.imageUrl ?? ""} alt={item.name} width={50} height={50} />
            <div className="ml-4 flex-grow">
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div>
              <Button variant="ghost" size="icon" onClick={() => handleEditItem(item.id)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(item)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {filteredItems.length === 0 && (
        <p className="mt-4 text-center text-gray-500">No items found.</p>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {itemToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Items;