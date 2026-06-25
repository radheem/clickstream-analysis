'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    question: 'What makes your speakers stand out?',
    answer:
      'Our speakers deliver premium sound quality, sleek design, and long-lasting durability, ensuring an unmatched listening experience.',
  },
  {
    question: 'Are your speakers compatible with all devices?',
    answer:
      'Yes, our speakers are designed to work seamlessly with all modern devices through Bluetooth and auxiliary connections.',
  },
  {
    question: 'How long does the battery last?',
    answer:
      'Our speakers feature a long-lasting battery that provides up to 20 hours of continuous playback on a single charge.',
  },
  {
    question: 'Are the speakers waterproof?',
    answer:
      'Yes, our speakers are rated IPX7 waterproof, making them perfect for outdoor use and protection against accidental splashes.',
  },
  {
    question: 'Do you offer a warranty?',
    answer:
      'Yes, all our speakers come with a 2-year limited warranty covering manufacturing defects and hardware issues.',
  },
];

export default function FAQ() {
  return (
    <section className="section-padding container flex flex-col gap-8 md:flex-row md:gap-16">
      <div className="flex max-w-md flex-col gap-6 md:gap-16">
        <h2 className="text-3xl">Welcome to Beyond FAQ!</h2>
        <h3 className="text-2xl leading-8 md:text-4xl md:leading-14 lg:text-5xl">
          Everything You Need to Know About Our Speakers
        </h3>
      </div>

      <Accordion defaultValue="item-0" type="single" className="space-y-8">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="px-4">
            <AccordionTrigger className="cursor-pointer text-xl font-normal hover:no-underline md:pb-6 md:text-3xl">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base md:pb-6">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
