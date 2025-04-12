
import React from 'react';
import GameContainer from '@/components/GameContainer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Sentence Construction Challenge
        </h1>
        
        <GameContainer />
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2025 Sentence Construction Tool</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
