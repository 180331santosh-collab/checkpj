export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 pt-8 pb-16 max-w-4xl">
            <div className="space-y-12">
                <section className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Mission</h1>
                    <p className="text-xl text-muted-foreground">
                        Bridging the gap between dreams and reality for adventurous Nepali minds.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed">
                        <p>
                            Applying to study abroad can be one of the most stressful yet rewarding experiences in a student&apos;s life. For many Nepali students, the process is often clouded by fragmented information, misleading agents, and confusing requirements.
                        </p>
                        <p>
                            PadhnaJaam was founded to change that. We believe in transparency and empowerment. Our platform provides curated, clear, and context-specific information to help you navigate the complexities of international admissions from Nepal.
                        </p>
                    </div>
                    <div className="bg-slate-100 dark:bg-zinc-900/50 rounded-2xl p-8 space-y-4">
                        <h3 className="font-bold text-xl">Why choose us?</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span className="text-sm font-medium">Authentic Nepali context</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span className="text-sm font-medium">Free and open information</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span className="text-sm font-medium">Structured document checklists</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span className="text-sm font-medium">Level-specific application guides</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
