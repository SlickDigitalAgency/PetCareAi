import React from 'react';
import Hero from '../../components/sections/home/Hero';
import Features from '../../components/sections/home/Features';

const Home = () => {
  return (
    <main className="bg-gray-900 min-h-screen">
      <Hero />
      <Features />
    </main>
  );
};

export default Home;