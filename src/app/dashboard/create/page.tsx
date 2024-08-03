import AddItemForm from '@/app/ui/Items/CreateForm';
import { cookies } from 'next/headers';

export default function CreateItemPage() {
  async function handleAddItem(formData: FormData) {
    'use server'

    return { success: true, error: undefined };
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Add New Item</h1>
      <AddItemForm onSubmit={handleAddItem} />
    </div>
  );
}