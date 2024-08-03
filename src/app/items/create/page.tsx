import AddItemForm from '@/app/ui/Items/CreateForm';
import { cookies } from 'next/headers';

export default function CreateItemPage() {
  async function handleAddItem(formData: FormData) {
    'use server'

    return { success: true, error: undefined };

    // const cookieStore = cookies();
    // const token = cookieStore.get('auth_token')?.value;

    // let userId: string | undefined;

    // if (token) {
    //   try {
    //     const decodedToken = await adminAuth.verifyIdToken(token);
    //     userId = decodedToken.uid;
    //   } catch (error) {
    //     console.error('Error verifying token:', error);
    //     return { success: false, error: 'Authentication failed' };
    //   }
    // }

    // const name = formData.get('name') as string;
    // const quantity = parseInt(formData.get('quantity') as string);
    // const imageFile = formData.get('image') as File | null;

    // if (!name || isNaN(quantity) || !quantity) {
    //   return { success: false, error: 'Missing required fields' };
    // }

    // try {
    //   if (imageFile) {
    //     const buffer = await imageFile.arrayBuffer();
    //     await addItem(name, quantity, Buffer.from(buffer), imageFile.type, userId);
    //   } else {
    //     await addItem(name, quantity, undefined, undefined, userId);
    //   }

    //   return { success: true, error: undefined };
    // } catch (error) {
    //   console.error('Error adding item:', error);
    //   return { success: false, error: 'Failed to add item. Please try again.' };
    // }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Add New Item</h1>
      <AddItemForm onSubmit={handleAddItem} />
    </div>
  );
}