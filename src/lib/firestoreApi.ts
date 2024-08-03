import { adminDb } from "@/config/firebaseAdminConfig";

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  creationDate: Date;
  expiryDate?: Date;
}


export async function getInventoryItems(limitCount: number = 40): Promise<InventoryItem[]> {
  const inventoryRef = adminDb.collection('inventory');
  const q = inventoryRef.orderBy('creationDate', 'desc').limit(limitCount);

  const querySnapshot = await q.get();

  return querySnapshot.docs.map((doc: { data: () => any; id: any; }) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      quantity: data.quantity,
      creationDate: data.creationDate.toDate(),
      expiryDate: data.expiryDate ? data.expiryDate.toDate() : undefined
    } as InventoryItem;
  });
}