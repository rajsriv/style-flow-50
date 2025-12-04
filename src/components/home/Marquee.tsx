import React from 'react';

const brands = [
  'MAISON NOIR', 'ATELIER', 'MINIMAL', 'LUXE BASICS', 'FORM', 'AVANT', 'EDGE', 'ORNAMENT'
];

export const Marquee: React.FC = () => {
  return (
    <section className="py-8 bg-primary overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
          <span
            key={i}
            className="text-primary-foreground text-sm font-medium tracking-[0.2em] mx-8 uppercase"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
};
