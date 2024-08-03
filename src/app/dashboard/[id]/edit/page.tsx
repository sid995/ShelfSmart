// import { getItem, updateItem } from '@/utils/firebaseUtils';
import { notFound } from 'next/navigation';
import EditItemForm from '@/app/ui/Items/EditForm';

export default async function EditItemPage({ params }: { params: { id: string } }) {
  // const item = await getItem(params.id);
  const item = {}
  // if (!item) {
  //   notFound();
  // }

  async function handleUpdateItem(formData: FormData) {
    'use server'

    const name = formData.get('name') as string;
    const quantity = parseInt(formData.get('quantity') as string);
    const imageFile = formData.get('image') as File | null;

    if (!name || !quantity) {
      return { error: 'Missing required fields' };
    }

    try {
      // await updateItem(params.id, name, quantity, imageFile || undefined);
      return { success: true };
    } catch (error) {
      console.error('Error updating item:', error);
      return { error: 'Failed to update item. Please try again.' };
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Item</h1>
      <EditItemForm item={item} onSubmit={handleUpdateItem} />
    </div>
  );
}