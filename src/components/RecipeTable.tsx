import React, { useState, useEffect } from 'react';
import { Star, Clock, Users, Search, ChefHat, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import RecipeDrawer from './RecipeDrawer';

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

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Grilled Chicken with Herbs',
    cuisine: 'Mediterranean',
    rating: 4.8,
    prep_time: 15,
    cook_time: 25,
    total_time: 40,
    description: 'Succulent grilled chicken marinated in fresh herbs, olive oil, and lemon juice. A healthy and flavorful dish perfect for any occasion.',
    serves: '4-6',
    nutrients: {
      calories: 320,
      proteinContent: 45,
      fatContent: 12,
      carbohydrateContent: 8,
      fiberContent: 2,
      sodiumContent: 580
    }
  },
  {
    id: '2',
    title: 'Classic Italian Margherita Pizza',
    cuisine: 'Italian',
    rating: 4.6,
    prep_time: 30,
    cook_time: 12,
    total_time: 42,
    description: 'Authentic wood-fired pizza with fresh mozzarella, San Marzano tomatoes, and fresh basil. Simple ingredients, extraordinary flavor.',
    serves: '2-3',
    nutrients: {
      calories: 285,
      proteinContent: 12,
      fatContent: 10,
      carbohydrateContent: 38,
      fiberContent: 3,
      sodiumContent: 640
    }
  },
  {
    id: '3',
    title: 'Spicy Thai Green Curry with Coconut',
    cuisine: 'Thai',
    rating: 4.9,
    prep_time: 20,
    cook_time: 30,
    total_time: 50,
    description: 'Aromatic and creamy green curry with fresh vegetables, tender chicken, and coconut milk. A perfect balance of spice and richness.',
    serves: '4',
    nutrients: {
      calories: 420,
      proteinContent: 28,
      fatContent: 22,
      carbohydrateContent: 35,
      fiberContent: 4,
      sodiumContent: 890
    }
  },
  {
    id: '4',
    title: 'French Coq au Vin',
    cuisine: 'French',
    rating: 4.7,
    prep_time: 25,
    cook_time: 90,
    total_time: 115,
    description: 'Traditional French braised chicken in red wine with pearl onions, mushrooms, and fresh herbs. A classic comfort dish.',
    serves: '6',
    nutrients: {
      calories: 380,
      proteinContent: 42,
      fatContent: 15,
      carbohydrateContent: 12,
      fiberContent: 3,
      sodiumContent: 720
    }
  },
  {
    id: '5',
    title: 'Japanese Miso Glazed Salmon',
    cuisine: 'Japanese',
    rating: 4.8,
    prep_time: 10,
    cook_time: 15,
    total_time: 25,
    description: 'Perfectly glazed salmon with sweet and savory miso marinade. Served with steamed vegetables and jasmine rice.',
    serves: '2',
    nutrients: {
      calories: 340,
      proteinContent: 35,
      fatContent: 18,
      carbohydrateContent: 8,
      fiberContent: 1,
      sodiumContent: 650
    }
  },
  {
    id: '6',
    title: 'Mexican Street Corn Tacos',
    cuisine: 'Mexican',
    rating: 4.5,
    prep_time: 15,
    cook_time: 10,
    total_time: 25,
    description: 'Vibrant street-style tacos with charred corn, cotija cheese, lime crema, and fresh cilantro. Authentic Mexican flavors.',
    serves: '3-4',
    nutrients: {
      calories: 290,
      proteinContent: 8,
      fatContent: 14,
      carbohydrateContent: 35,
      fiberContent: 5,
      sodiumContent: 450
    }
  }
];

const StarRating = ({ rating }: { rating: number | null }) => {
  if (!rating) return <span className="text-muted-foreground">No rating</span>;
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating 
              ? 'fill-star-filled text-star-filled' 
              : 'fill-star-empty text-star-empty'
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const RecipeTable = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(mockRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [filters, setFilters] = useState({
    title: '',
    cuisine: 'all',
    rating: 'all',
    total_time: 'all',
    calories: 'all'
  });

  const totalPages = Math.ceil(filteredRecipes.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + limit);

  useEffect(() => {
    let filtered = recipes;

    if (filters.title) {
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.cuisine && filters.cuisine !== 'all') {
      filtered = filtered.filter(recipe => 
        recipe.cuisine.toLowerCase() === filters.cuisine.toLowerCase()
      );
    }

    if (filters.rating && filters.rating !== 'all') {
      const [operator, value] = filters.rating.split('');
      const numValue = parseFloat(value);
      filtered = filtered.filter(recipe => {
        if (!recipe.rating) return false;
        switch (operator) {
          case '>': return recipe.rating >= numValue;
          case '<': return recipe.rating <= numValue;
          case '=': return recipe.rating === numValue;
          default: return true;
        }
      });
    }

    if (filters.total_time && filters.total_time !== 'all') {
      const [operator, ...rest] = filters.total_time.split('');
      const value = parseInt(rest.join(''));
      filtered = filtered.filter(recipe => {
        if (!recipe.total_time) return false;
        switch (operator) {
          case '>': return recipe.total_time >= value;
          case '<': return recipe.total_time <= value;
          case '=': return recipe.total_time === value;
          default: return true;
        }
      });
    }

    if (filters.calories && filters.calories !== 'all') {
      const [operator, ...rest] = filters.calories.split('');
      const value = parseInt(rest.join(''));
      filtered = filtered.filter(recipe => {
        if (!recipe.nutrients.calories) return false;
        switch (operator) {
          case '>': return recipe.nutrients.calories >= value;
          case '<': return recipe.nutrients.calories <= value;
          case '=': return recipe.nutrients.calories === value;
          default: return true;
        }
      });
    }

    setFilteredRecipes(filtered);
    setPage(1);
  }, [filters, recipes]);

  const clearFilters = () => {
    setFilters({
      title: '',
      cuisine: 'all',
      rating: 'all',
      total_time: 'all',
      calories: 'all'
    });
  };

  const uniqueCuisines = [...new Set(recipes.map(recipe => recipe.cuisine))];

  return (
    <div className="w-full space-y-6">
      {/* Filters */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-recipe-warm" />
            <h3 className="text-lg font-semibold">Filter Recipes</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Recipe Title</label>
            <Input
              placeholder="Search recipes..."
              value={filters.title}
              onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
              className="border-recipe-sage/20 focus:border-recipe-warm"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Cuisine</label>
            <Select
              value={filters.cuisine}
              onValueChange={(value) => setFilters(prev => ({ ...prev, cuisine: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any cuisine</SelectItem>
                {uniqueCuisines.map(cuisine => (
                  <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Rating</label>
            <Select
              value={filters.rating}
              onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any rating</SelectItem>
                <SelectItem value=">4.5">4.5+ stars</SelectItem>
                <SelectItem value=">4.0">4.0+ stars</SelectItem>
                <SelectItem value=">3.5">3.5+ stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Total Time</label>
            <Select
              value={filters.total_time}
              onValueChange={(value) => setFilters(prev => ({ ...prev, total_time: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any time</SelectItem>
                <SelectItem value="<30">Under 30 min</SelectItem>
                <SelectItem value="<60">Under 1 hour</SelectItem>
                <SelectItem value="<120">Under 2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Calories</label>
            <Select
              value={filters.calories}
              onValueChange={(value) => setFilters(prev => ({ ...prev, calories: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any calories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any calories</SelectItem>
                <SelectItem value="<300">Under 300</SelectItem>
                <SelectItem value="<400">Under 400</SelectItem>
                <SelectItem value="<500">Under 500</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Results and Pagination Controls */}
      <div className="flex justify-between items-center">
        <div className="text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + limit, filteredRecipes.length)} of {filteredRecipes.length} recipes
        </div>
        <Select
          value={limit.toString()}
          onValueChange={(value) => setLimit(parseInt(value))}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 per page</SelectItem>
            <SelectItem value="25">25 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Recipe Table */}
      {paginatedRecipes.length === 0 ? (
        <Card className="p-12 text-center shadow-card">
          <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
        </Card>
      ) : (
        <Card className="shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-recipe-cream border-b">
                <tr>
                  <th className="text-left p-4 font-semibold">Recipe Title</th>
                  <th className="text-left p-4 font-semibold">Cuisine</th>
                  <th className="text-left p-4 font-semibold">Rating</th>
                  <th className="text-left p-4 font-semibold">Total Time</th>
                  <th className="text-left p-4 font-semibold">Serves</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecipes.map((recipe) => (
                  <tr
                    key={recipe.id}
                    className="border-b hover:bg-recipe-cream/50 cursor-pointer transition-smooth"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <td className="p-4">
                      <div className="font-medium text-foreground max-w-xs truncate">
                        {recipe.title}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary" className="bg-recipe-sage/20 text-recipe-earth">
                        {recipe.cuisine}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <StarRating rating={recipe.rating} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{recipe.total_time ? `${recipe.total_time} min` : 'N/A'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{recipe.serves}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Pagination */}
      {filteredRecipes.length > limit && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(pageNum)}
                  className={page === pageNum ? "bg-recipe-warm" : ""}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Recipe Drawer */}
      <RecipeDrawer
        recipe={selectedRecipe}
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
};

export default RecipeTable;