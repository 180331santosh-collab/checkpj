import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import prisma from "@/lib/prisma";
import SafeImage from "@/components/common/SafeImage";

export const metadata = {
    title: "Explore Countries | PadhnaJaam",
    description: "Browse all study abroad destinations and find the right one for your education level.",
};

export const dynamic = "force-dynamic";

export default async function CountriesPage() {
    const allCountries = await prisma.country.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div className="container mx-auto px-4 pt-6 pb-12 space-y-12">
            <section className="text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Explore Study Destinations</h1>
                <p className="text-xl text-muted-foreground">
                    Detailed guides and requirements for Nepali students looking to study abroad.
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {allCountries.map((country) => (
                    <Link key={country.slug} href={`/country/${country.slug}`} className="group block h-full">
                        <Card className="h-full border-slate-100 dark:border-slate-800 overflow-hidden bg-card transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/20 group-hover:-translate-y-1">
                            <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                                <SafeImage
                                    src={country.image || ""}
                                    alt={country.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    fallback={
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                                            <Globe className="h-12 w-12 text-primary/20 group-hover:scale-110 transition-transform" />
                                        </div>
                                    }
                                />
                            </div>
                            <CardHeader>
                                <CardTitle>{country.name}</CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {country.overview}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="w-full py-2.5 px-4 rounded-md bg-secondary text-secondary-foreground text-sm font-medium text-center transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                    View process
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
