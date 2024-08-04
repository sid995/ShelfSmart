import { Card, CardHeader, CardContent } from "@/components/ui/card"

export const SkeletonCard = () => (
  <Card className="animate-pulse">
    <CardHeader>
      <div className="h-7 bg-gray-200 rounded w-3/4"></div>
    </CardHeader>
    <CardContent>
      <div className="h-9 bg-gray-200 rounded w-1/2"></div>
    </CardContent>
  </Card>
)

export const SkeletonCards = () => (
  <>
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </>
)