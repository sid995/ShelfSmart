'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CurrentSessionType } from '@/lib/definitions';
import { toast } from '@/components/ui/use-toast';
import { deleteRecipe, saveRecipe } from '@/lib/firestoreApi';
import { Bookmark } from 'lucide-react';
import RecipeGeneratorCard from './RecipeGeneratorCard';

interface RecipeBlockProps {
  session: CurrentSessionType;
  initialRecipe?: RecipeType | null | undefined;
}

type RecipeType = {
  id: string;
  title: string;
  description: string;
};


export default function RecipesPage({ session, initialRecipe = null }: RecipeBlockProps) {
  let userId: any
  if (session!.user.id) userId = session!.user.id

  const [inputText, setInputText] = useState(initialRecipe?.title || '');
  const [recipeData, setRecipeData] = useState<{ id: string, title: string; recipe: string } | null>(initialRecipe ? ({
    id: initialRecipe?.id || '',
    title: initialRecipe?.title || '',
    recipe: initialRecipe?.description || '',
  }) : null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(!!initialRecipe);

  const generateRecipe = async () => {
    setIsLoading(true);
    setRecipeData(null)
    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputText })
      });
      const { title, recipe } = await response.json();
      setRecipeData({ id: "", title, recipe });
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
    setIsLoading(false);
  };

  const handleSaveRecipe = async () => {
    if (!recipeData || !userId) return;
    setIsSaving(true);
    try {
      if (isSaved) {
        // Delete the recipe if it's already saved
        await deleteRecipe(recipeData.id!);
        setIsSaved(false);
        toast({
          title: "Success",
          description: "Recipe removed from saved recipes.",
        });
      } else {
        // Save new recipe
        const savedRecipe = await saveRecipe({
          userId,
          title: recipeData.title,
          description: recipeData.recipe,
        });
        setRecipeData({ ...recipeData, id: savedRecipe.id });
        setIsSaved(true);
        toast({
          description: "Recipe saved successfully!",
        });
      }
    } catch (error) {
      console.error('Error saving/deleting recipe:', error);
      toast({
        title: "Error",
        description: "Failed to save/delete recipe. Please try again.",
        variant: "destructive",
      });
    }
    setIsSaving(false);
  };

  return (
    <div className="flex-1 relative">
      <RecipeGeneratorCard
        inputText={inputText}
        setInputText={setInputText}
        generateRecipe={generateRecipe}
        isLoading={isLoading}
      />
      <section className="p-8 space-y-8">
        {recipeData && (
          <Card className="p-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="max-w-[80%]">{recipeData.title}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveRecipe}
                disabled={isSaving}
              >
                {isSaved ? (
                  <Bookmark className={`fill-current ${isSaving ? 'animate-pulse' : ''}`} />
                ) : (
                  <Bookmark className={isSaving ? 'animate-pulse' : ''} />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap">{recipeData.recipe}</pre>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}