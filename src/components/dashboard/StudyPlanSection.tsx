"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, ChevronRight } from "lucide-react";
import UserPlanForm from "@/components/forms/UserPlanForm";
import PlanResultModal from "@/components/modals/PlanResultModal";
import { getRecommendations } from "@/lib/recommendations";

interface StudyPlanSectionProps {
    profile?: any;
}

export default function StudyPlanSection({ profile }: StudyPlanSectionProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [recommendations, setRecommendations] = useState<any>(null);

    const hasProfile = !!profile?.gpaOrPercent;

    useEffect(() => {
        if (searchParams.get("action") === "start-plan") {
            setIsFormOpen(true);
            router.replace("/dashboard", { scroll: false });
        }
    }, [searchParams, router]);

    const handleSuccess = (results: any) => {
        setRecommendations(results);
        setIsFormOpen(false);
    };

    const handleViewPlan = () => {
        const results = getRecommendations(profile);
        setRecommendations(results);
    };

    return (
        <div className="space-y-6">
            <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-[2rem] shadow-lg">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="h-24 w-24 text-primary" />
                </div>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" /> 
                        {hasProfile ? "Your Personalized Study Plan" : "Get Your Personalized Study Plan"}
                    </CardTitle>
                    <CardDescription>
                        {hasProfile 
                            ? "We've analyzed your profile. You can view your recommendations or update your details."
                            : "Fill in your details to get country and university recommendations tailored to your profile."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                    {hasProfile ? (
                        <>
                            <Button onClick={handleViewPlan} className="bg-primary hover:bg-primary/90">
                                View My Recommendations <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button onClick={() => setIsFormOpen(true)} variant="outline">
                                Update Profile
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-primary/90">
                            Start / Fill Details <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* Modal Overlay for Form */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-card border rounded-xl shadow-2xl w-full max-w-lg p-6 md:p-8 animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh]">
                        <UserPlanForm 
                            onOpenChange={setIsFormOpen} 
                            onSuccess={handleSuccess}
                            initialData={profile}
                        />
                    </div>
                </div>
            )}

            {/* Results Modal */}
            {recommendations && (
                <PlanResultModal 
                    recommendations={recommendations} 
                    onClose={() => setRecommendations(null)} 
                />
            )}
        </div>
    );
}
