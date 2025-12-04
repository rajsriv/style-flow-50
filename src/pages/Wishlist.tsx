import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';

const Wishlist: React.FC = () => {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <Heart className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-4xl font-display mb-4">Your Wishlist is Empty</h1>
              <p className="text-muted-foreground mb-8">Save items you love by clicking the heart icon.</p>
              <Link to="/shop">
                <Button variant="coral" size="lg">
                  Start Exploring
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h1 className="text-5xl font-display mb-2">Wishlist</h1>
              <p className="text-muted-foreground">{items.length} saved items</p>
            </div>
            <Button variant="outline" onClick={clearWishlist}>
              Clear All
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Wishlist;
