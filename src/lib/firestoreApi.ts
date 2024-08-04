import { AddItemResult, InventoryItem, NewCreatedInventory } from "./definitions";
import { db as clientDb } from "@/config/firebaseConfig";
import { addDoc, collection, getDocs, limit, orderBy, query, startAfter, where } from "@firebase/firestore";
import { Timestamp } from "@firebase/firestore";


const ITEMS_PER_PAGE = 10;

async function getLastVisibleDoc(baseQuery: any, page: number) {
  const lastVisibleDocQuery = query(baseQuery, limit((page - 1) * ITEMS_PER_PAGE));
  const snapshot = await getDocs(lastVisibleDocQuery);
  return snapshot.docs[snapshot.docs.length - 1];
}

export async function getInventoryItems(userId: string, searchQuery: string, page: number = 1): Promise<NewCreatedInventory[]> {
  try {
    console.log("Getting inventory items for user:", userId);
    const inventoryRef = collection(clientDb, 'inventory');
    let q = query(
      inventoryRef,
      where('userId', '==', userId),
      orderBy('creationDate', 'desc'),
    );

    if (searchQuery) {
      q = query(q, where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff'));
    }

    q = query(q, limit(ITEMS_PER_PAGE));

    if (page > 1) {
      const lastVisibleDoc = await getLastVisibleDoc(q, page);
      if (lastVisibleDoc) {
        q = query(q, startAfter(lastVisibleDoc));
      }
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewCreatedInventory));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return [] as NewCreatedInventory[];
  }
}

export async function createInventoryItem(userId: string, itemData: InventoryItem): Promise<AddItemResult> {
  try {
    const inventoryRef = collection(clientDb, 'inventory');


    const newItem = {
      ...itemData,
      userId: userId,
      creationDate: Timestamp.fromDate(new Date()),
    } as NewCreatedInventory;

    await addDoc(inventoryRef, newItem);
    return { success: true }
  } catch (error) {
    console.error('Error adding inventory item:', error);
    return { success: false, error: error instanceof Error ? error : new Error('Unknown error occurred') };
  }
}