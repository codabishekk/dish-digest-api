import React, { useState } from 'react';
import { X, Clock, ChefHat, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Recipe {
  id: string;
  title: string;
  cuisine: string;
  rating: number | null;
  prep_time: number | null;
  cook_time: number | null;
  total_time: number | null;
  description: string;
  serves: string;
  nutrients: {
    calories?: number;
    carbohydrateContent?: number;
    cholesterolContent?: number;
    fiberContent?: number;
    proteinContent?: number;
    saturatedFatContent?: number;
    sodiumContent?: number;
    sugarContent?: number;
    fatContent?: number;
  };
}

interface RecipeDrawerProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
}

const RecipeDrawer = ({ recipe, open, onClose }: RecipeDrawerProps) => {
  const [isTimingExpanded, setIsTimingExpanded] = useState(false);

  if (!recipe) return null;

  const nutritionData = [
    { label: 'Calories', value: recipe.nutrients.calories, unit: 'cal' },
    { label: 'Protein', value: recipe.nutrients.proteinContent, unit: 'g' },
    { label: 'Fat', value: recipe.nutrients.fatContent, unit: 'g' },
    { label: 'Carbohydrates', value: recipe.nutrients.carbohydrateContent, unit: 'g' },
    { label: 'Fiber', value: recipe.nutrients.fiberContent, unit: 'g' },
    { label: 'Sodium', value: recipe.nutrients.sodiumContent, unit: 'mg' },
    { label: 'Sugar', value: recipe.nutrients.sugarContent, unit: 'g' },
    { label: 'Saturated Fat', value: recipe.nutrients.saturatedFatContent, unit: 'g' },
    { label: 'Cholesterol', value: recipe.nutrients.cholesterolContent, unit: 'mg' }
  ].filter(item => item.value !== undefined);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-4 pb-6 border-b">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <SheetTitle className="text-xl font-bold text-recipe-earth pr-8">
                {recipe.title}
              </SheetTitle>
              <Badge variant="secondary" className="bg-recipe-sage/20 text-recipe-earth">
                {recipe.cuisine}
              </Badge>
            </div>
          </div>
          <SheetDescription className="text-foreground">
            {recipe.description}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-recipe-cream p-4 rounded-lg">
              <div className="flex items-center gap-2 text-recipe-earth">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Total Time</span>
              </div>
              <div className="text-lg font-semibold mt-1">
                {recipe.total_time ? `${recipe.total_time} min` : 'N/A'}
              </div>
            </div>
            
            <div className="bg-recipe-cream p-4 rounded-lg">
              <div className="flex items-center gap-2 text-recipe-earth">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Serves</span>
              </div>
              <div className="text-lg font-semibold mt-1">{recipe.serves}</div>
            </div>
          </div>

          {/* Expandable Timing Details */}
          <Collapsible 
            open={isTimingExpanded} 
            onOpenChange={setIsTimingExpanded}
            className="border rounded-lg"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-smooth">
              <div className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-recipe-warm" />
                <span className="font-medium">Cooking Details</span>
              </div>
              {isTimingExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Prep Time:</span>
                  <span className="font-medium">
                    {recipe.prep_time ? `${recipe.prep_time} min` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Cook Time:</span>
                  <span className="font-medium">
                    {recipe.cook_time ? `${recipe.cook_time} min` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-muted-foreground font-medium">Total Time:</span>
                  <span className="font-semibold text-recipe-warm">
                    {recipe.total_time ? `${recipe.total_time} min` : 'N/A'}
                  </span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Nutrition Information */}
          {nutritionData.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <div className="h-2 w-2 bg-recipe-warm rounded-full"></div>
                Nutrition Facts
              </h3>
              <div className="bg-recipe-cream/50 rounded-lg p-4">
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {nutritionData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground">{item.label}:</span>
                      <span className="font-medium">
                        {typeof item.value === 'number' ? item.value.toLocaleString() : item.value} {item.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Rating Section */}
          {recipe.rating && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <div className="h-2 w-2 bg-star-filled rounded-full"></div>
                Recipe Rating
              </h3>
              <div className="bg-gradient-warm p-4 rounded-lg text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold">{recipe.rating.toFixed(1)}</div>
                  <div className="text-sm opacity-90">out of 5 stars</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RecipeDrawer;