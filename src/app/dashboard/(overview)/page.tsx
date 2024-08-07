import { AddItemButton } from "@/components/blocks/button/Buttons";
import InventoryList from "@/components/blocks/dashboard/Inventory";
import Search from "@/components/blocks/dashboard/Search";
import { InventoryListSkeleton } from "@/components/blocks/skeletons/InventoryListSkeletion";
import { getServerSession } from "@/lib/auth/auth-server";
import { CurrentSessionType } from "@/lib/definitions";
import { Suspense } from "react";

export default async function Page({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
  }
}) {
  const currentSession: CurrentSessionType = await getServerSession();

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Suspense fallback={<InventoryListSkeleton />}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Inventory</h1>
        <div className="flex w-1/2 mb-6">
          <Search placeholder="Search items..." />
          <AddItemButton href="/dashboard/create" />
        </div>
        <Suspense fallback={<div>Inventory loading</div>}>
          <InventoryList
            session={currentSession}
            query={query}
            page={currentPage}
          />
        </Suspense>
      </div>
    </Suspense>
  )
}