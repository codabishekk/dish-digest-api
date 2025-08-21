import React from 'react';
import { Search, ChefHat, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import heroImage from '@/assets/recipe-hero.jpg';

const RecipeHero = () => {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ChefHat className="h-8 w-8 text-recipe-gold" />
          <h1 className="text-4xl md:text-6xl font-bold">Recipe Discovery</h1>
        </div>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          Discover delicious recipes from around the world. Filter by cuisine, rating, cooking time, and nutritional content.
        </p>

        {/* Quick Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-white/80">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-recipe-gold" />
            <span>8,450+ Recipes</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-recipe-gold" />
            <span>Quick & Easy Options</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-recipe-gold" />
            <span>Global Cuisines</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Button 
            size="lg"
            className="bg-recipe-warm hover:bg-recipe-warm/90 text-white shadow-recipe w-full sm:w-auto"
          >
            <Search className="h-5 w-5 mr-2" />
            Explore Recipes
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default RecipeHero;