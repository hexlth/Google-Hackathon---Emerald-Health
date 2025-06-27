import { Button } from '@/components/ui/button';
import Link from 'next/link';

const testimonials = [
  {
    name: 'Deirdre K.',
    quote: "The analysis was surprisingly accurate and helped me decide to see a doctor sooner. Incredibly helpful and gave me real peace of mind."
  },
  {
    name: 'Liam G.',
    quote: "I used this for my dad when he was feeling unwell. It was simple to use and the practitioner finder was a fantastic, straightforward feature."
  },
  {
    name: 'Aoife M.',
    quote: "As a student, I can't always get a GP appointment quickly. This service is a lifesaver for getting initial advice and understanding my symptoms."
  }
];

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full py-32 md:py-48 lg:py-64">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none text-foreground">
              Your Health, Clarified.
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Instant, AI-powered symptom analysis and practitioner connections. <br />
              Clear answers for your peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/symptom-checker">Check Symptoms</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold text-lg px-8 py-6 rounded-full">
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-start space-y-4">
              <span className="text-5xl font-bold text-primary">01</span>
              <h3 className="text-2xl font-bold">Describe Symptoms</h3>
              <p className="text-muted-foreground">Tell us how you're feeling in your own words. Our platform is built for natural, easy communication.</p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <span className="text-5xl font-bold text-primary">02</span>
              <h3 className="text-2xl font-bold">Get AI Insights</h3>
              <p className="text-muted-foreground">Receive an instant, preliminary analysis of potential conditions and their severity, powered by advanced AI.</p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <span className="text-5xl font-bold text-primary">03</span>
              <h3 className="text-2xl font-bold">Find a Practitioner</h3>
              <p className="text-muted-foreground">We connect you with trusted local GPs, clinics, and specialists that match your health plan and needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Trusted Across Ireland
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border border-border p-8 rounded-lg bg-card/50 flex flex-col justify-between">
                <blockquote className="text-lg italic text-muted-foreground mb-6">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <p className="font-semibold text-right">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Final CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl">
              Ready for clarity?
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground md:text-xl">
              Get your free, instant AI symptom analysis now. It's fast, secure, and built for you.
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
