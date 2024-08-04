import RecipeBlock from "@/components/blocks/recipe/RecipeBlock";
import { getServerSession } from "@/lib/auth/auth-server";
import { CurrentSessionType } from "@/lib/definitions";
import { getRecipeById } from "@/lib/firestoreApi";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface RecipePageProps {
  searchParams: { id?: string };
}

type RecipeType = {
  id: string;
  title: string;
  description: string;
};

function removePrefix(title: string, prefix: string): string {
  if (title.startsWith(prefix)) {
    return title.slice(prefix.length);
  }
  return title
}

async function RecipeContent({ id, currentSession }: { id: string; currentSession: CurrentSessionType }) {
  try {
    let recipe: RecipeType = await getRecipeById(id);
    recipe = {
      ...recipe,
      title: removePrefix(recipe.title, "Title: "),
    } as RecipeType;

    return <RecipeBlock session={currentSession} initialRecipe={recipe} />;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return <RecipeBlock session={currentSession} />;
  }
}

export default async function RecipePage({ searchParams }: RecipePageProps) {
  const currentSession: CurrentSessionType = await getServerSession();

  if (!currentSession || !currentSession.user) {
    redirect('/signin');
  }

  const recipeId = searchParams?.id || "";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {recipeId ? (
        <RecipeContent id={recipeId} currentSession={currentSession} />
      ) : (
        <RecipeBlock session={currentSession} />
      )}
    </Suspense>
  )
}