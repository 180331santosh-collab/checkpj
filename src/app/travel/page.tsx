import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ExternalLink, Ticket, Plane } from "lucide-react";

const travelAgencies = [
    {
        id: "1",
        name: "SkyBound Travels & Tours",
        description: "Specializing in student fares with extra luggage allowance for US and Canadian destinations.",
        location: "Thamel, Kathmandu",
        rating: 4.8,
        reviews: 950,
        tags: ["Student Fares", "Extra Baggage", "Visa Insurance"],
        website: "https://example.com/travel1",
        premium: true
    },
    {
        id: "2",
        name: "Global Wings Travel",
        description: "Your best partner for Australian and European travel, offering discounted rates and flexible date changes.",
        location: "Tripureshwor, Kathmandu",
        rating: 4.6,
        reviews: 420,
        tags: ["Australia/Europe", "Flexible Dates"],
        website: "https://example.com/travel2",
        premium: false
    },
    {
        id: "3",
        name: "AeroLink Travel Management",
        description: "Comprehensive travel solutions including flight bookings, travel insurance, and foreign exchange assistance.",
        location: "Kumaripati, Lalitpur",
        rating: 4.9,
        reviews: 1100,
        tags: ["Full Service", "Travel Insurance", "24/7 Support"],
        website: "https://example.com/travel3",
        premium: true
    }
];

export default function TravelPage() {
    return (
        <div className="container mx-auto px-4 py-12 space-y-12">
            <section className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Ticket className="h-4 w-4" /> Travel & Logistics
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Verified Travel Agencies</h1>
                <p className="text-xl text-muted-foreground italic">
                    "Find reliable travel partners offering student-exclusive rates on flights and essential travel insurance."
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                {travelAgencies.map((agency) => (
                    <Card key={agency.id} className={`flex flex-col h-full border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${agency.premium ? 'ring-2 ring-blue-500/20' : ''}`}>
                        {agency.premium && (
                            <div className="absolute top-0 right-0">
                                <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                                    Recommended
                                </div>
                            </div>
                        )}
                        <CardHeader className="space-y-3">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-2xl font-bold">{agency.name}</CardTitle>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-amber-500 font-bold">
                                <Star className="h-4 w-4 fill-current" />
                                {agency.rating} <span className="text-muted-foreground font-normal">({agency.reviews} reviews)</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {agency.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-blue-500" />
                                {agency.location}
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {agency.tags.map(tag => (
                                    <Badge key={tag} className="text-[10px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-none hover:bg-blue-100 dark:hover:bg-blue-500/20">{tag}</Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-4 border-t dark:border-zinc-800 bg-slate-50/30 dark:bg-zinc-900/30">
                            <Button asChild className="w-full h-11 rounded-xl font-bold gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                                <Link href={agency.website} target="_blank">
                                    Visit Website <ExternalLink className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <section className="bg-blue-500/5 rounded-[2.5rem] p-8 md:p-12 text-center space-y-6 border border-blue-500/10">
                <h2 className="text-2xl md:text-3xl font-bold">Are you a Travel Agency?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We partner with agencies that offer genuine value and special rates for students. If you provide reliable student ticketing and insurance, contact us to be listed.
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
