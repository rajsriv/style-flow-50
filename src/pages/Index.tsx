import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { TrendingSection } from '@/components/home/TrendingSection';
import { Marquee } from '@/components/home/Marquee';
import { NewArrivalsSection } from '@/components/home/NewArrivalsSection';
import { PromoSection } from '@/components/home/PromoSection';

const Index: React.FC = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Marquee />
      <FeaturedCategories />
      <TrendingSection />
      <NewArrivalsSection />
      <PromoSection />
      <Footer />
    </main>
  );
};

export default Index;
