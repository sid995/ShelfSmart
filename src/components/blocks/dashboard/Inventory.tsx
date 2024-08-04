import { CurrentSessionType, NewCreatedInventory } from "@/lib/definitions";
import { getInventoryItems } from "@/lib/firestoreApi";
import ListItem from "./ListItem";

export default async function InventoryList({ session, query, page }: { session: CurrentSessionType, query: string, page: number }) {
  const userId = session!.user.id;
  const items: NewCreatedInventory[] = await getInventoryItems(userId, query, page);

  return (
    <div>
      {items.length === 0 ? (
        <p className="text-gray-600">Your inventory is empty.</p>
      ) : (
        <>
          <p className="text-gray-600 mb-4">Here are the items in your inventory:</p>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <ListItem key={item.id} item={item} />
            ))}
          </ul>
        </>
      )}
    </div >
  );
}
