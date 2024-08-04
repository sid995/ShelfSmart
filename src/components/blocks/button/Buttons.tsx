
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SVGProps, useState } from 'react';
import { deleteInventoryItem } from "@/lib/firestoreApi";
import { useRouter } from 'next/navigation';
import { Plus } from "lucide-react";

type ButtonProps = {
  id?: string;
};

export function AddItemButton({ href }: { href: string }) {
  return (
    <Button asChild className="bg-primary text-primary-foreground">
      <Link href={href} prefetch={false}>
        <Plus className="w-4 h-4 mr-2" /> Add Item
      </Link>
    </Button>
  )
}

export function UpdateItemButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/${id}/edit`}
    >
      <Button variant="ghost" size="icon">
        <FilePenIcon className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>
    </Link>
  );
}

export function DeleteItemButton({ id }: ButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteInventoryItem(id as string);
      router.refresh(); // This will trigger a re-fetch of the /dashboard route
    } catch (error) {
      console.error("Failed to delete item:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <TrashIcon className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  );
}


function FilePenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}