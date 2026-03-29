import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Globe, School, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import prisma from "@/lib/prisma";
import AdSlot from "@/components/common/AdSlot";
import SafeImage from "@/components/common/SafeImage";

export default async function Home() {
  const featuredCountries = await prisma.country.findMany({
    where: { featured: true },
    take: 4,
  });

  const levels = [
    { 
      name: "Undergraduate", 
      subtitle: "For high school graduates seeking bachelor degrees.",
      bullets: ["IELTS / PTE", "Statement of Purpose (SOP)", "SAT", "Minimum 2.5 GPA or equivalent"],
      icon: School, 
      slug: "bachelor", 
      image: "/undergrad_level_aesthetic_1773571819109.png", 
      color: "bg-white text-slate-900 border-slate-200 dark:bg-zinc-950 dark:text-zinc-100 dark:border-zinc-800",
      btnVariant: "outline" as const,
      btnLabel: "Learn More"
    },
    { 
      name: "Graduate / Masters", 
      subtitle: "For degree holders pursuing advanced research or MBAs.",
      bullets: ["IELTS / TOEFL", "Letters of Recommendation (LOR)", "Statement of Purpose (SOP)", "GRE / GMAT (Select Programs)"],
      icon: BookOpen, 
      slug: "master", 
      image: "/masters_level_aesthetic_1773571854137.png", 
      color: "bg-zinc-950 text-white border-zinc-900 shadow-2xl z-20 dark:bg-white dark:text-zinc-950 dark:border-zinc-200",
      btnVariant: "secondary" as const,
      btnLabel: "View Requirements"
    },
    { 
      name: "Post-Graduate / PhD", 
      subtitle: "For research-intensive terminal degree programs.",
      bullets: ["IELTS / TOEFL", "Statement of Purpose (SOP)", "Letters of Recommendation (LOR)", "Research Paper (if any)", "GRE / GMAT"],
      icon: Globe, 
      slug: "phd", 
      image: "/phd_level_aesthetic_1773571875377.png", 
      color: "bg-white text-slate-900 border-slate-200 dark:bg-zinc-950 dark:text-zinc-100 dark:border-zinc-800",
      btnVariant: "outline" as const,
      btnLabel: "Inquire Now"
    },
  ];

  return (
    <div className="flex flex-col gap-16 pb-24 bg-background text-foreground transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 flex flex-col items-center text-center overflow-hidden w-full">
        {/* Diamond Grid/Strip Pattern Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4] dark:opacity-[0.2] dark:invert"
             style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23000000' stroke-width='0.5' stroke-opacity='0.15' /%3E%3C/svg%3E")`
             }}
        />

        {/* Precise Positioned Color Blobs */}
        <div className="absolute top-[0%] left-[-5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-sky-200/50 dark:bg-sky-900/40 blur-[100px] md:blur-[140px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-pink-200/50 dark:bg-pink-900/40 blur-[100px] md:blur-[140px] rounded-full pointer-events-none z-0" />

        <div className="container mx-auto px-4 relative z-10 w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/50 dark:bg-zinc-800/50 text-[10px] md:text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase mb-6 md:mb-8 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Empowering Nepali Students</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight mb-6 md:mb-8 max-w-4xl leading-[1.05] text-zinc-950 dark:text-zinc-50">
            Your future abroad <br />
            starts with <span className="italic font-medium">clarity.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 mb-10 md:mb-12 max-w-2xl leading-relaxed font-medium">
            Reliable information, step-by-step guides, and personalize <br className="hidden sm:block" />
            country recommendations for every Nepali student <br className="hidden sm:block" />
            education level.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="h-14 px-8 text-base font-bold transition-all hover:scale-105 active:scale-95 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-xl" asChild>
              <Link href="/countries">Explore Countries</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold transition-all hover:scale-105 active:scale-95 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm text-zinc-950 dark:text-zinc-50 shadow-sm" asChild>
              <Link href="/dashboard?action=start-plan">Get Customized Plan</Link>
            </Button>
          </div>
        </div>
      </section>
      <div className="relative overflow-hidden">
        {/* Interconnected Line Pattern for Middle Background */}
        <div className="absolute inset-0 z-0 opacity-[0.07] dark:opacity-[0.2] pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 L60 0 L120 60 L60 120 Z' fill='none' stroke='currentColor' stroke-width='0.5'/%3E%3Ccircle cx='60' cy='60' r='1' fill='currentColor'/%3E%3C/svg%3E")`, backgroundSize: '120px 120px' }} />
        
        {/* Featured Countries Section */}
        <section className="container mx-auto px-4 scroll-mt-20 relative z-10 py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Popular Destinations</h2>
              <p className="text-base sm:text-lg text-muted-foreground mt-2">The most preferred choices for Nepali students.</p>
            </div>
            <Button variant="ghost" asChild className="group text-primary hover:bg-primary/5 rounded-full self-start sm:self-auto">
              <Link href="/countries" className="flex items-center">
                View all countries <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCountries.map((country) => (
              <Link key={country.slug} href={`/country/${country.slug}`} className="group block h-full">
                <Card className="h-full border-slate-100 dark:border-zinc-800 overflow-hidden bg-card transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:border-primary/30 group-hover:-translate-y-2 rounded-[2rem]">
                  <div className="h-52 bg-slate-200 dark:bg-zinc-900 relative overflow-hidden">
                    <SafeImage
                      src={country.image || ""}
                      alt={country.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      fallback={
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                          <Globe className="h-12 w-12 text-primary/20 group-hover:scale-110 transition-transform" />
                        </div>
                      }
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{country.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                      {country.overview}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full py-3 rounded-full bg-secondary text-secondary-foreground text-sm font-bold text-center transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                      Explore Destination
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Levels Section (Corrected to Horizontal Layout) */}
        <section id="levels" className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Requirements by Grade Level</h2>
            <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              Find detailed checklists and application steps tailored to your current academic background.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
            {levels.map((level, i) => (
              <Link key={level.slug} href={`/level/${level.slug}`} className="group block h-full">
                <Card className={`relative h-full overflow-hidden border transition-all duration-500 hover:shadow-2xl rounded-[2.5rem] flex flex-col p-8 md:p-10 ${level.color}`}>
                  
                  {/* Low Opacity Background Image Overlay */}
                  <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                    <SafeImage src={level.image} alt="" className="w-full h-full object-cover grayscale" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full space-y-8">
                    {/* Icon & Title Section */}
                    <div className="space-y-4">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-2 shadow-sm`}>
                        <level.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{level.name}</h3>
                      <p className="text-sm opacity-70 leading-relaxed font-medium">
                        {level.subtitle}
                      </p>
                    </div>

                    {/* Bullet Points Section */}
                    <div className="flex-grow">
                      <ul className="space-y-4">
                        {level.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm md:text-base font-medium opacity-90 group-hover:translate-x-1 transition-transform">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Button Section */}
                    <div className="pt-8 mt-auto">
                      <Button 
                        variant={level.btnVariant} 
                        className={`w-full rounded-2xl h-14 text-base font-bold transition-all shadow-md group-hover:scale-[1.02] active:scale-95 ${level.slug === 'master' ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white dark:bg-zinc-200 dark:border-zinc-300 dark:hover:bg-zinc-300 dark:text-black' : 'hover:bg-primary hover:text-white dark:hover:bg-zinc-100 dark:hover:text-black dark:text-zinc-300'}`}
                      >
                        {level.btnLabel}
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* NEW Bottom CTA Section */}
      <section className="container mx-auto px-4 py-4 mb-20 relative">
        <Card className="relative overflow-hidden bg-primary text-primary-foreground border-none rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-16 text-center shadow-2xl shadow-primary/30 active:scale-95 transition-all">
          {/* Smoke/Curvy Mesh line effect (Refined) */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* The Mesh/Smoke effect on the left side */}
            <div className="absolute top-0 left-[-2%] w-[45%] h-full opacity-30 dark:opacity-50 blur-[1px]">
              <svg className="w-full h-full text-white/40" viewBox="0 0 300 600" preserveAspectRatio="none">
                {[...Array(15)].map((_, i) => (
                  <path
                    key={i}
                    d={`M${-50 + i * 8},600 Q${50 + i * 12},300 ${-20 + i * 5},0`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s`, opacity: 0.15 + (i / 20) * 0.4 }}
                  />
                ))}
              </svg>
            </div>
            
            {/* Additional glow for smoke */}
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[80%] bg-white/5 blur-[100px] rounded-full animate-pulse" />
            
            {/* Gradient Overlay for integration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent opacity-90" />
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 hidden lg:block z-10">
            <GraduationCap className="h-64 w-64 rotate-12" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6 w-full">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to find your perfect university?
            </h2>
            <p className="text-base sm:text-lg opacity-90 leading-relaxed font-medium">
              Join thousands of Nepali students who used our customized plan to simplify their study abroad journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg font-bold shadow-xl transition-all hover:scale-105 active:scale-95 rounded-full">
                <Link href="/dashboard?action=start-plan">Get My Customized Plan</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Subtle Services Links */}
      <section className="container mx-auto px-4 pb-16">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/30 transition-colors">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-200/50 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Verified Partners
            </div>
            <h3 className="font-bold text-2xl md:text-3xl tracking-tight">Need extra help with your journey?</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Having a hard time finding genuine and affordable consultancies or student travel deals? We've vetted some recommended options to save you time and money.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <Button className="rounded-full h-12 px-8 font-bold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-md" asChild>
              <Link href="/consultancies">Find Consultancies</Link>
            </Button>
            <Button variant="outline" className="rounded-full h-12 px-8 font-bold border-slate-300 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800" asChild>
              <Link href="/travel">Travel Deals</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
