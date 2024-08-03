'use client'

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder = "", className = "" }: { placeholder: string, className?: string | undefined }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);


  return (
    <Input
      defaultValue={searchParams.get('query')?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder={placeholder}
      className={cn("mr-2 placeholder:text-gray-500 outline-2 border border-gray-200", className)} />
  )
}