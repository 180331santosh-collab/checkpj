import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Globe, ArrowRight, Building2, Plane } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function LevelPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    const levelMap: Record<string, { title: string, description: string }> = {
        "bachelor": {
            title: "Undergrad (Bachelors)",
            description: "Stepping into your undergraduate journey requires careful planning from the start."
        },
        "master": {
            title: "Masters Degrees",
            description: "Move towards specialization with world-class Master's programs across the globe."
        },
        "phd": {
            title: "PhD Seekers",
            description: "Comprehensive guides for doctoral research, fellowships, and academic positions."
        }
    };

    const levelInfo = levelMap[slug] || { title: "Education Level", description: "Planning your path forward." };

    const countriesData = await prisma.country.findMany({
        select: { name: true, slug: true, heroTitle: true, image: true, overview: true }
    });

    // Sorting logic: Move USA to the first position for Masters and PhD
    let countries = [...countriesData];
    if (slug === "master" || slug === "phd") {
        const usaIndex = countries.findIndex(c => c.slug === "usa");
        if (usaIndex > -1) {
            const [usa] = countries.splice(usaIndex, 1);
            countries.unshift(usa);
        }
    }

    return (
        <div className="container mx-auto px-4 py-12 space-y-16 pb-24">
            <section className="text-center max-w-3xl mx-auto space-y-6 pt-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-2">
                    <Globe className="h-3.5 w-3.5" /> Global Education
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight italic text-primary/90">{levelInfo.title}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed italic">"{levelInfo.description}"</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-mt-20">
                <Card className="bg-slate-50 dark:bg-zinc-900/40 border-slate-100 dark:border-zinc-800 rounded-[2rem] overflow-hidden shadow-sm">
                    <CardHeader className="border-b dark:border-zinc-800 bg-background/50">
                        <CardTitle className="text-xl font-bold flex items-center gap-3">
                            <CheckCircle2 className="h-6 w-6 text-primary" />
                            Essential Document Checklist
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-8">
                        {[
                            "Academic Transcripts & Character Certificates",
                            "Valid Passport (at least 6 months validity)",
                            "Language Proficiency Results (IELTS/PTE/TOEFL)",
                            "Statement of Purpose (SOP)",
                            "Letters of Recommendation (LOR)",
                            "Financial Documentation (Bank balance/Source)",
                            "Standardized Tests (SAT/GRE/GMAT if applicable)"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="h-2 w-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                                <span className="text-sm md:text-base font-medium opacity-90 transition-opacity group-hover:opacity-100">{item}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="border-slate-100 dark:border-zinc-800 rounded-[2rem] overflow-hidden shadow-sm">
                    <CardHeader className="border-b dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50">
                        <CardTitle className="text-xl font-bold">Planning Stages & Roadmap</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8 pt-8">
                        {[
                            { step: 1, title: "Research & Preparation", desc: "Shortlist universities and prepare for language tests." },
                            { step: 2, title: "Application Phase", desc: "Submit applications and secure your offer letter/I-20." },
                            { step: 3, title: "Financials & Visa", desc: "Show funds and apply for the student visa at the embassy." }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-5 group items-start">
                                <div className="h-10 w-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 font-bold shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                                    {item.step}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Top Destinations</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Explore world-class academic excellence and cultural heritage in these premier student destinations.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {countries.map((country) => (
                        <Link key={country.slug} href={`/country/${country.slug}`} className="group block relative h-[450px] overflow-hidden rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                             {/* Background Image Container */}
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                {country.image ? (
                                    <img 
                                        src={country.image} 
                                        alt={country.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0 brightness-[0.7] group-hover:brightness-[0.9]"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                        <Globe className="h-16 w-16 text-white/10" />
                                    </div>
                                )}
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                            </div>

                            <div className="relative z-10 h-full p-8 flex flex-col justify-end space-y-6">
                               <div className="space-y-3">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                                        {country.slug === 'usa' ? 'Most Popular' : 'Premium Choice'}
                                    </div>
                                    <h3 className="text-3xl font-black text-white tracking-tight drop-shadow-xl">{country.name}</h3>
                                    <p className="text-sm text-zinc-100 line-clamp-3 font-medium leading-relaxed drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                                        {country.heroTitle || (country.overview ? country.overview.substring(0, 120) + "..." : `Discover everything about studying in ${country.name}.`)}
                                    </p>
                               </div>
                               
                               <div className="flex items-center gap-2 text-white font-bold text-sm bg-white/10 backdrop-blur-md rounded-full px-6 py-3 w-fit border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all shadow-lg">
                                   Explore Guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                               </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="bg-slate-50 dark:bg-zinc-900/50 rounded-[3rem] p-8 md:p-16 border dark:border-zinc-800 space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight italic">Ready to Start Your Journey?</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">"The first step towards your dream is often the hardest. Let us help you find the right path and the best travel deals."</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-background border-slate-100 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500">
                        <CardHeader className="p-8 pb-4">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Building2 className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="text-3xl font-bold">Find a Trusted Consultancy</CardTitle>
                            <CardDescription className="text-lg">Connect with verified experts specializing in {levelInfo.title}.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <Button asChild className="w-full h-14 rounded-2xl font-bold text-lg gap-2 shadow-lg shadow-primary/20">
                                <Link href="/consultancies">Explore Consultancies <ArrowRight className="h-5 w-5" /></Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-background border-slate-100 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500">
                        <CardHeader className="p-8 pb-4">
                            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Plane className="h-8 w-8 text-blue-500" />
                            </div>
                            <CardTitle className="text-3xl font-bold">Book Your Travel</CardTitle>
                            <CardDescription className="text-lg">Get student-exclusive rates on flights and travel insurance.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <Button asChild className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg gap-2 shadow-lg shadow-blue-500/20">
                                <Link href="/travel">Check Flight Deals <ArrowRight className="h-5 w-5" /></Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
