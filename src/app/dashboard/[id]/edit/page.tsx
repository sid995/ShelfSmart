import ItemForm from "@/components/blocks/dashboard/ItemForm";
import { getInventoryItem } from "@/lib/firestoreApi";

export default async function EditItemPage({ params }: { params: { id: string } }) {
  const item = await getInventoryItem(params.id)

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <ItemForm initialData={item} />
  );
}