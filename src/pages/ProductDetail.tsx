import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Minus, Plus, ArrowLeft, Share2, Check } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-display mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button variant="coral">Back to Shop</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }
    addToCart(product, selectedSize, selectedColor || product.colors[0]);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  layoutId={`product-image-${product.id}`}
                />
              </div>
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-foreground text-background px-4 py-2 text-sm font-medium rounded-full">
                    NEW
                  </span>
                )}
                {product.isTrending && (
                  <span className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded-full">
                    TRENDING
                  </span>
                )}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{product.brand}</p>
              <h1 className="text-4xl md:text-5xl font-display mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-4 h-4',
                        i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-muted'
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-destructive/20 text-destructive px-3 py-1 rounded-full text-sm font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-8">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="font-medium mb-3">Color: {selectedColor || 'Select a color'}</p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'px-4 py-2 rounded-lg border text-sm transition-all',
                        selectedColor === color
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-foreground/30'
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-medium">Size: {selectedSize || 'Select a size'}</p>
                  <button className="text-sm text-primary hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'w-12 h-12 rounded-lg border font-medium transition-all',
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-foreground/30'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-8">
                <p className="font-medium">Quantity:</p>
                <div className="flex items-center gap-3 bg-secondary rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted rounded-l-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted rounded-r-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <Button
                  variant="coral"
                  size="xl"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {selectedSize ? 'Add to Cart' : 'Select a Size'}
                </Button>
                <Button
                  variant={inWishlist ? 'default' : 'outline'}
                  size="xl"
                  onClick={handleWishlistToggle}
                >
                  <Heart className={cn('w-5 h-5', inWishlist && 'fill-current')} />
                </Button>
                <Button variant="outline" size="xl">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-8 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-5 h-5 text-primary" />
                  Free shipping on orders over $100
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-5 h-5 text-primary" />
                  30-day free returns
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-5 h-5 text-primary" />
                  Secure checkout
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProductDetail;
