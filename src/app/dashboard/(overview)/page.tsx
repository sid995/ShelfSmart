import { InventoryList } from "@/components/blocks/dashboard/Inventory";
import Search from "@/components/blocks/dashboard/Search";
import { Button } from "@/components/ui/button";
import { NewCreatedInventory } from "@/lib/definitions";
import { getInventoryItems } from "@/lib/firestoreApi";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const inventoryItems: NewCreatedInventory[] = await getInventoryItems(query);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Inventory</h1>
        <div className="flex w-1/2 mb-6">
          <Search placeholder="Search items..." />
          <Button asChild className="bg-primary text-primary-foreground">
            <Link href="/dashboard/create" prefetch={false}>
              <Plus className="w-4 h-4 mr-2" /> Add Item
            </Link>
          </Button>
        </div>
        <InventoryList items={inventoryItems} />
      </div>
    </Suspense>
  )
}