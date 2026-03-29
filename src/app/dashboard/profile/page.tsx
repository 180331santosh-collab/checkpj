import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProfileEditClient from "./ProfileEditClient";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
        include: { profile: true }
    });

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Edit Your Profile</h1>
                <p className="text-muted-foreground mt-2">
                    Update your academic and financial details to get more accurate study abroad recommendations.
                </p>
            </div>
            
            <ProfileEditClient initialData={user?.profile} />
        </div>
    );
}
