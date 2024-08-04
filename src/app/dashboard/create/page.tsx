"use server"

import ItemForm from "@/components/blocks/dashboard/ItemForm"
import { getServerSession } from "@/lib/auth/auth-server";
import { CurrentSessionType } from "@/lib/definitions";

export default async function Page() {
  const currentSession: CurrentSessionType = await getServerSession();

  return (
    <ItemForm session={currentSession} />
  )
}