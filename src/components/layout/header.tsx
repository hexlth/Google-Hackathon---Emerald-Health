"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  // Mock auth state - replace with real auth logic
  const isLoggedIn = false;

  const navLinks = [
    { href: "/symptom-checker", label: "Symptom Checker" },
    { href: "/find-practitioner", label: "Find a Practitioner" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm"
    )}>
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Emerald Health
            </span>
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-primary text-foreground/60">
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="hidden md:flex items-center gap-2">
                {isLoggedIn ? (
                <Button variant="ghost">Logout</Button>
                ) : (
                <>
                    <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                    </Button>
                </>
                )}
            </div>
            <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="p-4">
                    <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                      <Stethoscope className="h-6 w-6 text-primary" />
                      <span className="font-bold">
                        Emerald Health
                      </span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                        {navLinks.map(link => (
                        <Link key={link.href} href={link.href} className="block px-2 py-1 text-lg">
                            {link.label}
                        </Link>
                        ))}
                    </nav>
                  </div>
                  <div className="border-t pt-4 mt-4 p-4">
                    {isLoggedIn ? (
                        <Button variant="outline" className="w-full">Logout</Button>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Button variant="ghost" asChild>
                            <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild>
                            <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                  </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
