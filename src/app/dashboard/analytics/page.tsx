import { ExpiryAnalysisChartSkeleton, ExpiryAnalysisChart } from "@/components/blocks/analytics/ExpiryAnalysisChart";
import { ItemsWithImagesChartSkeleton, ItemsWithImagesChart } from "@/components/blocks/analytics/ItemsWithImagesChart";
import { RecentlyAddedCardSkeleton, RecentlyAddedCard } from "@/components/blocks/analytics/RecentlyAddedCard";
import { StockLevelsChartSkeleton, StockLevelsChart } from "@/components/blocks/analytics/StockLevelsChart";
import { TotalItemsCard, TotalItemsSkeleton } from "@/components/blocks/analytics/TotalItemsCard";
import { AddItemButton } from "@/components/blocks/button/Buttons";
import { getAnalyticsData } from "@/lib/firestoreApi";
import { Suspense } from "react";


export default async function AnalyticsDashboard() {
  const data = await getAnalyticsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Inventory Analytics</h1>
        <AddItemButton href="/dashboard/create" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<TotalItemsSkeleton />}>
          <TotalItemsCard totalItems={data.totalItems} />
        </Suspense>

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