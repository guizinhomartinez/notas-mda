"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function getUTCDayRange(date: Date) {
    const start = new Date(
        Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            0,
            0,
            0,
            0,
        ),
    );
    const end = new Date(
        Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            23,
            59,
            59,
            999,
        ),
    );
    return { start, end };
}

export async function sendRating(
    userId: string | null,
    firstValue: string,
    secondValue: string,
) {
    if (!userId) throw new Error("No user ID provided");

    const now = new Date();
    now.setHours(now.getHours() - 3);
    const { start, end } = getUTCDayRange(now);

    const existingRating = await prisma.rating.findFirst({
        where: {
            clerkId: userId,
            date: {
                gte: start,
                lte: end,
            },
        },
    });

    if (existingRating) return { alreadyRated: true };

    await prisma.rating.create({
        data: {
            value: Number(firstValue) + Number(secondValue) / 10,
            clerkId: userId,
            date: new Date(now.toISOString()), // Ensures UTC
        },
    });

    return { success: true };
}

export async function sendRatingOfSpecifcDay(
    userId: string | null,
    firstValue: string,
    secondValue: string,
    customDate: Date,
) {
    if (!userId) throw new Error("No user ID provided");

    const { start, end } = getUTCDayRange(customDate);

    const existingRating = await prisma.rating.findFirst({
        where: {
            clerkId: userId,
            date: {
                gte: start,
                lte: end,
            },
        },
    });

    if (existingRating) return { alreadyRated: true };

    await prisma.rating.create({
        data: {
            value: Number(firstValue) + Number(secondValue) / 10,
            clerkId: userId,
            date: new Date(customDate.toISOString()), // Force UTC
        },
    });

    return { success: true };
}

export async function checkUserRating(userId: string | null, customDate: Date) {
    if (!userId) return { ratedToday: false };

    const { start, end } = getUTCDayRange(customDate);

    const existingRating = await prisma.rating.findFirst({
        where: {
            clerkId: userId,
            date: { gte: start, lte: end },
        },
    });

    return { ratedToday: !!existingRating, ratedValue: existingRating?.value };
}

export async function editRating(
    userId: string | null,
    newFirstValue: string,
    newSecondValue: string,
    customDate: Date,
) {
    if (!userId) return { success: false };

    const { start, end } = getUTCDayRange(customDate);

    await prisma.rating.updateMany({
        where: {
            clerkId: userId,
            date: { gte: start, lte: end },
        },
        data: {
            value: Number(newFirstValue) + Number(newSecondValue) / 10,
            date: new Date(customDate.toISOString()),
        },
    });

    return {
        success: true,
        ratedValue: Number(newFirstValue) + Number(newSecondValue) / 10,
    };
}

export async function editRatingOfSpecificDay(
    userId: string | null,
    newFirstValue: string,
    newSecondValue: string,
    customDate: Date,
    pathToRevalidate: string,
) {
    if (!userId) return { success: false };

    const { start, end } = getUTCDayRange(customDate);

    await prisma.rating.updateMany({
        where: {
            clerkId: userId,
            date: { gte: start, lte: end },
        },
        data: {
            value: Number(newFirstValue) + Number(newSecondValue) / 10,
            date: new Date(customDate.toISOString()),
        },
    });

    revalidatePath(pathToRevalidate);

    return {
        success: true,
        ratedValue: Number(newFirstValue) + Number(newSecondValue) / 10,
    };
}

export async function checkAllRatings(customDate: Date) {
    const { start, end } = getUTCDayRange(customDate);

    const result = await prisma.rating.findMany({
        where: {
            date: { gte: start, lte: end },
        },
        orderBy: { value: "desc" },
    });

    return {
        ratings: result.map((r) => r.value),
        userId: result.map((r) => r.clerkId),
    };
}

export async function getDayAverage(date: Date) {
    const checkedRatings = await checkAllRatings(date);
    if (!checkedRatings?.ratings.length) return 0;

    const total = checkedRatings.ratings.reduce((sum, val) => sum + val, 0);
    return total / checkedRatings.ratings.length;
}
