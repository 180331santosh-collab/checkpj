import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, MapPin, Calendar, Star, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StudyPlanSection from "@/components/dashboard/StudyPlanSection";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
        include: {
            profile: true,
            favorites: {
                include: { country: true }
            }
        }
    });

    return (
        <div className="container mx-auto px-4 py-12 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome, {session.user.name}</h1>
                    <p className="text-muted-foreground mt-1">Track your study abroad applications and profile here.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/profile">
                        <Settings className="mr-2 h-4 w-4" /> Edit Profile
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* New Study Plan Section */}
                    <StudyPlanSection profile={user?.profile} />

                    {/* Favorites Section */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-500" /> Favorite Countries
                                </CardTitle>
                                <CardDescription>Countries you are currently exploring</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {user?.favorites.length === 0 ? (
                                <div className="text-center py-12 bg-slate-50 dark:bg-zinc-900/50 rounded-lg border-2 border-dashed dark:border-zinc-800">
                                    <p className="text-sm text-muted-foreground">No favorite countries yet.</p>
                                    <Button variant="link" asChild>
                                        <Link href="/countries">Explore now</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {user?.favorites.map((fav) => (
                                        <Link
                                            key={fav.countryId}
                                            href={`/country/${fav.country.slug}`}
                                            className="flex items-center gap-4 p-4 border dark:border-zinc-800 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors"
                                        >
                                            <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full text-primary shrink-0">
                                                <MapPin className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">{fav.country.name}</h4>
                                                <p className="text-xs text-muted-foreground line-clamp-1">{fav.country.heroTitle}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Profile Snapshot */}
                <Card className="md:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary" /> Profile Snapshot
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm text-muted-foreground">Level</span>
                            <span className="font-medium">{user?.profile?.level || "Not set"}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm text-muted-foreground">GPA/Percent</span>
                            <span className="font-medium">{user?.profile?.gpaOrPercent || "Not set"}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm text-muted-foreground">Desired Intake</span>
                            <span className="font-medium flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {user?.profile?.intakeSeason || "Not set"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm text-muted-foreground">Backlogs</span>
                            <span className="font-medium">{user?.profile?.backlogs ?? "0"}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-muted-foreground">Budget</span>
                            <span className="font-medium text-xs max-w-[120px] text-right truncate" title={user?.profile?.budget || "Not set"}>{user?.profile?.budget || "Not set"}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
