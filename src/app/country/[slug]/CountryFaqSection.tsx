"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, ChevronDown, ChevronUp, Maximize2, Minimize2 } from "lucide-react";

interface FAQ {
    q: string;
    a: string;
}

export default function CountryFaqSection({ faqs }: { faqs: FAQ[] }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const displayedFaqs = isExpanded ? faqs : faqs.slice(0, 2);
    const hasMore = faqs.length > 2;

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" /> FAQ
                    </div>
                    {hasMore && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setIsExpanded(!isExpanded)}
                            title={isExpanded ? "Collapse" : "Expand"}
                        >
                            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-4">
                    {displayedFaqs.map((faq, i) => (
                        <div key={i} className="space-y-2">
                            <p className="font-semibold text-sm">{faq.q}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{faq.a}</p>
                        </div>
                    ))}
                </div>
                
                {hasMore && (
                    <div className="pt-2 flex justify-center border-t dark:border-zinc-800 mt-4">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-2 text-xs w-full text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? (
                                <>See less <ChevronUp className="ml-1 h-3 w-3" /></>
                            ) : (
                                <>See more <ChevronDown className="ml-1 h-3 w-3" /></>
                            )}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
