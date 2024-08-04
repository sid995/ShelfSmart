import { CurrentSessionType, NewCreatedInventory } from "@/lib/definitions";
import { getInventoryItems } from "@/lib/firestoreApi";

export default async function InventoryList({ session, query, page }: { session: CurrentSessionType, query: string, page: number }) {
  const userId = session!.user.id;
  const items: NewCreatedInventory[] = await getInventoryItems(userId, query, page);

  console.log("Inventory items:", items);

  return (
    <div>
      <p className="text-gray-600 mb-4">Here are the items in your inventory:</p>
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="py-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Created: {item?.creationDate ? new Date(item.creationDate.seconds * 1000).toLocaleDateString() : 'N/A'}
                </p>
                {item?.expiryDate && (
                  <p className="text-sm text-gray-500">
                    Expires: {new Date(item.expiryDate.seconds * 1000).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}