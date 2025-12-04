import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/products/ProductCard';
import { trendingProducts, products } from '@/data/products';

const Trending: React.FC = () => {
  // Combine trending with some regular products for a fuller page
  const allTrending = [...trendingProducts, ...products.slice(0, 4)];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-primary" />
              <span className="text-sm uppercase tracking-wider text-primary font-medium">Hot Right Now</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display mb-4">Trending Now</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              The most wanted pieces everyone's talking about. Get them before they're gone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allTrending.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Trending;
