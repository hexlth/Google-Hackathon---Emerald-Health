"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileText, Heart, Loader2, Siren, ImageIcon, X, Mail } from "lucide-react";

import { detectSeverity, DetectSeverityOutput } from "@/ai/flows/detect-severity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const symptomCheckerSchema = z.object({
  symptoms: z.string().min(10, {
    message: "Please describe your symptoms in at least 10 characters.",
  }),
});

type SymptomCheckerFormValues = z.infer<typeof symptomCheckerSchema>;

export default function SymptomCheckerPage() {
  const [analysis, setAnalysis] = useState<DetectSeverityOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [gpEmail] = useState("dr.jane.smith@health.ie"); // Mock GP email for prototype
  const { toast } = useToast();

  const form = useForm<SymptomCheckerFormValues>({
    resolver: zodResolver(symptomCheckerSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
            variant: "destructive",
            title: "File too large",
            description: "Please upload an image smaller than 10MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: SymptomCheckerFormValues) {
    setIsLoading(true);
    setAnalysis(null);

    try {
      const result = await detectSeverity({ 
        symptoms: data.symptoms,
        photoDataUri: imagePreview || undefined,
      });
      setAnalysis(result);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "An error occurred while analyzing symptoms. Please try again later.",
      })
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEmailGp = () => {
    if (!gpEmail) {
      toast({
        variant: "destructive",
        title: "No GP Email Found",
        description: (
          <p>
            Please add your GP's email address in your <Link href="/profile" className="underline">Profile</Link>.
          </p>
        ),
      });
      return;
    }

    const subject = "Symptom Checker Results";
    let body = `Hello,\n\nI used the Emerald Health symptom checker and wanted to share the results.\n\n`;
    body += `My symptoms: ${form.getValues("symptoms")}\n\n`;
    if (analysis?.explanation) {
        body += `AI Analysis: ${analysis.explanation}\n\n`;
    }
    body += 'Thank you.';

    window.location.href = `mailto:${gpEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  const suggestImmediateAction = analysis?.suggestImmediateAction;

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Symptom Checker</CardTitle>
              <CardDescription>
                Describe your symptoms below. Our AI will provide a preliminary analysis. This is not a substitute for professional medical advice.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe your symptoms</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'I have a persistent cough, a high fever, and I feel very tired.'"
                            className="min-h-[150px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Upload a Photo (Optional)</FormLabel>
                    <div className="relative flex flex-col items-center justify-center w-full p-6 transition-colors border-2 border-dashed rounded-lg cursor-pointer border-muted-foreground/30 hover:border-primary">
                        <Input
                            id="symptom-photo"
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                            disabled={isLoading}
                        />
                        {imagePreview ? (
                            <div className="relative">
                                <Image src={imagePreview} alt="Symptom preview" width={200} height={200} className="object-contain rounded-md max-h-[200px]" />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-0 right-0 w-6 h-6 rounded-full bg-card/50 hover:bg-card"
                                    onClick={() => {
                                        setImagePreview(null);
                                        const fileInput = document.getElementById('symptom-photo') as HTMLInputElement;
                                        if (fileInput) fileInput.value = "";
                                    }}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <ImageIcon className="w-10 h-10 mx-auto text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                    <span className="font-semibold text-primary">Click to upload</span> or drag & drop
                                </p>
                                <p className="text-xs text-muted-foreground">Helps the AI provide a more accurate analysis.</p>
                            </div>
                        )}
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Analyze Symptoms
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="min-h-[400px]">
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>Results will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading && (
                <div className="flex flex-col items-center justify-center space-y-4 pt-10">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-muted-foreground">Analyzing your symptoms...</p>
                </div>
              )}
              {analysis && (
                 <div className="space-y-4">
                    {suggestImmediateAction && (
                      <Alert variant="destructive">
                        <Siren className="h-4 w-4" />
                        <AlertTitle>Immediate Action Suggested</AlertTitle>
                        <AlertDescription>
                          Based on your symptoms, we recommend seeking medical attention promptly. You can find a practitioner or contact your GP below.
                        </AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> AI Explanation</h3>
                        <p className="text-sm text-muted-foreground">{analysis.explanation}</p>
                    </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><Heart className="h-5 w-5 text-primary" /> Severity Assessment</h3>
                        <p className="text-sm text-muted-foreground capitalize">{analysis.isSerious ? "Considered Potentially Serious" : "Not Considered Serious"}</p>
                    </div>
                 </div>
              )}
            </CardContent>
            {suggestImmediateAction && (
                <CardFooter className="flex gap-2">
                    <Button asChild>
                        <Link href="/find-practitioner">Find a Practitioner</Link>
                    </Button>
                    <Button variant="outline" onClick={handleEmailGp}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email My GP
                    </Button>
                </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
