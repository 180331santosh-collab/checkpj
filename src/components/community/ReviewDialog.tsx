"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenLine, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function ReviewDialog({ session, countries }: { session: any, countries: { id: string, name: string, slug: string }[] }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        countryId: "",
        category: "",
        content: ""
    });

    if (!session?.user) {
        return (
            <Button asChild className="rounded-full shadow-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href={`/login?callbackUrl=/community`}>
                    <PenLine className="h-4 w-4 mr-2" /> Share your Advice
                </Link>
            </Button>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error("Failed to post review");
            setIsSuccess(true);
            setFormData({ countryId: "", category: "", content: "" });
            router.refresh();
            
            setTimeout(() => {
                setIsOpen(false);
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) setIsSuccess(false);
            setIsOpen(open);
        }}>
            <DialogTrigger asChild>
                <Button className="rounded-full shadow-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                    <PenLine className="h-4 w-4 mr-2" /> Share your Advice
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                {isSuccess ? (
                    <div className="py-12 flex flex-col items-center justify-center space-y-4">
                        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2 shadow-sm">
                            <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100">Thank You!</DialogTitle>
                        <DialogDescription className="text-center text-lg px-4 text-slate-600 dark:text-slate-400">
                            Your advice has been shared successfully and will help future students.
                        </DialogDescription>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Write a Review</DialogTitle>
                            <DialogDescription>
                                Help other students by sharing your honest experiences or knowledge about the process.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label>Country</Label>
                                <Select required onValueChange={(val) => setFormData({ ...formData, countryId: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the country for advice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map(c => (
                                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select required onValueChange={(val) => setFormData({ ...formData, category: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select topic" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dos-and-donts">Dos and Don'ts</SelectItem>
                                        <SelectItem value="visa">Visa & Immigration</SelectItem>
                                        <SelectItem value="living-costs">Living Costs</SelectItem>
                                        <SelectItem value="part-time-job">Part-time Jobs</SelectItem>
                                        <SelectItem value="academics">Academics</SelectItem>
                                        <SelectItem value="other">Other Advice</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Your Advice</Label>
                                <Textarea 
                                    required 
                                    placeholder="Share what you wish you knew before coming here..." 
                                    className="h-32 resize-none"
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>

                            <div className="pt-4">
                                <Button type="submit" disabled={loading} className="w-full h-11 font-bold cursor-pointer">
                                    {loading ? "Submitting..." : "Submit Review"}
                                </Button>
                            </div>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
