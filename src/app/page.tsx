import { Button } from '@/components/ui/button';
import { HeartPulse, MessageSquare, Search, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'Mother of two',
    quote: "As a busy mom, I don't have time to wait for appointments. This tool gave me peace of mind in minutes. It's so easy to use!",
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'smiling mother'
  },
  {
    name: 'Michael B.',
    role: 'Retired Teacher',
    quote: "I'm not the most tech-savvy person, but the instructions were clear and simple. It helped me understand my symptoms before calling my GP.",
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'senior man smiling'
  },
  {
    name: 'David O.',
    role: 'University Student',
    quote: 'Quick, accurate, and pointed me to a clinic that accepted my insurance. A real lifesaver during exam season!',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'male university student'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full bg-gray-50 dark:bg-gray-900/50">
        <div className="container grid md:grid-cols-2 gap-8 items-center py-20 md:py-32">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
              Health Answers for Everyone.
            </h1>
            <p className="max-w-xl text-muted-foreground md:text-xl">
              From your little one's fever to your parent's new ache, get clear, friendly AI-powered health guidance and find trusted local practitioners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Button asChild size="lg" className="font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/symptom-checker">Check Your Symptoms</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold text-lg px-8 py-6 rounded-full">
                <Link href="#how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-full min-h-[300px] rounded-lg overflow-hidden">
             <Image 
                src="https://placehold.co/600x600.png"
                alt="A friendly doctor interacting with a multi-generational family"
                fill
                className="object-cover"
                data-ai-hint="friendly doctor family"
              />
          </div>
        </div>
      </section>

      {/* For Everyone Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Care for Every Stage of Life
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              We're here to help you and your loved ones, no matter the age.
            </p>
          </div>
          <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-square rounded-lg overflow-hidden group">
              <Image src="https://placehold.co/300x300.png" alt="Happy senior couple" fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="happy senior couple" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white font-bold text-lg">Seniors</p>
            </div>
             <div className="relative aspect-square rounded-lg overflow-hidden group">
              <Image src="https://placehold.co/300x300.png" alt="Parents with a child" fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="parents with child" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white font-bold text-lg">Parents</p>
            </div>
             <div className="relative aspect-square rounded-lg overflow-hidden group">
              <Image src="https://placehold.co/300x300.png" alt="Young adults" fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="young adults" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white font-bold text-lg">Adults</p>
            </div>
             <div className="relative aspect-square rounded-lg overflow-hidden group">
              <Image src="https://placehold.co/300x300.png" alt="Teenagers smiling" fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="smiling teenagers" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white font-bold text-lg">Teens</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
                How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Your Path to Wellness in 3 Simple Steps
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              We've streamlined the process of understanding your health concerns.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl items-start gap-12 sm:grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary/10 p-6 rounded-full">
                <MessageSquare className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">1. Describe Symptoms</h3>
                <p className="text-muted-foreground">
                  Use our intuitive interface to tell us how you're feeling in your own words.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary/10 p-6 rounded-full">
                 <HeartPulse className="h-12 w-12 text-primary" />
              </div>
               <div className="space-y-2">
                <h3 className="text-2xl font-bold">2. Get AI Insights</h3>
                <p className="text-muted-foreground">
                  Receive a preliminary analysis of potential conditions and severity, powered by AI.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
               <div className="bg-primary/10 p-6 rounded-full">
                 <Search className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">3. Find a Practitioner</h3>
                <p className="text-muted-foreground">
                  Easily find and connect with GPs, clinics, and specialists near you that fit your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Trusted by People Across Ireland
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              See what our users have to say about their experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 flex flex-col items-center text-center shadow-sm">
                <Avatar className="w-20 h-20 mb-4 border-2 border-primary">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex gap-1 text-yellow-400 mb-2">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-muted-foreground italic mb-4">&quot;{testimonial.quote}&quot;</p>
                <h4 className="font-bold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Final CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Ready to Take the Next Step?
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Start your free symptom check now and get the clarity you deserve. It only takes a few minutes.
            </p>
            <div className="flex justify-center pt-4">
              <Button asChild size="lg" className="font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/symptom-checker">Start Symptom Check</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
