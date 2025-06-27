import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Stethoscope } from 'lucide-react';

const Header = () => {
  // Mock auth state - replace with real auth logic
  const isLoggedIn = false;

  const navLinks = [
    { href: "/symptom-checker", label: "Symptom Checker" },
    { href: "/find-practitioner", label: "Find a Practitioner" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Emerald Health Finder
            </span>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-6">
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} className="block px-2 py-1 text-lg">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-2">
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
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
