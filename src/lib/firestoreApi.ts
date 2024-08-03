import { adminDb } from "@/config/firebaseAdminConfig";
import { AddItemResult, InventoryItem, NewCreatedInventory } from "./definitions";
import { db as clientDb } from "@/config/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";

export async function getInventoryItems(searchString = "", limitCount: number = 10): Promise<NewCreatedInventory[]> {
  console.log("fetching inventory items");
  const inventoryRef = adminDb.collection('inventory');

  // Start with a base query
  let baseQuery = inventoryRef.orderBy('creationDate', 'desc');

  // If there's a search string, add a where clause
  if (searchString) {
    // Convert the search string to lowercase for case-insensitive search
    const lowerSearchString = searchString.toLowerCase();

    // Use the where clause to filter items where the lowercase name contains the search string
    baseQuery = baseQuery.where('nameLower', '>=', lowerSearchString)
      .where('nameLower', '<=', lowerSearchString + '\uf8ff');
  }

  // Apply the limit
  const finalQuery = baseQuery.limit(limitCount);

  const querySnapshot = await finalQuery.get();

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      quantity: data.quantity,
      creationDate: data.creationDate.toDate(),
      expiryDate: data.expiryDate ? data.expiryDate.toDate() : undefined
    } as NewCreatedInventory;
  });
}

export async function addInventoryItem(item: InventoryItem): Promise<AddItemResult> {
  const itemRef = collection(clientDb, 'inventory');
  try {
    await addDoc(itemRef, {
      ...item,
      nameLower: item.name.toLowerCase(),
      creationDate: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error adding inventory item:', error);
    return { success: false, error: error instanceof Error ? error : new Error('Unknown error occurred') };
  }
}