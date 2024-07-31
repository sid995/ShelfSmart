import { Suspense } from 'react';
import { getItems, Item } from '@/utils/firebaseUtils';
import Items from '@/app/ui/Items/ItemsContent';

export default async function DashboardPage() {
  const items = await getItems();

  // const itemsPromise = new Promise<Item[]>((resolve) => {
  //   setTimeout(() => {
  //     resolve(getItems());
  //   }, 2000);
  // });

  // const items: Item[] = await itemsPromise;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Items initialItems={items} />
    </Suspense>
  );
}