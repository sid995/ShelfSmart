import RecipeBlock from "@/components/blocks/recipe/RecipeBlock";
import { getServerSession } from "@/lib/auth/auth-server";
import { CurrentSessionType, NewCreatedInventory } from "@/lib/definitions";
import { getInventoryItems, getRecipeById } from "@/lib/firestoreApi";
import { removePrefix } from "@/lib/utils";
import { Suspense } from "react";

interface RecipePageProps {
  searchParams: { id?: string };
}

type RecipeType = {
  id: string;
  title: string;
  description: string;
};

async function RecipeContent({
  id,
  userId,
  inventory
}: {
  id: string;
  userId: string | undefined,
  inventory: NewCreatedInventory[]
}) {
  try {
    let recipe: RecipeType = await getRecipeById(id);
    recipe = {
      ...recipe,
      title: removePrefix(recipe.title, "Title: "),
    };

    return <RecipeBlock
      inventory={inventory}
      userId={userId}
      initialRecipe={recipe}
      key={id}
    />;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return <RecipeBlock
      inventory={inventory}
      userId={userId}
    />;
  }
}

export default async function RecipePage({ searchParams }: RecipePageProps) {
  const currentSession: CurrentSessionType = await getServerSession();

  const recipeId = searchParams?.id || "";

  const inventory = await getInventoryItems(currentSession!.user.id);

  return (
    <Suspense fallback={<div></div>}>
      {recipeId ? (
        <RecipeContent
          id={recipeId}
          userId={currentSession?.user.id}
          inventory={inventory}
        />
      ) : (
        <RecipeBlock
          userId={currentSession?.user.id}
          inventory={inventory}
        />
      )}
    </Suspense>
  )
}