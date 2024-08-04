'use client'

import { NewCreatedInventory } from "@/lib/definitions";
import { Package } from "lucide-react";
import Image from "next/image"
import { UpdateItemButton, DeleteItemButton } from "../button/Buttons";

interface ItemProps {
  item: NewCreatedInventory;
}
const ListItem: React.FC<ItemProps> = ({ item }) => {
  return (
    <li key={item.id} className="py-4">
      <div className="flex flex-between items-center w-full">
        <div className="flex justify-between flex-auto">
          <div className="flex items-center">
            <div className="w-16 h-16 mr-4 relative flex items-center justify-center">
              {item.imageSrc ? (
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  layout="fill"
                  className="rounded-md object-cover"
                />
              ) : (
                <Package className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
          </div>
          <div className="text-right pr-8 flex flex-col justify-center">
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
        <div className="flex items-center gap-2">
          <UpdateItemButton id={item.id!} />
          <DeleteItemButton id={item.id!} />
        </div>
      </div>
    </li>
  );
};

export default ListItem
