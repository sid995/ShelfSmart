"use server"

import CreateItem from "@/components/blocks/dashboard/CreateItem"
import { getServerSession } from "@/lib/auth/auth-server";
import { CurrentSessionType } from "@/lib/definitions";
import { redirect } from "next/navigation";

export default async function Page() {
  const currentSession: CurrentSessionType = await getServerSession();

  if (!currentSession || !currentSession.user) {
    redirect('/signin');
  }

  return (
    <CreateItem session={currentSession} />
  )
}