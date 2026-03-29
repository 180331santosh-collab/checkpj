"use client";

import { cn } from "@/lib/utils";

interface AdSlotProps {
    className?: string;
    position?: string;
}

export default function AdSlot({ className, position }: AdSlotProps) {
    const isEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

    if (!isEnabled) {
        return (
            <div
                className={cn(
                    "bg-slate-100 dark:bg-zinc-900 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-lg flex items-center justify-center min-h-[100px] text-slate-400 dark:text-slate-500 text-sm font-medium",
                    className
                )}
            >
                Advertisement {position ? `(${position})` : ""}
            </div>
        );
    }

    // Fallback for real adsense snippet placeholder
    return (
        <div className={cn("min-h-[100px] w-full", className)}>
            {/* Google Adsense code would go here */}
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
                data-ad-slot="xxxxxxxxxx"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
}
