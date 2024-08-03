import { Suspense } from 'react';
import Items from '@/app/ui/Items/ItemsContent';
import { fetchItems } from '@/lib/fetchItems';
import { Items as ItemsType } from "@/app/types/item"

export default async function DashboardPage() {
  const items: ItemsType = await fetchItems();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Items initialItems={items} />
    </Suspense>
  );
}