"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Globe, DollarSign, Briefcase, Plus, X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { getRecommendations } from "@/lib/recommendations";

interface UserPlanFormProps {
    onOpenChange: (open: boolean) => void;
    onSuccess: (recommendations: any) => void;
    initialData?: any;
}

const countriesList = [
    { name: "USA", slug: "usa" },
    { name: "UK", slug: "uk" },
    { name: "Canada", slug: "canada" },
    { name: "Australia", slug: "australia" },
    { name: "Germany", slug: "germany" },
    { name: "South Korea", slug: "south-korea" },
    { name: "Japan", slug: "japan" },
    { name: "Not sure", slug: "not-sure" },
];

export default function UserPlanForm({ onOpenChange, onSuccess, initialData }: UserPlanFormProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        gpaOrPercent: initialData?.gpaOrPercent || "",
        backlogs: initialData?.backlogs?.toString() || "0",
        englishTestType: initialData?.englishTestType || "",
        englishTestScore: initialData?.englishTestScore || "",
        greScore: initialData?.greScore || "",
        satScore: initialData?.satScore || "",
        budget: initialData?.budget || "",
        targetCountries: initialData?.targetCountries || [] as string[],
        fieldOfStudy: initialData?.fieldOfStudy || "",
        intakeSeason: initialData?.intakeSeason || "",
        workExperience: initialData?.workExperience || "",
        projects: initialData?.projects || "",
        level: initialData?.level || "",
    });

    const stepsCount = 4;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleCountry = (slug: string) => {
        setFormData(prev => {
            if (prev.targetCountries.includes(slug)) {
                return { ...prev, targetCountries: prev.targetCountries.filter((c: string) => c !== slug) };
            } else {
                return { ...prev, targetCountries: [...prev.targetCountries, slug] };
            }
        });
    };

    const nextStep = () => {
        if (step === 1 && !formData.gpaOrPercent) {
            alert("Please enter your GPA or Percentage");
            return;
        }
        setStep(prev => Math.min(prev + 1, stepsCount));
    };

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/me", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const recommendations = getRecommendations(formData);
                onSuccess(recommendations);
            } else {
                console.error("Failed to save profile");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2">
                            <Label htmlFor="gpaOrPercent">GPA / Percentage <span className="text-red-500">*</span></Label>
                            <Input
                                id="gpaOrPercent"
                                name="gpaOrPercent"
                                type="text"
                                placeholder="e.g. 3.2 GPA or 75%"
                                value={formData.gpaOrPercent}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="backlogs">Backlogs</Label>
                            <Input
                                id="backlogs"
                                name="backlogs"
                                type="number"
                                placeholder="0"
                                value={formData.backlogs}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                );
            case 2:
                const scorePlaceholder = 
                    formData.englishTestType === "IELTS" ? "0 - 9" :
                    formData.englishTestType === "TOEFL" ? "0 - 120" :
                    formData.englishTestType === "PTE" ? "10 - 90" : "N/A";

                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>English Test Type</Label>
                                <Select onValueChange={(val) => handleSelectChange("englishTestType", val)} value={formData.englishTestType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select test" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="IELTS">IELTS</SelectItem>
                                        <SelectItem value="TOEFL">TOEFL</SelectItem>
                                        <SelectItem value="PTE">PTE</SelectItem>
                                        <SelectItem value="Haven't taken yet">Haven't taken yet</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>English Test Score</Label>
                                <Input
                                    name="englishTestScore"
                                    placeholder={scorePlaceholder}
                                    value={formData.englishTestScore}
                                    onChange={handleChange}
                                    disabled={formData.englishTestType === "Haven't taken yet" || !formData.englishTestType}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="space-y-2">
                                <Label>GRE Score (Optional)</Label>
                                <Input
                                    name="greScore"
                                    placeholder="260 - 340"
                                    value={formData.greScore}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>SAT Score (Optional)</Label>
                                <Input
                                    name="satScore"
                                    placeholder="400 - 1600"
                                    value={formData.satScore}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2">
                            <Label>Budget Range</Label>
                            <Select onValueChange={(val) => handleSelectChange("budget", val)} value={formData.budget}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select budget" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Below $10,000">Below $10,000</SelectItem>
                                    <SelectItem value="$10,000 – $20,000">$10,000 – $20,000</SelectItem>
                                    <SelectItem value="$20,000 – $40,000">$20,000 – $40,000</SelectItem>
                                    <SelectItem value="Above $40,000">Above $40,000</SelectItem>
                                    <SelectItem value="Not sure">Not sure</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Preferred Countries (Multi-select)</Label>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {countriesList.map((country) => (
                                    <button
                                        key={country.slug}
                                        type="button"
                                        onClick={() => toggleCountry(country.slug)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                                            formData.targetCountries.includes(country.slug)
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-secondary text-secondary-foreground border-transparent hover:border-primary/30"
                                        }`}
                                    >
                                        {country.name}
                                        {formData.targetCountries.includes(country.slug) && <Check className="inline-block ml-1 h-3 w-3" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Field of Study</Label>
                                <Input
                                    name="fieldOfStudy"
                                    placeholder="e.g. Computer Science"
                                    value={formData.fieldOfStudy}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Desired Intake</Label>
                                <Select onValueChange={(val) => handleSelectChange("intakeSeason", val)} value={formData.intakeSeason}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select intake" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Fall">Fall</SelectItem>
                                        <SelectItem value="Spring">Spring</SelectItem>
                                        <SelectItem value="Not sure">Not sure</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2">
                            <Label>Work Experience</Label>
                            <Select onValueChange={(val) => handleSelectChange("workExperience", val)} value={formData.workExperience}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select experience" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="None">None</SelectItem>
                                    <SelectItem value="Less than 1 year">Less than 1 year</SelectItem>
                                    <SelectItem value="1–3 years">1–3 years</SelectItem>
                                    <SelectItem value="3+ years">3+ years</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Key Projects</Label>
                            <Textarea
                                name="projects"
                                placeholder="Briefly describe your projects (optional)"
                                value={formData.projects}
                                onChange={handleChange}
                                className="min-h-[100px]"
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step {step} of {stepsCount}</span>
                    <div className="flex gap-1">
                        {[...Array(stepsCount)].map((_, i) => (
                            <div 
                                key={i} 
                                className={`h-1.5 w-8 rounded-full transition-all ${i + 1 <= step ? "bg-primary" : "bg-primary/20"}`}
                            />
                        ))}
                    </div>
                </div>
                <CardTitle className="text-2xl">
                    {step === 1 && "Academic Details"}
                    {step === 2 && "Test Scores"}
                    {step === 3 && "Preferences"}
                    {step === 4 && "Extra Info"}
                </CardTitle>
                <CardDescription>
                    {step === 1 && "Tell us about your previous academic performance."}
                    {step === 2 && "Your English and standardized test results."}
                    {step === 3 && "Where and what do you want to study?"}
                    {step === 4 && "Add your professional highlights."}
                </CardDescription>
            </CardHeader>
            <CardContent className="px-0 py-4">
                {renderStep()}
                
                <div className="flex justify-between mt-8 pt-4 border-t">
                    <Button
                        variant="ghost"
                        onClick={step === 1 ? () => onOpenChange(false) : prevStep}
                        className="text-muted-foreground"
                    >
                        {step === 1 ? "Cancel" : <><ChevronLeft className="mr-2 h-4 w-4" /> Back</>}
                    </Button>
                    
                    {step < stepsCount ? (
                        <Button onClick={nextStep} className="bg-primary hover:bg-primary/90">
                            Continue <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={loading} className="bg-primary hover:bg-primary/90">
                            {loading ? "Processing..." : initialData ? "Update & Get Plan" : "Get My Plan"}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
