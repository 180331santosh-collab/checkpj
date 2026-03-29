import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const countryId = searchParams.get("countryId");

        const reviews = await prisma.review.findMany({
            where: {
                ...(countryId && { countryId }),
                isVerified: true, // Only fetch verified reviews
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    }
                },
                country: {
                    select: {
                        name: true,
                        slug: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { countryId, category, content } = body;

        if (!countryId || !category || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newReview = await prisma.review.create({
            data: {
                userId: session.user.id,
                countryId,
                category,
                content,
                isVerified: true, // Auto-verifying for immediate demonstration. Change to false for manual moderation later.
            }
        });

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
    }
}
