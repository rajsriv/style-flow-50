import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

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
              <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-4xl font-display mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">Discover our collection and find something you love.</p>
              <Link to="/shop">
                <Button variant="coral" size="lg">
                  Continue Shopping
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display mb-12"
          >
            Shopping Cart
          </motion.h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 p-6 bg-card rounded-2xl border border-border"
                >
                  <div className="w-24 h-32 md:w-32 md:h-40 rounded-lg overflow-hidden bg-secondary shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.brand}</p>
                        <h3 className="font-medium">{item.name}</h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="text-sm text-muted-foreground mb-auto">
                      <p>Size: {item.selectedSize}</p>
                      <p>Color: {item.selectedColor}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 bg-secondary rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-muted rounded-l-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-muted rounded-r-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-semibold">${item.price * item.quantity}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Button variant="outline" onClick={clearCart} className="mt-4">
                Clear Cart
              </Button>
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-32 h-fit"
            >
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-display mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <Button variant="coral" size="lg" className="w-full mb-4">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Button>

                <Link to="/shop">
                  <Button variant="outline" size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Cart;
