'use client'

import { Suspense } from 'react';
import Items from '@/app/ui/Items/ItemsContent';
import { fetchItems } from '@/lib/fetchItems';
import { Items as ItemsType } from "@/app/types/item"
import { useAuth } from '@/app/context/AuthContext';

export default async function DashboardPage() {
  const items: ItemsType = await fetchItems();

  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Items initialItems={items} />
    </Suspense>
  );
}