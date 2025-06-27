"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, FileText, Heart, Loader2, Siren } from "lucide-react";

import { analyzeSymptoms, AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const symptomCheckerSchema = z.object({
  symptoms: z.string().min(10, {
    message: "Please describe your symptoms in at least 10 characters.",
  }),
});

type SymptomCheckerFormValues = z.infer<typeof symptomCheckerSchema>;

export default function SymptomCheckerPage() {
  const [analysis, setAnalysis] = useState<AnalyzeSymptomsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SymptomCheckerFormValues>({
    resolver: zodResolver(symptomCheckerSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  async function onSubmit(data: SymptomCheckerFormValues) {
    setIsLoading(true);
    setAnalysis(null);

    try {
      const result = await analyzeSymptoms({ symptoms: data.symptoms });
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
  
  const isSevere = analysis?.severity?.toLowerCase() === 'severe';

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
                    {isSevere && (
                      <Alert variant="destructive">
                        <Siren className="h-4 w-4" />
                        <AlertTitle>High Severity Detected</AlertTitle>
                        <AlertDescription>
                          Based on your symptoms, we recommend seeking medical attention promptly. You can find a practitioner or view your saved contacts.
                        </AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Potential Issues</h3>
                        <p className="text-sm text-muted-foreground">{analysis.analysis}</p>
                    </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><Heart className="h-5 w-5 text-primary" /> Severity Assessment</h3>
                        <p className="text-sm text-muted-foreground capitalize">{analysis.severity}</p>
                    </div>
                 </div>
              )}
            </CardContent>
            {isSevere && (
                <CardFooter className="flex gap-2">
                    <Button asChild>
                        <Link href="/find-practitioner">Find a Practitioner</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/profile">View My GP</Link>
                    </Button>
                </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
