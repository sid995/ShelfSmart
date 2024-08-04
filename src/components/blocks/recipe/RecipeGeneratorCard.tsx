'use client'

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface RecipeGeneratorCardProps {
  inputText: string;
  setInputText: (text: string) => void;
  isLoading: boolean;
  generateRecipe: () => void;
}

export default function RecipeGeneratorCard({
  inputText,
  setInputText,
  isLoading,
  generateRecipe
}: RecipeGeneratorCardProps) {
  return (
    <div className="sticky block top-0 z-10 bg-white shadow-md w-full">
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-2xl">Recipe Generator</CardTitle>
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
  )
} 