import SlugComponent from "@/components/notas-components/slug-component";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    getProfilePhotoByUserId,
    getUsernameByUserId,
} from "@/functions/clerk-handling";
import {
    checkAllRatings,
    checkUserRating,
    getDayAverage,
} from "@/functions/handle-rating-submit";
import prisma from "@/lib/prisma";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { lazy, Suspense } from "react";

const LazyComp = lazy(() => new Promise(() => {})); // Never resolves

export interface SlugComponentInterface {
    userData: {
        userId: string;
        username: string | null;
        profilePicture: string | null;
        rating: number;
    }[];
    correctedDate: string;
    userId: string | null;
    average: number;
    previousDay: string;
    nextDay: string;
    checkedRatings?: { ratings: number[]; userId: string[] };
    ratingsAreNotAvailable: boolean;
    checkIfDayHasRating: () => void;
    username: string | null;
    actualDate: Date;
    nextActualDate: Date;
    slug: string;
    userRated: boolean;
}

export default async function Notas({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { userId, isAuthenticated } = await auth();

    const regex = /^\d{2}-\d{2}-\d{2}$/;
    if (!regex.test(slug)) return notFound();

    const [day, month, year] = slug.split("-").map(Number);
    const correctedDate = new Date(Date.UTC(2000 + year, month - 1, day));
    const previousDay = new Date(Date.UTC(2000 + year, month - 1, day - 1));
    const nextDay = new Date(Date.UTC(2000 + year, month - 1, day + 1));

    const [checkedRatings, average] = await Promise.all([
        checkAllRatings(correctedDate),
        getDayAverage(correctedDate),
    ]);

    const userData = await Promise.all(
        checkedRatings.userId.map(async (uid, index) => {
            const [username, profilePicture] = await Promise.all([
                getUsernameByUserId(uid),
                getProfilePhotoByUserId(uid),
            ]);
            return {
                userId: uid,
                username,
                profilePicture,
                rating: checkedRatings.ratings[index],
            };
        }),
    );

    const ratingsAreNotAvailable = checkedRatings?.ratings.length === 0;

    const checkIfDayHasRating = async () => {
        "use server";
        if (!userId) return { hasRating: false, success: false };

        const result =
            (await prisma.rating.count({
                where: { clerkId: userId, date: correctedDate },
            })) > 0;
        return { hasRating: result, success: true };
    };

    const username = await getUsernameByUserId(userId);
    const actualDate = new Date();
    const nextActualDate = new Date(
        Date.UTC(
            actualDate.getUTCFullYear(),
            actualDate.getUTCMonth(),
            actualDate.getUTCDate() + 1,
        ),
    );

    actualDate.setUTCHours(0, 0, 0, 0);
    nextActualDate.setUTCHours(0, 0, 0, 0);

    const userRated = (await checkUserRating(userId, correctedDate)).ratedToday;

    return (
        <div className="from-background flex h-dvh w-screen flex-col items-center justify-center gap-4 bg-gradient-to-b to-zinc-400/5 lg:mx-auto">
            {isAuthenticated ? (
                <Suspense
                    key={`notas (${slug})`}
                    fallback={
                        <div className="lg:bg-card/50 lg:border-border flex min-h-full min-w-full flex-col justify-center gap-7 rounded-xl border p-6 lg:min-h-0 lg:min-w-96">
                            <Skeleton className="mx-auto h-8 w-32" />
                            <div className="bg-card mx-auto flex max-h-48 w-full max-w-96 flex-col items-center justify-center overflow-hidden rounded-md border">
                                <div className="flex w-full flex-col">
                                    <Skeleton className="border-b-primary/5 h-12 w-full rounded-none border-b" />
                                    <Skeleton className="h-12 w-full rounded-none" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 *:flex-grow">
                                <Skeleton className="h-12" />
                                <Skeleton className="h-12" />
                            </div>
                        </div>
                    }
                >
                    <SlugComponent
                        {...{
                            userData,
                            userId,
                            average,
                            correctedDate: correctedDate.toISOString(),
                            previousDay: previousDay.toISOString(),
                            nextDay: nextDay.toISOString(),
                            checkedRatings,
                            ratingsAreNotAvailable,
                            checkIfDayHasRating,
                            username,
                            actualDate,
                            nextActualDate,
                            slug,
                            userRated,
                        }}
                    />
                    {/*<LazyComp />*/}
                </Suspense>
            ) : (
                <>
                    <p className="text-center">
                        Você não está logado. Entre em uma conta ou vá embora.
                    </p>
                    <Button className="p-5" asChild>
                        <SignInButton
                            fallbackRedirectUrl={`/notas/${slug}`}
                            signUpFallbackRedirectUrl={`/notas/${slug}`}
                        >
                            Log-in
                        </SignInButton>
                    </Button>
                </>
            )}
        </div>
    );
}
