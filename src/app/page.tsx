import { getServerSession } from '@/utils/serverAuth';
import HomeContent from '@/app/components/HomeContent';

export default async function Home() {
  const session = await getServerSession();
  console.log("session: ", session)

  return <HomeContent user={session?.email} />
};