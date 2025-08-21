import React from 'react';
import RecipeHero from '@/components/RecipeHero';
import RecipeTable from '@/components/RecipeTable';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <RecipeHero />
      <main className="container mx-auto px-6 py-12">
        <RecipeTable />
      </main>
    </div>
  );
};

export default Index;
