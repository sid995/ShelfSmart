'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CurrentSessionType } from '@/lib/definitions';
import { toast } from '@/components/ui/use-toast';
import { saveRecipe } from '@/lib/firestoreApi';
import { Bookmark } from 'lucide-react';

export default function RecipesPage({ session }: { session: CurrentSessionType }) {
  let userId = null
  if (session!.user.id) userId = session!.user.id

  const [inputText, setInputText] = useState('');
  const [recipeData, setRecipeData] = useState<{ title: string; recipe: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const generateRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputText })
      });
      const { title, recipe } = await response.json();
      setRecipeData({ title, recipe });
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
    setIsLoading(false);
  };

  const handleSaveRecipe = async () => {
    if (!recipeData) return;
    setIsSaving(true);
    try {
      await saveRecipe({
        userId,
        title: recipeData.title,
        description: recipeData.recipe,
      });
      toast({
        title: "Success",
        description: "Recipe saved successfully!",
      });
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast({
        title: "Error",
        description: "Failed to save recipe. Please try again.",
        variant: "destructive",
      });
    }
    setIsSaving(false);
  };

  return (
    <div className="flex-1 relative">
      <div className="fixed w-full block top-0 left-[300px] ml-6 z-10 bg-white shadow-md" style={{ width: `calc(100vw - 360px)` }}>
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Recipe Generator</CardTitle>
          </CardHeader>
          <CardContent className="flex space-x-4">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe the recipe you want to generate..."
              className="flex-1"
            />
            <Button
              onClick={generateRecipe}
              disabled={isLoading}
              className="self-start bg-green-600 text-white w-[165px]"
            >
              {isLoading ? 'Generating...' : 'Generate Recipe'}
            </Button>
          </CardContent>
        </Card>
      </div>
      <section className="px-8 pb-8 pt-56 space-y-8">
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
                <Bookmark className={isSaving ? 'animate-pulse' : ''} />
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