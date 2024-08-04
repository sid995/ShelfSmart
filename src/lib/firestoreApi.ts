import { AddItemResult, InventoryItem, NewCreatedInventory } from "./definitions";
import { analytics, db as clientDb, logEvent } from "@/config/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, endAt, getDoc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc, where } from "@firebase/firestore";
import { Timestamp } from "@firebase/firestore";


const ITEMS_PER_PAGE = 10;

// async function getLastVisibleDoc(baseQuery: any, page: number) {
//   const lastVisibleDocQuery = query(baseQuery, limit((page - 1) * ITEMS_PER_PAGE));
//   const snapshot = await getDocs(lastVisibleDocQuery);
//   return snapshot.docs[snapshot.docs.length - 1];
// }

export async function getInventoryItems(userId: string, searchQuery: string, page: number = 1): Promise<NewCreatedInventory[]> {
  try {
    const inventoryRef = collection(clientDb, 'inventory');
    let q = query(
      inventoryRef,
      where('userId', '==', userId),
      orderBy('creationDate', 'desc')
    );

    if (searchQuery) {
      q = query(q, where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff'));
    }

    // q = query(q, limit(ITEMS_PER_PAGE));

    // if (page > 1) {
    //   const lastVisibleDoc = await getLastVisibleDoc(q, page);
    //   if (lastVisibleDoc) {
    //     q = query(q, startAfter(lastVisibleDoc));
    //   }
    // }

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
      lowerCaseName: itemData.name.toLowerCase(),
    } as NewCreatedInventory;

    await addDoc(inventoryRef, newItem);

    if (typeof window !== 'undefined') {
      logEvent(analytics, 'item_added', {
        item_name: itemData.name,
        has_image: !!itemData.imageSrc,
        has_expiry: !!itemData.expiryDate,
      });
    }

    return { success: true }
  } catch (error) {
    console.error('Error adding inventory item:', error);
    return { success: false, error: error instanceof Error ? error : new Error('Unknown error occurred') };
  }
}

export async function deleteInventoryItem(itemId: string): Promise<boolean> {
  console.log("deleteInventoryItem: ", itemId)
  try {
    await deleteDoc(doc(clientDb, 'inventory', itemId));
    return true;
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    return false;
  }
}

export async function updateInventoryItem(itemId: string, updateData: Partial<NewCreatedInventory>): Promise<boolean> {
  try {
    await updateDoc(doc(clientDb, 'inventory', itemId), updateData);
    return true;
  } catch (error) {
    console.error('Error updating inventory item:', error);
    return false;
  }
}

export async function getInventoryItem(itemId: string): Promise<NewCreatedInventory | null> {
  const itemRef = doc(clientDb, 'inventory', itemId);
  const itemSnap = await getDoc(itemRef);

  if (itemSnap.exists()) {
    return { id: itemSnap.id, ...itemSnap.data() } as NewCreatedInventory;
  } else {
    return null;
  }
}

export async function getAnalyticsData() {
  const itemsRef = collection(clientDb, 'inventory');
  const snapshot = await getDocs(itemsRef);

  const totalItems = snapshot.size;

  const now = Timestamp.now();
  const oneWeekLater = Timestamp.fromDate(new Date(now.toDate().getTime() + 7 * 24 * 60 * 60 * 1000));
  let soonExpiring = 0;
  let laterExpiring = 0;
  let noExpiry = 0;

  const stockLevels: { name: string; quantity: number }[] = [];
  const oneWeekAgo = Timestamp.fromDate(new Date(now.toDate().getTime() - 7 * 24 * 60 * 60 * 1000));
  const recentItems: string[] = [];

  let withImage = 0;
  let withoutImage = 0;

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.expiryDate) {
      if (data.expiryDate < oneWeekLater) soonExpiring++;
      else laterExpiring++;
    } else {
      noExpiry++;
    }

    stockLevels.push({ name: data.name, quantity: data.quantity });

    if (data.creationDate > oneWeekAgo) {
      recentItems.push(data.name);
    }

    if (data.imageSrc) withImage++;
    else withoutImage++;
  });

  stockLevels.sort((a, b) => b.quantity - a.quantity);

  return {
    totalItems,
    expiryData: [
      { name: 'Expiring Soon', value: soonExpiring },
      { name: 'Expiring Later', value: laterExpiring },
      { name: 'No Expiry', value: noExpiry }
    ],
    stockLevels: [...stockLevels.slice(0, 5), ...stockLevels.slice(-5).reverse()],
    recentlyAdded: recentItems,
    itemsWithImages: [
      { name: 'With Image', value: withImage },
      { name: 'Without Image', value: withoutImage }
    ]
  };
}

export async function saveRecipe(recipeData: { userId: string; title: string; description: string }) {
  try {
    const recipesRef = collection(clientDb, 'recipes');
    const docRef = await addDoc(recipesRef, {
      ...recipeData,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id };
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw error;
  }
}

export async function getLatestUserRecipes(userId: string, limitCount: number = 5) {
  const recipesRef = collection(clientDb, 'recipes');
  const q = query(
    recipesRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    // Add other fields as needed
  }));
}

export async function getRecipeById(recipeId: string) {
  try {
    const recipeRef = doc(clientDb, 'recipes', recipeId);
    const recipeSnap = await getDoc(recipeRef);

    if (recipeSnap.exists()) {
      const data = recipeSnap.data();
      return {
        id: recipeSnap.id,
        title: data.title,
        description: data.description
      };
    } else {
      throw new Error('Recipe not found');
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
}

export async function deleteRecipe(recipeId: string) {
  try {
    const recipeRef = doc(clientDb, 'recipes', recipeId);
    await deleteDoc(recipeRef);
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
}