import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-black border-t dark:border-zinc-900 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                            <GraduationCap className="h-8 w-8" />
                            <span>PadhnaJaam</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Empowering Nepali students to achieve their dreams of studying abroad with clarity and confidence.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Countries</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/country/usa" className="hover:text-primary transition-colors">USA</Link></li>
                            <li><Link href="/country/australia" className="hover:text-primary transition-colors">Australia</Link></li>
                            <li><Link href="/country/canada" className="hover:text-primary transition-colors">Canada</Link></li>
                            <li><Link href="/country/uk" className="hover:text-primary transition-colors">UK</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/consultancies" className="hover:text-primary transition-colors">Consultancies</Link></li>
                            <li><Link href="/travel" className="hover:text-primary transition-colors">Travel Agency</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} PadhnaJaam. All rights reserved.</p>
                    <p className="mt-2 text-xs opacity-70">Kathmandu, Nepal</p>
                </div>
            </div>
        </footer>
    );
}
