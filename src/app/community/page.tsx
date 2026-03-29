import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ReviewDialog } from "@/components/community/ReviewDialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, MapPin, GraduationCap } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CommunityHub() {
    const session = await getServerSession(authOptions);
    const reviews = await prisma.review.findMany({
        where: { isVerified: true },
        include: {
            user: { select: { name: true, image: true } },
            country: { select: { name: true, slug: true } }
        },
        orderBy: { createdAt: "desc" }
    });

    const countries = await prisma.country.findMany({
        select: { id: true, name: true, slug: true },
        orderBy: { name: "asc" }
    });

    // format text categories
    const formatCategory = (cat: string) => {
        return cat.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    }

    return (
        <div className="container mx-auto px-4 py-12 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Student Community</h1>
                    <p className="text-muted-foreground mt-2 text-lg max-w-2xl">Real advice, dos and don'ts, and personal experiences from Nepali students who are already studying abroad.</p>
                </div>
                <ReviewDialog session={session} countries={countries} />
            </div>

            {reviews.length === 0 ? (
                <div className="text-center p-12 bg-slate-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-zinc-700">
                    <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-bold">No advice shared yet</h3>
                    <p className="text-muted-foreground mt-2">Be the first to share your experience and guide future students!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map(review => (
                        <Card key={review.id} className="h-full flex flex-col border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all bg-background rounded-3xl overflow-hidden hover:-translate-y-1">
                            <CardHeader className="pb-4 flex flex-col space-y-4 relative">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        {review.user.image ? (
                                            <img src={review.user.image} alt={review.user.name||""} className="w-10 h-10 rounded-full bg-slate-100 object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {review.user.name?.[0] || 'A'}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-bold text-sm">{review.user.name || "Anonymous Member"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Badge variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] font-bold uppercase tracking-wider">{formatCategory(review.category)}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col">
                                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic flex-grow">"{review.content}"</p>
                                <div className="flex items-center justify-between mt-6 pt-4 text-xs text-muted-foreground border-t border-slate-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-1.5 font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">
                                        <MapPin className="h-3 w-3" />
                                        <Link href={`/country/${review.country.slug}`} className="hover:underline">{review.country.name}</Link>
                                    </div>
                                    <span className="font-medium opacity-60 px-1">{new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
