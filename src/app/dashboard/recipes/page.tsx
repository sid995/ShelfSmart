import RecipeBlock from "@/components/blocks/recipe/RecipeBlock";
import { getServerSession } from "@/lib/auth/auth-server";
import { CurrentSessionType } from "@/lib/definitions";
import { redirect } from "next/navigation";

export default async function RecipePage() {
  const currentSession: CurrentSessionType = await getServerSession();

  if (!currentSession || !currentSession.user) {
    redirect('/signin');
  }

  return (
    <RecipeBlock session={currentSession} />
  )
}