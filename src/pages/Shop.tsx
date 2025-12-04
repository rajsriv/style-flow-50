import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Grid, Grid3X3, X } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

const Shop: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-display mb-4">Shop All</h1>
            <p className="text-muted-foreground">{filteredProducts.length} products</p>
          </motion.div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
              
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setGridCols(2)}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    gridCols === 2 ? 'bg-secondary' : 'hover:bg-secondary/50'
                  )}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    gridCols === 3 ? 'bg-secondary' : 'hover:bg-secondary/50'
                  )}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.aside
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 280 }}
                  exit={{ opacity: 0, width: 0 }}
                  className="shrink-0 overflow-hidden"
                >
                  <div className="w-[280px] pr-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display text-lg">Filters</h3>
                      <button onClick={() => setIsFilterOpen(false)}>
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Categories */}
                    <div className="mb-8">
                      <h4 className="font-medium mb-4">Categories</h4>
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={cn(
                            'block w-full text-left px-3 py-2 rounded-lg transition-colors',
                            !selectedCategory ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
                          )}
                        >
                          All Products
                        </button>
                        {categories.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={cn(
                              'block w-full text-left px-3 py-2 rounded-lg transition-colors',
                              selectedCategory === cat.name ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
                            )}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className="flex-1">
              <div className={cn(
                'grid gap-6',
                gridCols === 2 && 'grid-cols-1 sm:grid-cols-2',
                gridCols === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                gridCols === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              )}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Shop;
