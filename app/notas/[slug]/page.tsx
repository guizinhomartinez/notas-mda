import NotFound from "@/components/notas-components/not-found";
import SlugComponent from "@/components/notas-components/slug-component";
import {
    getProfilePhotoByUserId,
    getUsernameByUserId,
} from "@/functions/clerk-handling";
import {
    checkAllRatings,
    getDayAverage,
} from "@/functions/handle-rating-submit";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export interface SlugComponentInterface {
    userData: {
        userId: string;
        username: string | null;
        profilePicture: string | null;
        rating: number;
    }[];
    correctedDate: Date;
    userId: string | null;
    average: number;
    previousDay: Date;
    nextDay: Date;
    checkedRatings?: { ratings: number[]; userId: string[] };
    pageNotFound: boolean;
    checkIfDayHasRating: () => void;
    username: string | null;
    actualDate: Date;
    nextActualDate: Date;
    slug: string;
}

export default async function Notas({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { userId } = await auth();

    let pageNotFound = false;

    const regex = /^\d{2}-\d{2}-\d{2}$/;
    if (!regex.test(slug)) {
        return notFound();
    }

    const [day, month, year] = slug.split("-").map(Number);
    const correctedDate = new Date(Date.UTC(2000 + year, month - 1, day));
    const previousDay = new Date(correctedDate);
    previousDay.setUTCDate(correctedDate.getUTCDate() - 1);

    const nextDay = new Date(correctedDate);
    nextDay.setUTCDate(correctedDate.getUTCDate() + 1);

    const checkedRatings = await checkAllRatings(correctedDate);
    const userData = await Promise.all(
        checkedRatings.userId.map(async (userId, index) => {
            const [username, profilePicture] = await Promise.all([
                getUsernameByUserId(userId),
                getProfilePhotoByUserId(userId),
            ]);
            return {
                userId: userId,
                username,
                profilePicture,
                rating: checkedRatings.ratings[index],
            };
        }),
    );

    const average = await getDayAverage(new Date(2000 + year, month - 1, day));

    if (checkedRatings?.ratings.length === 0) pageNotFound = true;

    const checkIfDayHasRating = async () => {
        "use server";

        if (!userId) return { hasRating: false, success: false };

        const result =
            (await prisma.rating.count({
                where: {
                    date: correctedDate,
                    clerkId: userId,
                },
            })) > 0;
        return { hasRating: result ?? null, success: true };
    };

    const username = await getUsernameByUserId(userId);
    const actualDate = new Date();
    const nextActualDate = new Date();
    nextActualDate.setDate(actualDate.getDate() + 1);

    actualDate.setHours(0, 0, 0, 0);
    nextActualDate.setHours(0, 0, 0, 0);

    return (
        <div className="from-background flex h-dvh w-screen flex-col items-center justify-center gap-4 bg-gradient-to-b to-zinc-400/5 lg:mx-auto">
            <SlugComponent
                {...{
                    userData,
                    correctedDate,
                    userId,
                    average,
                    nextDay,
                    previousDay,
                    checkedRatings,
                    pageNotFound,
                    checkIfDayHasRating,
                    username,
                    actualDate,
                    nextActualDate,
                    slug,
                }}
            />
        </div>
    );
}
