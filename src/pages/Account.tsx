import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Heart, Settings, LogOut, Package, CreditCard } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: Package, label: 'My Orders', href: '/orders', count: 0 },
    { icon: Heart, label: 'Wishlist', href: '/wishlist', count: wishlistItems.length },
    { icon: ShoppingBag, label: 'Cart', href: '/cart', count: cartItems.length },
    { icon: CreditCard, label: 'Payment Methods', href: '/payment' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-3xl border border-border p-8 mb-8"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-display mb-1">{user.name}</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  <span className={cn(
                    'inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider',
                    user.role === 'admin' && 'bg-destructive/20 text-destructive',
                    user.role === 'seller' && 'bg-primary/20 text-primary',
                    user.role === 'buyer' && 'bg-gold/20 text-gold',
                    user.role === 'guest' && 'bg-muted text-muted-foreground'
                  )}>
                    {user.role}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Menu Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-3xl border border-border overflow-hidden mb-8"
            >
              {menuItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.href)}
                  className={cn(
                    'w-full flex items-center justify-between p-5 hover:bg-secondary transition-colors',
                    index !== menuItems.length - 1 && 'border-b border-border'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>

            {/* Seller/Admin Dashboard Link */}
            {(user.role === 'seller' || user.role === 'admin') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-3xl border border-primary/20 p-6 mb-8"
              >
                <h3 className="font-display text-lg mb-2">
                  {user.role === 'admin' ? 'Admin Dashboard' : 'Seller Dashboard'}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {user.role === 'admin' 
                    ? 'Manage products, users, and platform settings.'
                    : 'Manage your listings, orders, and analytics.'}
                </p>
                <Button variant="coral">
                  Open Dashboard
                </Button>
              </motion.div>
            )}

            {/* Logout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Account;
