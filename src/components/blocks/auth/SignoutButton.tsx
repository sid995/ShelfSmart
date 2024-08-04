'use client'

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast";
import { signOut } from "@/lib/auth/auth-client";
import { useRouter } from 'next/navigation';

export const SignoutButton = () => {
  const router = useRouter()

  const handleSignout = async () => {
    try {
      await signOut();
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Button className="bg-red-600 hover:bg-red-700" onClick={handleSignout}>
      Sign Out
    </Button>
  )
}