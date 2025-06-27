
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Stethoscope, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navLinks = [
    { href: "/symptom-checker", label: "Symptom Checker" },
    { href: "/find-practitioner", label: "Find a Practitioner" },
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
                  <>
                    <Button variant="ghost" onClick={handleLogout}>Logout</Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="/profile">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Profile</span>
                      </Link>
                    </Button>
                  </>
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
                        <div className="flex items-center gap-2">
                            <Button variant="outline" className="w-full" onClick={handleLogout}>Logout</Button>
                            <Button variant="default" size="icon" asChild>
                                <Link href="/profile">
                                    <User className="h-5 w-5" />
                                    <span className="sr-only">Profile</span>
                                </Link>
                            </Button>
                        </div>
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
