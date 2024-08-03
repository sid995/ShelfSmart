import { Items } from "@/app/types/item";
import { db } from "@/config/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function fetchItems(): Promise<Items> {
  const itemsCollection = collection(db, 'items');
  const itemsQuery = query(itemsCollection, orderBy('boughtDate', 'desc'));

  try {
    const querySnapshot = await getDocs(itemsQuery)
    const items: Items = querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        name: doc.data().name,
        quantity: doc.data().quantity,
        expiryDate: doc.data().expiryDate.toDate(),
        boughtDate: doc.data().boughtDate.toDate()
      }
    });
    return items
  } catch (error) {
    console.error('Error fetching items:', error);
    return []
  }
}