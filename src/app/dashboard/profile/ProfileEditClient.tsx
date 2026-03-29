"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import UserPlanForm from "@/components/forms/UserPlanForm";
import PlanResultModal from "@/components/modals/PlanResultModal";
import { toast } from "sonner";

export default function ProfileEditClient({ initialData }: { initialData: any }) {
    const [recommendations, setRecommendations] = useState<any>(null);

    const handleSuccess = (results: any) => {
        setRecommendations(results);
        toast.success("Profile updated successfully!");
    };

    return (
        <div className="space-y-8">
            <Card className="border-slate-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                <div className="h-2 bg-primary w-full" />
                <CardContent className="p-6 md:p-8">
                    <UserPlanForm 
                        onOpenChange={() => {}} // No-op for direct page
                        onSuccess={handleSuccess}
                        initialData={initialData}
                    />
                </CardContent>
            </Card>

            {recommendations && (
                <PlanResultModal 
                    recommendations={recommendations} 
                    onClose={() => setRecommendations(null)} 
                />
            )}
        </div>
    );
}
