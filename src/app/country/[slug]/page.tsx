import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CheckCircle2, Info, Clock, GraduationCap, DollarSign, HelpCircle, User, Building2, Plane, ArrowRight, MessageSquare } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import AdSlot from "@/components/common/AdSlot";
import CountryFaqSection from "./CountryFaqSection";

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const country = await prisma.country.findUnique({
        where: { slug: slug },
        include: {
            reviews: {
                where: { isVerified: true },
                include: { user: { select: { name: true, image: true } } },
                orderBy: { createdAt: "desc" },
                take: 4
            }
        }
    });

    if (!country) {
        notFound();
    }

    const levelMap: Record<string, string> = {
        "Bachelor": "Bachelor",
        "Master": "Masters",
        "PhD": "PhD"
    };

    const levels = Object.keys(levelMap);

    return (
        <div className="container mx-auto px-4 pt-6 pb-12 flex flex-col gap-12">
            {/* Country Hero */}
            <section className="space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase">
                    Study Destination
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    {country.heroTitle}
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    {country.overview}
                </p>
            </section>

            <AdSlot position="Country Page Top" />

            {/* Level Specifics */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-zinc-950 border dark:border-zinc-800 rounded-xl p-1">
                        <Tabs defaultValue="Bachelor" className="w-full">
                            <div className="flex items-center justify-between px-4 py-2 border-b dark:border-zinc-800">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-primary" /> Requirements for Levels
                                </h3>
                                <TabsList className="bg-slate-100 dark:bg-zinc-900/80 p-1 rounded-full border dark:border-zinc-800 h-auto w-full sm:w-auto overflow-x-auto justify-start sm:justify-center">
                                    {levels.map((level) => (
                                        <TabsTrigger
                                            key={level}
                                            value={level}
                                            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground text-slate-600 dark:text-slate-400 py-2 px-4 sm:px-6 font-semibold transition-all data-[state=active]:shadow-md hover:text-slate-900 dark:hover:text-slate-200"
                                        >
                                            {levelMap[level]}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>

                            {levels.map((level) => {
                                const reqs = (country.requirementsByLevel as any)[level];
                                const hooks = (country.docsChecklistByLevel as any)[level] || [];

                                return (
                                    <TabsContent key={level} value={level} className="p-6 space-y-6 mt-0">
                                        <div className="space-y-4">
                                            <h4 className="font-bold text-lg">Typical Requirements</h4>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {reqs || "Specific requirements for this level will be updated soon."}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-bold text-lg">Documents Checklist</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {hooks.map((item: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50">
                                                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                                        <span className="text-sm font-medium">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </TabsContent>
                                );
                            })}
                        </Tabs>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <Info className="h-5 w-5" /> Disclaimer
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-slate-600 dark:text-slate-400">
                            General guidance for Nepali context. Always verify specific requirements with official university websites or embassies.
                        </CardContent>
                    </Card>

                    <CountryFaqSection faqs={country.faqs as any[]} />
                </div>
            </section>

            {/* Full width Application Timeline */}
            {country.slug === 'usa' ? (
                <Card className="w-full bg-[#111113] border-zinc-800/50 overflow-hidden shadow-xl">
                    <CardContent className="p-8 relative">
                        <h3 className="flex items-center gap-3 text-xl font-bold mb-10 text-white">
                            <div className="p-2 bg-zinc-800/80 rounded-md border border-zinc-700">
                                <Clock className="w-5 h-5 text-slate-300" />
                            </div>
                            Application Timeline
                        </h3>

                        <div className="flex flex-col md:flex-row gap-6 relative justify-between overflow-x-auto pb-4 custom-scrollbar">
                            <div className="hidden md:block absolute top-[20px] left-[8%] right-[8%] h-[1px] bg-zinc-800 z-0"></div>

                            {[
                                { title: "English Test", desc: "Prepare and take an English proficiency test such as IELTS or TOEFL (most widely accepted). Some universities also accept PTE or Duolingo." },
                                { title: "Standardized Tests", desc: "SAT for Undergrad, GRE for Master's/PhD, GMAT for MBA. Optional, but good scores improve admission chances and scholarships." },
                                { title: "Shortlist Universities", desc: "Find universities matching your profile. Email professors or connect via LinkedIn regarding research opportunities and funding." },
                                { title: "Prepare Documents", desc: "Gather transcripts, English scores, SOP, CV/Resume, LORs. Credential evaluation (WES, SpanTran) may be required." },
                                { title: "Apply to Universities", desc: "Submit applications through the university's online portal and pay the application fee." },
                                { title: "Receive Admission & I-20", desc: "If accepted, receive admission letter. Submit financial documents (bank statement/sponsor proof) to get I-20 form." },
                                { title: "Apply for Student Visa", desc: "Pay the SEVIS fee, complete the DS-160 form, pay the MRV visa fee, and schedule your visa interview." },
                                { title: "Visa Approval & Travel", desc: "Attend the visa interview. If approved, receive your passport with F-1 visa, book your flight, and prepare to travel." }
                            ].map((step, idx, arr) => (
                                <div key={idx} className="relative z-10 flex flex-col gap-4 flex-1 min-w-[150px]">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${idx === 0 ? 'bg-white text-black' : idx === arr.length - 1 ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                                        {idx === arr.length - 1 ? <Check className="w-5 h-5" /> : (idx + 1)}
                                    </div>
                                    <div className="pt-2">
                                        <h4 className="font-bold text-slate-100 mb-2 leading-tight">{step.title}</h4>
                                        <p className="text-xs text-slate-400 leading-relaxed pr-2">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ) : country.slug === 'australia' || country.slug === 'canada' || country.slug === 'uk' || country.slug === 'japan' || country.slug === 'germany' || country.slug === 'netherlands' || country.slug === 'south-korea' ? (
                <Card className="w-full bg-[#111113] border-zinc-800/50 overflow-hidden shadow-xl">
                    <CardContent className="p-8 relative">
                        <h3 className="flex items-center gap-3 text-xl font-bold mb-6 text-white">
                            <div className="p-2 bg-zinc-800/80 rounded-md border border-zinc-700">
                                <Clock className="w-5 h-5 text-slate-300" />
                            </div>
                            Application Timeline
                        </h3>

                        <Tabs defaultValue="path2" className="w-full">
                            <div className="flex justify-center md:justify-start mb-8">
                                <TabsList className="bg-[#1a1a1c] border border-zinc-800 rounded-full p-1 h-auto flex flex-col sm:flex-row">
                                    <TabsTrigger
                                        value="path1"
                                        className="rounded-full px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-black text-slate-400 font-semibold transition-all cursor-pointer"
                                    >
                                        <User className="w-4 h-4 mr-2" /> Self Application
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="path2"
                                        className="rounded-full px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-black text-slate-400 font-semibold transition-all cursor-pointer"
                                    >
                                        <Building2 className="w-4 h-4 mr-2" /> Via Consultancy
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="path1" className="mt-0">
                                <div className="flex flex-col md:flex-row gap-6 relative justify-between overflow-x-auto pb-4 custom-scrollbar">
                                    <div className="hidden md:block absolute top-[20px] left-[8%] right-[8%] h-[1px] bg-zinc-800 z-0"></div>

                                    {(country.slug === 'australia' ? [
                                        { title: "English Test", desc: "Take IELTS / PTE / TOEFL (IELTS and PTE are most commonly accepted in Australia)." },
                                        { title: "Choose Course", desc: "Shortlist CRICOS-registered universities based on course, tuition fees, and location." },
                                        { title: "Apply to Universities", desc: "Submit applications through university portals with transcripts, passport, English scores, and CV.", hoverDocs: ["Academic Transcripts", "Passport Copy", "English Test Scores (IELTS/PTE)", "CV & SOP", "1-Year Bank Statement"] },
                                        { title: "Receive Offer Letter", desc: "If accepted, the university sends a Conditional or Unconditional Offer Letter." },
                                        { title: "Pay Deposit", desc: "Sign the acceptance agreement and pay the initial tuition deposit." },
                                        { title: "Receive CoE", desc: "After payment, the university issues your Confirmation of Enrolment (CoE), required for visa application." },
                                        { title: "Apply for Student Visa", desc: "Create ImmiAccount, submit Subclass 500 visa application, and upload required documents.", hoverDocs: ["CoE (Confirmation of Enrolment)", "OSHC (Health Cover)", "1-Year Bank Statement (NPR ~60 Lakh balance)", "Sponsor Income Proof (NRs 24 Lakh+)", "Tax Clearance Certificate", "Relationship Certificate", "Medical Checkup"] },
                                        { title: "Visa Grant & Travel", desc: "Once visa is granted, book flights and prepare to travel to Australia." }
                                    ] : country.slug === 'canada' ? [
                                        { title: "English Test", desc: "Take IELTS Academics or PTE. For SDS, you need 6.0 in each band." },
                                        { title: "Choose University/College", desc: "Find a Designated Learning Institution (DLI) and choose your program." },
                                        { title: "Apply for LOA", desc: "Submit your application to the college/university to get your Letter of Acceptance (LOA).", hoverDocs: ["Transcripts", "Passport", "IELTS Scorecard", "SOP"] },
                                        { title: "Pay Tuition & GIC", desc: "Pay one-year tuition and purchase a GIC (approx. $20,635) for living expenses." },
                                        { title: "Upfront Medical", desc: "Complete your medical examination with a panel physician before visa submission." },
                                        { title: "Study Permit Application", desc: "Apply for Canada Study Permit (SDS or non-SDS).", hoverDocs: ["Letter of Acceptance (LOA)", "GIC Certificate", "Tuition Fee Receipt", "Medical Report", "SOP/Study Plan", "Financial Support Proof"] },
                                        { title: "Biometric & Tracking", desc: "Give your biometrics at the VFS and track your application status." },
                                        { title: "Visa Approval & Travel", desc: "Once your Passport Request (PPR) is received and stamped, prepare for travel." }
                                    ] : country.slug === 'uk' ? [
                                        { title: "English Test", desc: "Take IELTS for UKVI or PTE Academic." },
                                        { title: "University Shortlist", desc: "Choose suitable UK universities and courses." },
                                        { title: "Prepare Documents", desc: "Gather transcripts, SOP, and LORs.", hoverDocs: ["Transcripts", "SOP", "LORs (Academic)", "Passport"] },
                                        { title: "Apply & Receive Offer", desc: "Apply and get a Conditional or Unconditional Offer Letter." },
                                        { title: "CAS & TB Test", desc: "Pay deposit to get CAS (Confirmation of Acceptance) and complete Tuberculosis test." },
                                        { title: "Pre-Visa Financials", desc: "Maintain required funds in your bank for 28 consecutive days.", hoverDocs: ["CAS Letter", "TB Certificate", "Bank Statement (28-day rule)", "IHS Surcharge Payment"] },
                                        { title: "Visa Application", desc: "Apply for UK Student Visa and attend Credibility Interview if required." },
                                        { title: "Visa Grant & Travel", desc: "Collect your vignette (visa) and travel to the UK." }
                                    ] : country.slug === 'japan' ? [
                                        { title: "Language Prep", desc: "Start Japanese language training (150+ hours) for JLPT N5 or NAT-TEST." },
                                        { title: "School Selection", desc: "Choose a Japanese Language School or University based on your goals." },
                                        { title: "Application & Docs", desc: "Submit your application along with academic and financial records.", hoverDocs: ["Japanese Language Cert", "Transcripts", "Passport", "3 Generations Relationship Cert", "Sponsor Income Proof"] },
                                        { title: "Interview", desc: "Attend an interview with the school representative (often online)." },
                                        { title: "COE Application", desc: "The school submits your application to Japanese Immigration for the COE." },
                                        { title: "COE Issuance", desc: "After 2-3 months, Japanese Immigration issues your Certificate of Eligibility (COE)." },
                                        { title: "Visa Stamping", desc: "Pay the school fee, get your COE, and apply for a Student Visa at the Embassy.", hoverDocs: ["COE Original", "Visa Application Form", "Tuition Fee Receipt", "Passport", "ID Photos"] },
                                        { title: "Arrival in Japan", desc: "Travel to Japan and receive your Residence Card at the airport." }
                                    ] : country.slug === 'germany' ? [
                                        { title: "Eligibility & Language", desc: "Check if you meet GPA requirements and take TestDaF/DSH (German) or IELTS (English)." },
                                        { title: "APS Certification", desc: "Apply for APS certificate (mandatory for Nepal) to verify your academic documents.", hoverDocs: ["Academic Transcripts", "Passport Copy", "Language Certificate", "APS Application Form"] },
                                        { title: "University Application", desc: "Apply via uni-assist or direct university portals based on the institution.", hoverDocs: ["APS Certificate", "Passport", "SOP & CV", "Language Scorecard", "Recommendation Letters"] },
                                        { title: "Receive Admission", desc: "Get your Admission Letter (Zulassungsbescheid) from the university." },
                                        { title: "Blocked Account", desc: "Open a Blocked Account (Sperrkonto) and deposit the required funds (~€11,208).", hoverDocs: ["Admission Letter", "Passport", "Proof of Funds"] },
                                        { title: "Visa Application", desc: "Apply for German National Student Visa at the German Embassy in Kathmandu.", hoverDocs: ["Blocked Account Confirmation", "Admission Letter", "APS Certificate", "Health Insurance", "Visa Application Form"] },
                                        { title: "Visa Grant & Travel", desc: "Once visa is granted, book your flight and arrange student health insurance." }
                                    ] : country.slug === 'netherlands' ? [
                                        { title: "English Proficiency", desc: "Take IELTS or TOEFL. Most programs require IELTS 6.0 - 6.5." },
                                        { title: "Studielink Signup", desc: "Register on Studielink, the central application platform for Dutch higher education." },
                                        { title: "University Application", desc: "Complete your application through the university's own portal after Studielink.", hoverDocs: ["Transcripts", "IELTS Scorecard", "Passport", "SOP / Motivation Letter"] },
                                        { title: "Offer & Acceptance", desc: "Receive a Conditional or Unconditional offer and accept it." },
                                        { title: "Payment & Fees", desc: "Receive an invoice for tuition and visa fees. Pay the required deposit." },
                                        { title: "Visa/MVV Process", desc: "The university applies for your MVV (entry visa) and residence permit on your behalf.", hoverDocs: ["Passport", "Financial Statement", "TB Test (if applicable)", "Antecedents Certificate"] },
                                        { title: "Visa Approval", desc: "Collect your MVV from the Dutch embassy and prepare for travel." },
                                        { title: "Arrival & BRP", desc: "Register with the local municipality (BRP) and collect your residence card." }
                                    ] : country.slug === 'south-korea' ? [
                                        { title: "Language Proficiency", desc: "Take TOPIK for Korean-track programs or IELTS/TOEFL for English-track." },
                                        { title: "Select University", desc: "Apply during Spring (March) or Fall (September) intake windows." },
                                        { title: "Document Submission", desc: "Submit application with verified academic and financial documents.", hoverDocs: ["Apostilled Transcripts", "TOPIK/IELTS Score", "SOP", "Relationship Certificate", "Sponsor's Financial Docs"] },
                                        { title: "Admission & CoA", desc: "Receive your Certificate of Admission (CoA) once accepted and fees are paid." },
                                        { title: "Embassy Verification", desc: "Get your documents notarized or apostilled as per Embassy requirements." },
                                        { title: "Visa Application", desc: "Apply for the D-2 Student Visa at the Korean Embassy.", hoverDocs: ["CoA (Original)", "Bank Balance Certificate ($18k-$20k)", "Sponsor Documents", "Passport", "Visa Form"] },
                                        { title: "Visa Grant & Arrival", desc: "Prepare for departure and apply for Alien Registration Card (ARC) upon arrival." }
                                    ] : []).map((step: any, idx, arr) => (
                                        <div key={idx} className="relative z-10 flex flex-col gap-4 flex-1 min-w-[150px]">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${idx === 0 ? 'bg-white text-black' : idx === arr.length - 1 ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                                                {idx === arr.length - 1 ? <Check className="w-5 h-5" /> : (idx + 1)}
                                            </div>
                                            <div className="pt-2">
                                                {step.hoverDocs ? (
                                                    <HoverCard openDelay={100} closeDelay={100}>
                                                        <HoverCardTrigger asChild>
                                                            <div className="cursor-pointer group">
                                                                <h4 className="font-bold text-slate-100 mb-2 leading-tight flex items-center gap-1.5 transition-colors group-hover:text-primary">
                                                                    <span className="border-b border-dashed border-slate-500 group-hover:border-primary">
                                                                        {step.title}
                                                                    </span>
                                                                </h4>
                                                                <p className="text-xs text-slate-400 leading-relaxed pr-2 transition-colors group-hover:text-slate-300">
                                                                    {step.desc}
                                                                </p>
                                                            </div>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent className="w-72 bg-zinc-900 border-zinc-700 p-5 shadow-2xl z-50">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="p-1.5 bg-primary/10 rounded-md">
                                                                    <Info className="w-4 h-4 text-primary" />
                                                                </div>
                                                                <p className="text-sm font-bold text-white tracking-tight">Required Documents</p>
                                                            </div>
                                                            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                                                                {step.hoverDocs.map((doc: string, i: number) => (
                                                                    <li key={i} className="pl-1 italic">{doc}</li>
                                                                ))}
                                                            </ul>
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                ) : (
                                                    <>
                                                        <h4 className="font-bold text-slate-100 mb-2 leading-tight">{step.title}</h4>
                                                        <p className="text-xs text-slate-400 leading-relaxed pr-2">{step.desc}</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="path2" className="mt-0">
                                <div className="flex flex-col md:flex-row gap-6 relative justify-between overflow-x-auto pb-4 custom-scrollbar">
                                    <div className="hidden md:block absolute top-[20px] left-[8%] right-[8%] h-[1px] bg-zinc-800 z-0"></div>

                                    {(country.slug === 'australia' ? [
                                        { title: "Take English Test", desc: "Consultancy helps you prepare and book dates for IELTS / PTE." },
                                        { title: "Counseling & Selection", desc: "Consultants help choose a course and university based on your academic background and budget." },
                                        { title: "Prepare Documents", desc: "Provide documents such as academic transcripts, passport, English test scores, and CV.", hoverDocs: ["Academic Transcripts", "Passport", "English Test Scores", "SOP & CV", "1-Year Bank Statement"] },
                                        { title: "Consultancy Applies", desc: "The consultancy submits application to universities on your behalf." },
                                        { title: "Receive Offer Letter", desc: "If accepted, you receive a Conditional/Unconditional Offer Letter." },
                                        { title: "Pay Tuition Deposit", desc: "After accepting the offer and paying the deposit, the university issues your CoE." },
                                        { title: "Visa Application", desc: "Consultancy helps prepare visa documents and submit the Subclass 500 visa application.", hoverDocs: ["CoE (Confirmation of Enrolment)", "OSHC (Health Cover)", "1-Year Bank Statement (NPR ~60 Lakh balance)", "Sponsor Income Proof (NRs 24 Lakh+)", "Tax Clearance Certificate", "Relationship Certificate", "Medical Forms"] },
                                        { title: "Visa Grant & Travel", desc: "After visa approval, book your flight tickets, arrange accommodation, and prepare for travel." }
                                    ] : country.slug === 'canada' ? [
                                        { title: "Consultancy Visit", desc: "Meet a certified consultant representing Canadian DLIs." },
                                        { title: "English Exam Prep", desc: "Consultancy assists with IELTS/PTE training and test booking." },
                                        { title: "Preparation of Docs", desc: "Gather all academic and financial records with expert guidance.", hoverDocs: ["Transcripts", "Passport", "Language Scores", "SOP/Study Plan Draft"] },
                                        { title: "Apply for LOA", desc: "Consultant handles the application to Canadian Universities/Colleges on your behalf." },
                                        { title: "Financial Fulfillment", desc: "Guidance on paying tuition and securing the $20,635+ GIC certificate." },
                                        { title: "Medical & Visa Prep", desc: "Assist in upfront medicals and organizing the visa file (SDS/non-SDS)." },
                                        { title: "Visa Submission", desc: "Submit Study Permit application and proceed with Biometrics at VFS.", hoverDocs: ["LOA", "GIC Cert", "Tuition Receipt", "Medical E-Med Report", "CAQ (if Quebec)"] },
                                        { title: "Visa Grant & Fly", desc: "Once PPR is approved, prepare for departure to Canada." }
                                    ] : country.slug === 'uk' ? [
                                        { title: "Counseling Session", desc: "Explore UK universities and intake options with consultants." },
                                        { title: "IELTS/PTE Coaching", desc: "Improve your scores and register for the UKVI English exam." },
                                        { title: "Application Process", desc: "Consultancy submits your application to shortlisted UK universities." },
                                        { title: "Interview Prep", desc: "Preparation for university and Home Office credibility interviews." },
                                        { title: "Secure Offer & Deposit", desc: "Receive your offer letter and pay the initial tuition deposit." },
                                        { title: "TB Test & CAS", desc: "Complete TB test and receive your CAS document from the university." },
                                        { title: "Visa documentation", desc: "Consultancy helps prepare the visa file and bank 28-day rule evidence.", hoverDocs: ["CAS", "TB Certificate", "Bank Statements", "Parental Support Docs"] },
                                        { title: "Visa Grant & Depart", desc: "Collect your visa from the embassy and travel to the UK." }
                                    ] : country.slug === 'japan' ? [
                                        { title: "Consultancy Counseling", desc: "Consultants help you choose a Japanese Language School or University." },
                                        { title: "Language Training", desc: "Attend 150+ hours of Japanese coaching for NAT-TEST/JLPT." },
                                        { title: "Document Handling", desc: "Consultancy guides you on gathering academic and sponsor documents.", hoverDocs: ["Language Cert", "Transcripts", "Passport", "Sponsor Documents", "Relationship Proof"] },
                                        { title: "Process Application", desc: "Consultant handles the school application and online interview scheduling." },
                                        { title: "COE Filing", desc: "The consultancy coordinates with the school in Japan for the COE application." },
                                        { title: "Fee Payment", desc: "Once COE is issued, pay the tuition fee via SWIFT to get the original COE." },
                                        { title: "Visa Documentation", desc: "Expert help in preparing the visa file with the COE for Embassy submission.", hoverDocs: ["COE Original", "Visa Form", "Fee Receipt", "ID Photo", "Passport"] },
                                        { title: "Travel Prep & Fly", desc: "Final orientation on life in Japan and departure to Tokyo/Osaka/etc." }
                                    ] : country.slug === 'germany' ? [
                                        { title: "Consultancy Counseling", desc: "Meet experts to discuss Public vs Private university options." },
                                        { title: "Language Training", desc: "Access German (Goethe/TestDaF) or English (IELTS) coaching." },
                                        { title: "APS Guidance", desc: "Consultancy assists in the complex APS verification process.", hoverDocs: ["Transcripts", "Passport", "Language Cert", "Application Forms"] },
                                        { title: "University Admission", desc: "Consultancy applies via uni-assist on your behalf." },
                                        { title: "Blocked Account Help", desc: "Guidance on opening and funding your Sperrkonto (~€11,208)." },
                                        { title: "Visa Preparation", desc: "Expert preparation of your visa file for the Kathmandu Embassy submission.", hoverDocs: ["Blocked Account Cert", "Admission Letter", "APS Certificate", "Biometric Photos"] },
                                        { title: "Visa Interview Prep", desc: "Mock interviews to prepare for Embassy questions." },
                                        { title: "Visa Grant & Depart", desc: "Final briefing on health insurance, accommodation, and travel." }
                                    ] : country.slug === 'netherlands' ? [
                                        { title: "Profile Evaluation", desc: "Consultants evaluate your GPA and profile for Dutch universities." },
                                        { title: "Language Coaching", desc: "Preparation for IELTS/TOEFL requirements (6.0 - 6.5+)." },
                                        { title: "Studielink Support", desc: "Consultancy handles your Studielink and university portal registration.", hoverDocs: ["Transcripts", "IELTS Scorecard", "Passport", "SOP Draft"] },
                                        { title: "Admission Management", desc: "Follow up on conditional offers and submission of remaining docs." },
                                        { title: "Financial Fulfillment", desc: "Guidance on paying the tuition and residence permit deposits." },
                                        { title: "Visa Support (MVV)", desc: "Coordination with the university's International Office for your MVV.", hoverDocs: ["Financial Statement", "Passport", "Health Insurance", "Declaration Forms"] },
                                        { title: "Travel Briefing", desc: "Guidance on BRP registration and finding housing in the Netherlands." },
                                        { title: "Visa Collection & Fly", desc: "Collect your MVV and travel to Amsterdam/Rotterdam/etc." }
                                    ] : country.slug === 'south-korea' ? [
                                        { title: "Initial Counseling", desc: "Find the best fit among top Korean universities and intakes." },
                                        { title: "Language Prep", desc: "Intensive TOPIK or IELTS coaching for admission requirements." },
                                        { title: "Application Process", desc: "Consultancy manages your university application and document verification.", hoverDocs: ["Verified Transcripts", "Language Scores", "SOP", "Financial Portfolio"] },
                                        { title: "Interview Prep", desc: "Preparation for university admission interviews (Skype/Zoom)." },
                                        { title: "CoA & Fee Payment", desc: "Secure your Certificate of Admission (CoA) by paying the tuition fee." },
                                        { title: "Embassy Processing", desc: "Assistance in preparing the D-2 visa file and sponsor documentation.", hoverDocs: ["CoA Original", "Sponsor Docs", "Bank Balance", "Visa Form", "Family Cert"] },
                                        { title: "Visa Grant", desc: "Receive your student visa from the Korean Embassy." },
                                        { title: "Travel & ARC Info", desc: "Pre-departure briefing and information on Alien Registration in Korea." }
                                    ] : []).map((step: any, idx, arr) => (
                                        <div key={idx} className="relative z-10 flex flex-col gap-4 flex-1 min-w-[150px]">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${idx === 0 ? 'bg-white text-black' : idx === arr.length - 1 ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                                                {idx === arr.length - 1 ? <Check className="w-5 h-5" /> : (idx + 1)}
                                            </div>
                                            <div className="pt-2">
                                                {step.hoverDocs ? (
                                                    <HoverCard openDelay={100} closeDelay={100}>
                                                        <HoverCardTrigger asChild>
                                                            <div className="cursor-pointer group">
                                                                <h4 className="font-bold text-slate-100 mb-2 leading-tight flex items-center gap-1.5 transition-colors group-hover:text-primary">
                                                                    <span className="border-b border-dashed border-slate-500 group-hover:border-primary">
                                                                        {step.title}
                                                                    </span>
                                                                </h4>
                                                                <p className="text-xs text-slate-400 leading-relaxed pr-2 transition-colors group-hover:text-slate-300">
                                                                    {step.desc}
                                                                </p>
                                                            </div>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent className="w-72 bg-zinc-900 border-zinc-700 p-5 shadow-2xl z-50">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="p-1.5 bg-primary/10 rounded-md">
                                                                    <Info className="w-4 h-4 text-primary" />
                                                                </div>
                                                                <p className="text-sm font-bold text-white tracking-tight">Required Documents</p>
                                                            </div>
                                                            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                                                                {step.hoverDocs.map((doc: string, i: number) => (
                                                                    <li key={i} className="pl-1 italic">{doc}</li>
                                                                ))}
                                                            </ul>
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                ) : (
                                                    <>
                                                        <h4 className="font-bold text-slate-100 mb-2 leading-tight">{step.title}</h4>
                                                        <p className="text-xs text-slate-400 leading-relaxed pr-2">{step.desc}</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            ) : (
                <Card className="w-full bg-[#111113] border-zinc-800/50 shadow-xl">
                    <CardContent className="p-8">
                        <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-white">
                            <div className="p-2 bg-zinc-800/80 rounded-md border border-zinc-700">
                                <Clock className="w-5 h-5 text-slate-300" />
                            </div>
                            Application Timeline
                        </h3>
                        <p className="text-slate-400 leading-relaxed max-w-4xl">{country.timeline}</p>
                    </CardContent>
                </Card>
            )}

            {/* Scholarships & Financial Aid */}
            <Card className="w-full bg-[#111113] border-zinc-800/50 shadow-xl">
                <CardContent className="p-8">
                    <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-white">
                        <div className="p-2 bg-zinc-800/80 rounded-md border border-zinc-700">
                            <DollarSign className="w-5 h-5 text-slate-300" />
                        </div>
                        Scholarships & Financial Aid
                    </h3>
                    <p className="text-slate-400 leading-relaxed max-w-4xl">{country.scholarships}</p>
                </CardContent>
            </Card>

            {/* Student Voices / Reviews Section */}
            {country.reviews && country.reviews.length > 0 && (
                <section className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-[3rem] p-8 md:p-12 space-y-8 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <h2 className="text-3xl font-extrabold tracking-tight flex items-center justify-center md:justify-start gap-3">
                                <MessageSquare className="h-8 w-8 text-primary" /> Student Voices from {country.name}
                            </h2>
                            <p className="text-muted-foreground">Real advice and dos & don'ts from students already studying here.</p>
                        </div>
                        <Button asChild variant="outline" className="rounded-full shadow-sm font-bold shrink-0">
                            <Link href="/community">View All Community Advice <ArrowRight className="h-4 w-4 ml-2" /></Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        {country.reviews.map((review: any) => (
                            <Card key={review.id} className="border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow bg-slate-50 dark:bg-zinc-900/50 rounded-2xl">
                                <CardHeader className="pb-3 flex-row items-center gap-3">
                                    {review.user.image ? (
                                        <img src={review.user.image} alt={review.user.name||""} className="w-10 h-10 rounded-full" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {review.user.name?.[0] || 'A'}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-bold text-sm tracking-tight">{review.user.name || "Anonymous Member"}</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm italic leading-relaxed text-slate-700 dark:text-slate-300">"{review.content}"</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {/* Trusted Partners Section */}
            <section className="bg-slate-50 dark:bg-zinc-900/50 rounded-[3rem] p-8 md:p-16 border dark:border-zinc-800 space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight italic">Trusted Partners for {country.name}</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">"Need personalized guidance or travel arrangements? Connect with our verified partners specializing in {country.name}."</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-background border-slate-100 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500">
                        <CardHeader className="p-8 pb-4">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Building2 className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="text-3xl font-bold">Consultancy Support</CardTitle>
                            <CardDescription className="text-lg">Start your application with top-rated experts specializing in {country.name}.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <Button asChild className="w-full h-14 rounded-2xl font-bold text-lg gap-2 shadow-lg shadow-primary/20">
                                <Link href="/consultancies">View Consultancies <ArrowRight className="h-5 w-5" /></Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-background border-slate-100 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500">
                        <CardHeader className="p-8 pb-4">
                            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Plane className="h-8 w-8 text-blue-500" />
                            </div>
                            <CardTitle className="text-3xl font-bold">Travel & Flights</CardTitle>
                            <CardDescription className="text-lg">Exclusive student flight deals and mandatory insurance for {country.name}.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <Button asChild className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg gap-2 shadow-lg shadow-blue-500/20">
                                <Link href="/travel">Check Flight Prices <ArrowRight className="h-5 w-5" /></Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>

        </div>
    );
}
