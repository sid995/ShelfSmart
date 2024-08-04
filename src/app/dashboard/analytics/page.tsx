import { ExpiryAnalysisChartSkeleton, ExpiryAnalysisChart } from "@/components/blocks/analytics/ExpiryAnalysisChart";
import { ItemsWithImagesChartSkeleton, ItemsWithImagesChart } from "@/components/blocks/analytics/ItemsWithImagesChart";
import { RecentlyAddedCardSkeleton, RecentlyAddedCard } from "@/components/blocks/analytics/RecentlyAddedCard";
import { StockLevelsChartSkeleton, StockLevelsChart } from "@/components/blocks/analytics/StockLevelsChart";
import { AddItemButton } from "@/components/blocks/button/Buttons";
import SingleCard from "@/components/blocks/card/SingleCard";
import { SkeletonCards } from "@/components/blocks/card/skeleton";
import { getServerSession } from "@/lib/auth/auth-server";
import { CurrentSessionType } from "@/lib/definitions";
import { getAnalyticsData } from "@/lib/firestoreApi";
import { Suspense } from "react";


export default async function AnalyticsDashboard() {
  const currentSession: CurrentSessionType = await getServerSession();

  const data = await getAnalyticsData(currentSession!.user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Inventory Analytics</h1>
        <AddItemButton href="/dashboard/create" />
      </div>

      <div className="mb-8 grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Suspense fallback={<SkeletonCards />}>
          <SingleCard title="Total Items" quantity={data.totalItems} />
          <SingleCard title="Total Recipes" quantity={data.totalRecipes} />
          <SingleCard title="Expiring Soon" quantity={data.soonExpiring} />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<ExpiryAnalysisChartSkeleton />}>
          <ExpiryAnalysisChart data={data.expiryData} />
        </Suspense>

        <Suspense fallback={<StockLevelsChartSkeleton />}>
          <StockLevelsChart data={data.stockLevels} />
        </Suspense>

        <Suspense fallback={<RecentlyAddedCardSkeleton />}>
          <RecentlyAddedCard items={data.recentlyAdded} />
        </Suspense>

        <Suspense fallback={<ItemsWithImagesChartSkeleton />}>
          <ItemsWithImagesChart data={data.itemsWithImages} />
        </Suspense>
      </div>
    </div>
  );
}