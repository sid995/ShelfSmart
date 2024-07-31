// app/utils/firebaseUtils.ts

import { adminAuth, adminDb, adminStorage } from '@/config/firebaseAdminConfig';
import { Timestamp } from 'firebase-admin/firestore';

export interface Item {
  id: string;
  userId?: string;
  name: string;
  quantity: number;
  imageUrl?: string;
}

export async function getItems(searchTerm: string = ''): Promise<Item[]> {
  const itemsCollection = adminDb.collection('items');
  let query;

  if (searchTerm) {
    query = itemsCollection
      .where('name', '>=', searchTerm)
      .where('name', '<=', searchTerm + '\uf8ff');
  } else {
    query = itemsCollection;
  }

  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Item));
}

export async function addItem(
  name: string,
  quantity: number,
  imageBuffer?: Buffer,
  imageMimeType?: string,
  userId?: string
): Promise<Item> {
  let imageUrl: string | undefined;

  if (imageBuffer && imageMimeType) {
    const bucket = adminStorage.bucket();
    const file = bucket.file(`item-images/${Date.now()}-${name.replace(/\s+/g, '-')}`);
    await file.save(imageBuffer, {
      metadata: { contentType: imageMimeType }
    });
    imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
  }

  const itemsCollection = adminDb.collection('items');
  const docRef = await itemsCollection.add({
    name,
    quantity,
    ...(userId && { userId }),
    createdAt: Timestamp.now(),
    ...(imageUrl && { imageUrl })
  });

  return {
    id: docRef.id,
    name,
    quantity,
    ...(userId && { userId }),
    ...(imageUrl && { imageUrl })
  };
}

export async function getItem(id: string): Promise<Item | null> {
  const docRef = adminDb.collection('items').doc(id);
  const doc = await docRef.get();

  if (doc.exists) {
    return { id: doc.id, ...doc.data() } as Item;
  } else {
    return null;
  }
}

export async function updateItem(
  id: string,
  name: string,
  quantity: number,
  imageBuffer?: Buffer,
  imageMimeType?: string
): Promise<Item> {
  const itemRef = adminDb.collection('items').doc(id);
  let updateData: Partial<Item> = { name, quantity };

  if (imageBuffer && imageMimeType) {
    const bucket = adminStorage.bucket();
    const file = bucket.file(`item-images/${Date.now()}-${name.replace(/\s+/g, '-')}`);
    await file.save(imageBuffer, {
      metadata: { contentType: imageMimeType }
    });
    updateData.imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
  }

  await itemRef.update(updateData);

  const updatedDoc = await itemRef.get();
  if (!updatedDoc.exists) throw new Error('Failed to retrieve updated item');

  return { id: updatedDoc.id, ...updatedDoc.data() } as Item;
}

export async function deleteItem(id: string): Promise<void> {
  const itemRef = adminDb.collection('items').doc(id);

  // First, get the item to check if it has an image
  const doc = await itemRef.get();
  if (doc.exists) {
    const item = doc.data() as Item;

    // If the item has an image, delete it from storage
    if (item.imageUrl) {
      const bucket = adminStorage.bucket();
      const file = bucket.file(item.imageUrl.split('/').pop()!);
      try {
        await file.delete();
      } catch (error) {
        console.error("Error deleting image:", error);
        // Continue with item deletion even if image deletion fails
      }
    }
  }

  // Delete the item from Firestore
  await itemRef.delete();
}