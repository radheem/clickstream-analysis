import Image from 'next/image';
import Link from 'next/link';

import { AudioLines, ChevronRight, Smartphone } from 'lucide-react';

import AnimatedBorderButton from '../animated-border-button';

const features = [
  {
    icon: <AudioLines />,
    label: 'The Perfect Sound, Anywhere',
    title: 'Experience crystal-clear audio with deep bass and immersive sound.',
    description:
      "Our smart speaker is designed to fill your space with rich, high-fidelity sound—whether you're at home or on the go.",
    image: '/images/products/feature-1.webp',
    link: {
      text: 'Buy now',
      href: '/pricing',
    },
  },
  {
    icon: <Smartphone />,
    label: 'Smart, Sleek, Powerful',
    title:
      'Seamless connectivity, voice control, and a sleek, modern design make this speaker the perfect addition to any room.',
    description:
      'Designed for modern living life-upward stands premium sound with intuitive controls.',
    image: '/images/products/feature-2.webp',
    link: {
      text: 'Get more',
      href: '/products/connectivity',
    },
  },
];

const Features = () => {
  return (
    <section className="section-padding container">
      <div className="[&>*:nth-child(odd)]:md:flex-row-reverse">
        {features.map((feature, index) => (
          <div
            key={index}
            className="section-padding flex flex-col items-center justify-between gap-8 last:!pb-0 md:flex-row md:gap-16"
          >
            <div className="relative h-[340px] w-full sm:h-[600px] sm:min-w-[440px] lg:w-[569px] lg:shrink-0">
              <Image
                src={feature.image}
                alt={feature.label}
                fill
                className="rounded-3xl object-cover object-[70%_30%]"
              />
            </div>
            <div className="">
              <div className="space-y-6 md:space-y-8 lg:space-y-10.5">
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <p className="text-xl leading-8 md:leading-10">
                    {feature.label}
                  </p>
                </div>
                <h3 className="text-2xl font-medium md:text-3xl lg:text-4xl">
                  {feature.title}
                </h3>
                <p className="text-xl leading-8">{feature.description}</p>
              </div>
              <AnimatedBorderButton
                asChild
                wrapperClassName="w-fit mt-4"
                className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
              >
                <Link href={feature.link.href}>
                  {feature.link.text} <ChevronRight />
                </Link>
              </AnimatedBorderButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
