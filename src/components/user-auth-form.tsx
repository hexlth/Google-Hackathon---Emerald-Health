"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formType: "login" | "signup";
}

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
})

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
})

const GoogleIcon = () => (
    <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      ></path>
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      ></path>
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      ></path>
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      ></path>
    </svg>
  );

export function UserAuthForm({ className, formType, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const router = useRouter();

  const schema = formType === 'login' ? loginSchema : signupSchema;
  type FormValues = z.infer<typeof schema>;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: formType === 'login' 
      ? { email: "", password: "" } 
      // @ts-ignore
      : { email: "", password: "", confirmPassword: "" },
  })

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    // This is a mock API call.
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false)

    toast({
      title: formType === 'login' ? "Login Successful" : "Account Created",
      description: formType === 'login' ? "Welcome back!" : "You have been successfully signed up.",
    })
    // In a real app, you'd handle Firebase email/password auth here.
    // For now, we just redirect.
    router.push('/profile');
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Signed In Successfully",
        description: "Welcome! You are now logged in.",
      });
      router.push("/profile");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with Google Sign-In. Please try again.",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input 
                    placeholder="name@example.com" 
                    type="email" 
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading || isGoogleLoading}
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            // @ts-ignore
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label>Password</Label>
                <FormControl>
                  <Input 
                    type="password"
                    disabled={isLoading || isGoogleLoading}
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {formType === 'signup' && (
             <FormField
                control={form.control}
                // @ts-ignore
                name="confirmPassword"
                render={({ field }) => (
                <FormItem>
                    <Label>Confirm Password</Label>
                    <FormControl>
                    <Input
                        type="password"
                        disabled={isLoading || isGoogleLoading}
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          )}
          <Button disabled={isLoading || isGoogleLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {formType === 'login' ? "Login" : "Create account"}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading || isGoogleLoading} onClick={handleGoogleSignIn}>
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon />
        )}{" "}
        Google
      </Button>
    </div>
  )
}
