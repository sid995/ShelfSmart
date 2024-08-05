'use client'

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CurrentSessionType, NewCreatedInventory } from '@/lib/definitions';
import { toast } from '@/components/ui/use-toast';
import { deleteRecipe, saveRecipe, getInventoryItems } from '@/lib/firestoreApi';
import { Bookmark } from 'lucide-react';
import RecipeGeneratorCard from './RecipeGeneratorCard';
import { removePrefix } from '@/lib/utils';

interface RecipeBlockProps {
  userId: string | undefined;
  initialRecipe?: RecipeType | null | undefined;
  inventory: NewCreatedInventory[];
}

type RecipeType = {
  id: string;
  title: string;
  description: string;
};

export default function RecipesPage({
  userId,
  initialRecipe = null,
  inventory = []
}: RecipeBlockProps) {

  const [inputText, setInputText] = useState<string>('');
  const [recipeData, setRecipeData] = useState<RecipeType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(!!initialRecipe);

  useEffect(() => {
    if (initialRecipe) {
      setInputText(initialRecipe.title);
      setRecipeData(initialRecipe);
      setIsSaved(true);
    } else {
      setInputText('');
      setRecipeData(null);
      setIsSaved(false);
    }
  }, [initialRecipe]);

  const handleDefaultChangeWhenGenerating = useCallback(async () => {
    setIsLoading(true);
    setRecipeData(null);
    setIsSaved(false);
  }, [])

  const generateRecipe = async () => {
    handleDefaultChangeWhenGenerating()

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputText })
      });
      const { title, recipe } = await response.json();
      setRecipeData({ id: "", title, description: recipe });
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
    setIsLoading(false);
  };

  const handleSaveOrDeleteRecipe = async () => {
    if (!recipeData || !userId) return;
    setIsSaving(true);
    try {
      if (isSaved) {
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
          description: recipeData.description,
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

  const generateRecipeFromInventory = async () => {
    handleDefaultChangeWhenGenerating()

    try {
      const itemNames = inventory.map(item => item.name).join(', ');
      setInputText(itemNames);

      // Generate recipe using inventory items
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Create a recipe using some or all of these ingredients: ${itemNames}` })
      });
      const { title, recipe } = await response.json();
      setRecipeData({ id: "", title, description: recipe });
    } catch (error) {
      console.error('Error generating recipe from inventory:', error);
      toast({
        title: "Error",
        description: "Failed to generate recipe from inventory. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-1 relative">
      <RecipeGeneratorCard
        inputText={inputText}
        setInputText={setInputText}
        generateRecipe={generateRecipe}
        isLoading={isLoading}
        generateRecipeFromInventory={generateRecipeFromInventory}
        inventoryExists={inventory.length > 0}
      />
      <section className="p-8 space-y-8">
        {recipeData && (
          <Card className="p-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="max-w-[80%]">{removePrefix(recipeData.title, 'Title: ')}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveOrDeleteRecipe}
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
              <pre className="whitespace-pre-wrap">{recipeData.description}</pre>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}