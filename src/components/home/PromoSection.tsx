import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PromoSection: React.FC = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Promo 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl aspect-[4/3] group"
          >
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
              alt="Sale"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center max-w-md">
              <span className="text-primary text-sm uppercase tracking-wider mb-2">Limited Time</span>
              <h3 className="text-3xl md:text-4xl font-display mb-4">Up to 50% Off</h3>
              <p className="text-muted-foreground mb-6">Shop our biggest sale of the season with exclusive markdowns.</p>
              <Link to="/shop?sale=true">
                <Button variant="coral" className="group w-fit">
                  Shop Sale
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Promo 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl aspect-[4/3] group"
          >
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800"
              alt="Exclusive"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-background/50 to-transparent" />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center items-end text-right max-w-md ml-auto">
              <span className="text-gold text-sm uppercase tracking-wider mb-2">Exclusive</span>
              <h3 className="text-3xl md:text-4xl font-display mb-4">Members Get More</h3>
              <p className="text-muted-foreground mb-6">Join our loyalty program for early access and exclusive perks.</p>
              <Link to="/auth">
                <Button variant="outline" className="group w-fit">
                  Join Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
