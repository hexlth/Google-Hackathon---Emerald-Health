import { Button } from '@/components/ui/button';
import { HeartPulse, MessageSquare, Search, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full min-h-[70vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 py-20 md:py-32">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
              Clearer Health, Quicker Answers.
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Emerald Health Finder uses advanced AI to understand your symptoms and helps you find the right medical professional in Ireland, effortlessly.
            </p>
            <div className="flex justify-center pt-4">
              <Button asChild size="lg" className="font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/symptom-checker">Check Your Symptoms Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
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

      {/* Trust & Security Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <ShieldCheck className="mx-auto h-12 w-12 text-accent" />
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Your Privacy is Our Priority
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              We are committed to protecting your personal health information with the highest standards of security. Your data is yours, always.
            </p>
          </div>
           <div className="flex justify-center">
                <Button asChild variant="link" className="text-accent font-semibold text-lg">
                  <Link href="/privacy">Learn about our privacy policy</Link>
                </Button>
            </div>
        </div>
      </section>

       {/* Final CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Ready to Take Control of Your Health?
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Start your symptom check now and get the clarity you deserve.
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
