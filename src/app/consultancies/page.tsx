import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ExternalLink, Globe, Phone, Mail } from "lucide-react";

const consultancies = [
    {
        id: "1",
        name: "Global Education Experts",
        description: "Specializing in USA, Australia, and Canada admissions with over 15 years of excellence.",
        location: "Putalisadak, Kathmandu",
        rating: 4.9,
        reviews: 1250,
        tags: ["USA Specialist", "High Visa Success", "PTE/IELTS Coaching"],
        website: "https://example.com/consultancy1",
        premium: true
    },
    {
        id: "2",
        name: "Oceanic Study Link",
        description: "Your direct bridge to top-tier Australian and New Zealand universities.",
        location: "New Baneshwor, Kathmandu",
        rating: 4.7,
        reviews: 840,
        tags: ["Australia Focus", "Scholarship Guidance"],
        website: "https://example.com/consultancy2",
        premium: false
    },
    {
        id: "3",
        name: "EuroPath Careers",
        description: "Dedicated guidance for Germany, Netherlands, and Northern European education systems.",
        location: "Maharajgunj, Kathmandu",
        rating: 4.8,
        reviews: 620,
        tags: ["Europe Expert", "Low Tuition Focus"],
        website: "https://example.com/consultancy3",
        premium: true
    }
];

export default function ConsultanciesPage() {
    return (
        <div className="container mx-auto px-4 py-12 space-y-12">
            <section className="text-center max-w-3xl mx-auto space-y-4">
                <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/20 text-primary">Trusted Partners</Badge>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Verified Consultancies</h1>
                <p className="text-xl text-muted-foreground italic">
                    "Connect with genuine and affordable experts who care about your future as much as you do."
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                {consultancies.map((item) => (
                    <Card key={item.id} className={`flex flex-col h-full border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${item.premium ? 'ring-2 ring-primary/20' : ''}`}>
                        {item.premium && (
                            <div className="absolute top-0 right-0">
                                <div className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                                    Recommended
                                </div>
                            </div>
                        )}
                        <CardHeader className="space-y-3">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-amber-500 font-bold">
                                <Star className="h-4 w-4 fill-current" />
                                {item.rating} <span className="text-muted-foreground font-normal">({item.reviews} reviews)</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {item.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-primary" />
                                {item.location}
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {item.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-[10px] font-semibold">{tag}</Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-4 border-t dark:border-zinc-800 bg-slate-50/30 dark:bg-zinc-900/30">
                            <Button asChild className="w-full h-11 rounded-xl font-bold gap-2">
                                <Link href={item.website} target="_blank">
                                    Visit Website <ExternalLink className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <section className="bg-primary/5 rounded-[2.5rem] p-8 md:p-12 text-center space-y-6 border border-primary/10">
                <h2 className="text-2xl md:text-3xl font-bold">Is your consultancy listed here?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We only partner with genuine agencies that provide real value to students. If you'd like to be featured, get in touch with our team.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Button variant="outline" className="rounded-full px-8 h-12" asChild>
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
