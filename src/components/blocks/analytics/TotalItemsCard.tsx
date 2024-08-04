import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TotalItemsCard({ totalItems }: { totalItems: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Items</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{totalItems}</p>
      </CardContent>
    </Card>
  )
}

export function TotalItemsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-20" />
      </CardContent>
    </Card>
  )
}