"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, GraduationCap, User as UserIcon, Menu, X } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";

const countries = [
    { name: "US", slug: "usa" },
    { name: "Australia", slug: "australia" },
    { name: "Canada", slug: "canada" },
    { name: "UK", slug: "uk" },
    { name: "Germany", slug: "germany" },
    { name: "Netherlands", slug: "netherlands" },
    { name: "Japan", slug: "japan" },
    { name: "South Korea", slug: "south-korea" },
];

export default function Navbar() {
    const { data: session } = useSession();
    const user = session?.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Left: Logo */}
                <div className="flex-shrink-0">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                        <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8" />
                        <span className="text-lg sm:text-xl">PadhnaJaam</span>
                    </Link>
                </div>

                {/* Center: Navigation Links (Desktop) */}
                <div className="hidden md:flex flex-grow justify-center">
                    <div className="flex items-center gap-10">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 text-md font-semibold hover:text-primary transition-colors outline-none cursor-pointer">
                                Countries <ChevronDown className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48">
                                {countries.map((country) => (
                                    <DropdownMenuItem key={country.slug} asChild className="cursor-pointer">
                                        <Link href={`/country/${country.slug}`}>{country.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link href="/countries" className="font-semibold text-primary">See All</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 text-md font-semibold hover:text-primary transition-colors outline-none cursor-pointer">
                                Services <ChevronDown className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48">
                                <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link href="/consultancies">Consultancies</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link href="/travel">Travel Agency</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link href="/community" className="text-md font-semibold hover:text-primary transition-colors">
                            Community
                        </Link>
                        <Link href="/about" className="text-md font-semibold hover:text-primary transition-colors">
                            About
                        </Link>
                        <Link href="/contact" className="text-md font-semibold hover:text-primary transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>

                {/* Right: Auth & Theme */}
                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    <ThemeToggle />
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-border cursor-pointer">
                                    {user.image ? (
                                        <img src={user.image} alt={user.name || ""} className="h-8 w-8 rounded-full" />
                                    ) : (
                                        <UserIcon className="h-5 w-5" />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => signOut()}>
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-1 sm:gap-3 flex-nowrap">
                            <Button variant="ghost" asChild className="rounded-full px-2 sm:px-6 text-xs sm:text-md cursor-pointer h-8 sm:h-10 shrink-0">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild className="rounded-full px-3 sm:px-8 bg-foreground text-background hover:bg-foreground/90 font-bold tracking-tight text-xs sm:text-md cursor-pointer h-8 sm:h-10 shrink-0">
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    )}

                    {/* Mobile hamburger button */}
                    <button
                        className="md:hidden p-1 rounded-lg hover:bg-accent transition-colors cursor-pointer shrink-0"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
                    <div className="container mx-auto px-4 py-4 space-y-1">
                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-3 py-2">Countries</p>
                            {countries.map((country) => (
                                <Link
                                    key={country.slug}
                                    href={`/country/${country.slug}`}
                                    className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {country.name}
                                </Link>
                            ))}
                            <Link
                                href="/countries"
                                className="block px-3 py-2 text-sm font-semibold text-primary hover:bg-accent rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                See All Countries
                            </Link>
                        </div>
                        <div className="border-t my-2" />
                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-3 py-2">Services</p>
                            <Link
                                href="/consultancies"
                                className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Consultancies
                            </Link>
                            <Link
                                href="/travel"
                                className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Travel Agency
                            </Link>
                        </div>
                        <div className="border-t my-2" />
                        <Link
                            href="/community"
                            className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Community
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
