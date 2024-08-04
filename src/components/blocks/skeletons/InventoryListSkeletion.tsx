import { Skeleton } from "@/components/ui/skeleton";

export function InventoryListSkeleton() {
  return (
    <div>
      <Skeleton className="h-6 w-3/4 mb-4" /> {/* Placeholder for the text */}
      <ul className="divide-y divide-gray-200">
        {[...Array(5)].map((_, index) => (
          <li key={index} className="py-4">
            <div className="flex flex-between items-center w-full">
              <div className="flex justify-between flex-auto">
                <div className="flex items-center">
                  <Skeleton className="w-16 h-16 mr-4 rounded-md" /> {/* Image placeholder */}
                  <div>
                    <Skeleton className="h-6 w-32 mb-2" /> {/* Item name placeholder */}
                    <Skeleton className="h-4 w-24" /> {/* Quantity placeholder */}
                  </div>
                </div>
                <div className="text-right pr-8 flex flex-col justify-center">
                  <Skeleton className="h-4 w-28 mb-2" /> {/* Created date placeholder */}
                  <Skeleton className="h-4 w-28" /> {/* Expiry date placeholder */}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-full" /> {/* Update button placeholder */}
                <Skeleton className="w-8 h-8 rounded-full" /> {/* Delete button placeholder */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}