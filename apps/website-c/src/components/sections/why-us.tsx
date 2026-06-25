import React from 'react';

import { Star, Diamond, Flag, ShoppingCart } from 'lucide-react';

import SectionHeader from '../section-header';
import { Card, CardHeader, CardContent } from '../ui/card';

const stats = [
  {
    icon: <ShoppingCart className="size-6" />,
    value: '60K+ Units Sold',
    description: 'Our speakers have reached over 60,000 satisfied customers.',
  },
  {
    icon: <Star className="size-6" />,
    value: '4.9/5 Average Rating',
    description: 'Thousands of reviews praise our unmatched sound quality.',
  },
  {
    icon: <Flag className="size-6" />,
    value: '100+ Countries',
    description:
      'Our products are loved and shipped across more than 100 countries.',
  },
];

export default function WhyUs() {
  return (
    <section className="section-padding container space-y-10.5">
      <SectionHeader
        icon={<Diamond />}
        category="Why us?"
        title="Trusted by Thousands, Engineered for Excellence"
        description="Our commitment to innovation and quality has earned the trust of customers worldwide. Sleek design, our products are built to impress."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {stats.map((stat, index) => (
          <Card key={index} className="gap-20 border-none p-8 shadow-none">
            <CardHeader className="p-0">
              <div className="border-input text-muted-foreground flex size-12 items-center justify-center rounded-full border">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-xl leading-8">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
