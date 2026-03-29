"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { X, Globe, Library, CheckCircle2, ArrowRight } from "lucide-react";

interface PlanResultModalProps {
    recommendations: {
        countries: string[];
        universities: {
            category: "Ambitious" | "Moderate" | "Safe";
            names: string[];
        }[];
    };
    onClose: () => void;
}

export default function PlanResultModal({ recommendations, onClose }: PlanResultModalProps) {
    if (!recommendations) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border rounded-xl shadow-2xl animate-in zoom-in-95 duration-300">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full h-8 w-8 text-muted-foreground hover:bg-secondary"
                >
                    <X className="h-4 w-4" />
                </Button>

                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Your Personalized Plan is Ready!</h2>
                            <p className="text-sm text-muted-foreground">Based on your academic and financial profile.</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                                <Globe className="h-5 w-5 text-primary" /> Recommended Countries
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {recommendations.countries.map((country, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg border border-primary/10">
                                        <div className="h-2 w-2 bg-primary rounded-full" />
                                        <span className="font-medium">{country}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                                <Library className="h-5 w-5 text-primary" /> Sample Universities
                            </h3>
                            <div className="space-y-4">
                                {recommendations.universities.map((group, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                                                group.category === "Ambitious" ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400" :
                                                group.category === "Moderate" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400" :
                                                "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                                            }`}>
                                                {group.category}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {group.names.map((uni, uIdx) => (
                                                <div key={uIdx} className="text-sm py-2 px-3 border border-zinc-100 dark:border-zinc-800 rounded bg-background flex items-center justify-between group">
                                                    {uni}
                                                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="mt-8 flex justify-end gap-4 border-t pt-6">
                        <Button variant="outline" onClick={onClose}>Close</Button>
                        <Button className="bg-primary hover:bg-primary/90" asChild>
                            <a href="/dashboard">Go to Dashboard</a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
