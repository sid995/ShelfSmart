import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removePrefix(title: string, prefix: string): string {
  if (title.startsWith(prefix)) {
    return title.slice(prefix.length);
  }
  return title
}
