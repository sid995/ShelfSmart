// app/inventory/InventoryList.tsx

'use client'

import { InventoryItem } from "@/lib/firestoreApi";

interface InventoryListProps {
  items: InventoryItem[];
}

export function InventoryList({ items }: InventoryListProps) {
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
                  Created: {item.creationDate.toLocaleDateString()}
                </p>
                {item.expiryDate && (
                  <p className="text-sm text-gray-500">
                    Expires: {item.expiryDate.toLocaleDateString()}
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