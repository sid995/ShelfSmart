import { Navbar } from "@/components/blocks/navbar/Navbar";
import { getServerSession } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    redirect('/signin'); // Redirect to signin page if there's no session
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-[300px] fixed top-0 left-0 z-10 bg-muted/40">
        <Navbar userId={session!.user.id} />
      </div>
      <div className="relative ml-[300px] flex-grow p-6 md:overflow-y-auto w-full">
        {children}
      </div>
    </div>
  )
}