import InventoryList from "@/components/blocks/dashboard/Inventory";
import Search from "@/components/blocks/dashboard/Search";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/auth/auth-server";
import { CurrentSessionType, NewCreatedInventory } from "@/lib/definitions";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
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

  if (!currentSession || !currentSession.user) {
    redirect('/signin');
  }

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Suspense>
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