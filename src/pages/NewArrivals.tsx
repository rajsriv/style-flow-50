import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/products/ProductCard';
import { newArrivals, products } from '@/data/products';

const NewArrivals: React.FC = () => {
  const allNew = [...newArrivals, ...products.slice(2, 6)];

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
              <Sparkles className="w-6 h-6 text-gold" />
              <span className="text-sm uppercase tracking-wider text-gold font-medium">Just Landed</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display mb-4">New Arrivals</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Fresh drops and latest additions to our collection. Be the first to discover.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allNew.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NewArrivals;
