// app/utils/firebaseUtils.ts

import { addDoc, collection, CollectionReference, DocumentData, getDocs, query, where } from 'firebase/firestore';
import { db, storage } from '@/config/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export interface Item {
  id: string;
  name: string;
  quantity: number;
  imageUrl?: string;
}

export async function getItems(searchTerm: string = ''): Promise<Item[]> {
  const itemsCollection = collection(db, 'items');
  let q: CollectionReference<DocumentData, DocumentData>;

  if (searchTerm) {
    q = query(itemsCollection, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff')) as CollectionReference<DocumentData, DocumentData>;
  } else {
    q = itemsCollection;
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Item));
}

export async function addItem(name: string, quantity: number, imageFile: File): Promise<Item> {
  try {
    // Upload image to Firebase Storage
    const imageRef = ref(storage, `item-images/${Date.now()}-${imageFile.name}`);
    const snapshot = await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);

    // Add item to Firestore
    const itemsCollection = collection(db, 'items');
    const docRef = await addDoc(itemsCollection, {
      name,
      quantity,
      imageUrl
    });

    return {
      id: docRef.id,
      name,
      quantity,
      imageUrl
    };
  } catch (error) {
    console.error('Error in addItem:', error);
    throw error;
  }
}