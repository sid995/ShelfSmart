import { getServerSession } from '@/utils/serverAuth';
import HomeContent from '@/app/components/HomeContent';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect('/signin');
  }

  return <HomeContent user={session?.user} />
};