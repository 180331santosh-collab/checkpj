import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { profile: true },
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const {
            level,
            gpaOrPercent,
            backlogs,
            englishTestType,
            englishTestScore,
            greScore,
            satScore,
            budget,
            targetCountries,
            fieldOfStudy,
            intakeSeason,
            workExperience,
            projects
        } = body;

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const data = {
            level,
            gpaOrPercent,
            backlogs: backlogs ? parseInt(backlogs) : 0,
            englishTestType,
            englishTestScore,
            greScore,
            satScore,
            budget,
            targetCountries: targetCountries || [],
            fieldOfStudy,
            intakeSeason,
            workExperience,
            projects,
        };

        const updatedProfile = await prisma.studentProfile.upsert({
            where: { userId: user.id },
            update: data,
            create: {
                userId: user.id,
                ...data
            },
        });

        return NextResponse.json(updatedProfile);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
