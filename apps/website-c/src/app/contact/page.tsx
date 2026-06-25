import { MessageSquare, Phone, Lightbulb } from 'lucide-react';

import AnimatedBorderButton from '@/components/animated-border-button';
import CategoryBadge from '@/components/category-badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  return (
    <section className="hero-padding-margin container grid grid-cols-1 justify-between gap-10 md:grid-cols-2 lg:gap-10.5">
      <div className="flex-1 space-y-6">
        <div className="space-y-3">
          <CategoryBadge label="Contact us" icon={<Lightbulb />} />
          <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl lg:leading-14">
            24/7 Available
          </h1>
        </div>
        <p className="text-xl">
          You can contact us via email, phone, or by filling out the form on
          this page. We strive to respond promptly and look forward to
          connecting with you soon!
        </p>

        <div className="flex items-center gap-2.5 rounded-full">
          <div className="border-input flex size-9 items-center justify-center rounded-full border">
            <MessageSquare className="text-muted-foreground size-5" />
          </div>
          <span className="text-xl">example@gmail.com</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-full">
          <div className="border-input flex size-9 items-center justify-center rounded-full border">
            <Phone className="text-muted-foreground size-5" />
          </div>
          <span className="text-xl">+1-555-44-456</span>
        </div>
      </div>

      <Card className="flex-1 py-8">
        <CardHeader className="gap-3 px-8">
          <h2 className="text-3xl font-bold">Write us</h2>
          <p className="text-xl">We'd love to hear from you!</p>
        </CardHeader>

        <CardContent className="px-8">
          <form className="flex flex-col gap-6">
            <div className="flex gap-10">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="firstname">First name</Label>
                <Input type="text" id="firstname" placeholder="Jane" />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="lastname">Last name</Label>
                <Input type="text" id="lastname" placeholder="Smith" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="example@gmail.com" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">Your message</Label>
              <Textarea
                placeholder="Type something..."
                id="message"
                className="min-h-[120px]"
              />
            </div>

            <AnimatedBorderButton className="w-full">
              Submit
            </AnimatedBorderButton>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
