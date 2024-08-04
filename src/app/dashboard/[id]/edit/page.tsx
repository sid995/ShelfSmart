import ItemForm from "@/components/blocks/dashboard/ItemForm";
import { getServerSession } from "@/lib/auth/auth-server";
import { getInventoryItem } from "@/lib/firestoreApi";
import { redirect } from "next/navigation";

export default async function EditItemPage({ params }: { params: { id: string } }) {
  const [item, currentSession = null] = await Promise.all([
    getInventoryItem(params.id),
    getServerSession(),
  ])

  if (!currentSession || !currentSession.user) {
    redirect('/signin');
  }


  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div>
      <h1>Edit Item</h1>
      <ItemForm initialData={item} />
    </div>
  );
}