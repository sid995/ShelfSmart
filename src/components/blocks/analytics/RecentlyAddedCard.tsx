import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RecentlyAddedCard({ items }: { items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Added Items</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export function RecentlyAddedCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Added Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  )
}