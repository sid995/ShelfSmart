import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function SingleCard({ title, quantity }: { title: string; quantity: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{quantity}</p>
      </CardContent>
    </Card>
  )
}