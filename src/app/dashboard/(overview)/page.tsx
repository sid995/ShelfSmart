import { InventoryList } from "@/components/blocks/dashboard/Inventory";
import { getInventoryItems, InventoryItem } from "@/lib/firestoreApi";
import { Suspense } from "react";

// export const revalidate = 3600;

export default async function Page() {
  const inventoryItems: InventoryItem[] = await getInventoryItems();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Inventory</h1>
        <InventoryList items={inventoryItems} />
      </div>
    </Suspense>
  )
}