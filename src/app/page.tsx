import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, HeartPulse, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Your Health, Understood.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Emerald Health Finder uses AI to analyze your symptoms, help you understand potential health issues, and connect you with medical professionals across Ireland.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="font-semibold">
                  <Link href="/symptom-checker">Check Your Symptoms</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-semibold">
                  <Link href="/find-practitioner">Find a Practitioner</Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              width="600"
              height="400"
              alt="Hero"
              data-ai-hint="health doctor"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                A new way to manage your health
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From symptom analysis to finding the right doctor, we provide the tools you need for peace of mind.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="grid gap-1">
                  <HeartPulse className="h-10 w-10 text-primary" />
                  <CardTitle>AI Symptom Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Describe your symptoms in plain language and our AI will provide you with a list of potential conditions and their severity.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="grid gap-1">
                  <MapPin className="h-10 w-10 text-primary" />
                  <CardTitle>Practitioner Locator</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Find GPs, specialists, and hospitals near you. Filter by health plans accepted, including Medical Card and private insurance.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="grid gap-1">
                  <CheckCircle className="h-10 w-10 text-primary" />
                  <CardTitle>Personalised & Secure</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Securely store your GP information and health plan details for quick access when you need it most.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
