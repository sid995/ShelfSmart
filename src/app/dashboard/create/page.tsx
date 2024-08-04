"use server"

import ItemForm from "@/components/blocks/dashboard/ItemForm"
import { getServerSession } from "@/lib/auth/auth-server";
import { CurrentSessionType } from "@/lib/definitions";
import { redirect } from "next/navigation";

export default async function Page() {
  const currentSession: CurrentSessionType = await getServerSession();

  if (!currentSession || !currentSession.user) {
    redirect('/signin');
  }

  return (
    <ItemForm session={currentSession} />
  )
}