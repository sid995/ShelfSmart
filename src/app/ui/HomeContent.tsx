'use client'

import { signOutUser } from '@/utils/auth';
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

type UserProps = {
  uid: string;
  name: string;
  email: string | undefined;
}

interface HomeContentProps {
  user: UserProps | null | undefined;
}

const HomeContent: React.FC<HomeContentProps> = ({ user }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/signin');
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container max-w-sm mx-auto my-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Welcome to SmartShelf</h1>
        <h2 className="text-xl">Logged in as: {user?.name}</h2>
        <Button
          variant="default"
          onClick={handleSignOut}
          className="w-full"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default HomeContent;