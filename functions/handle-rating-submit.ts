"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);
const endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);

export async function sendRating(
    userId: string | null,
    firstValue: string,
    secondValue: string,
) {
    if (!userId) throw new Error("No user ID provided");

    // Check if user already rated today
    const existingRating = await prisma.rating.findFirst({
        where: {
            clerkId: userId,
            date: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    });

    if (existingRating) {
        return { alreadyRated: true };
    }

    // If not, create a new one
    await prisma.rating.create({
        data: {
            value: Number(firstValue) + Number(secondValue) / 10,
            clerkId: userId,
            date: new Date(),
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

    const startDay = new Date(customDate);
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date(customDate);
    endDay.setHours(23, 59, 59, 999);

    // Check if user already rated
    const existingRating = await prisma.rating.findFirst({
        where: {
            clerkId: userId,
            date: {
                gte: startDay,
                lte: endDay,
            },
        },
    });

    if (existingRating) {
        return { alreadyRated: true };
    }

    // If not, create a new one
    await prisma.rating.create({
        data: {
            value: Number(firstValue) + Number(secondValue) / 10,
            clerkId: userId,
            date: customDate,
        },
    });

    return { success: true };
}

export async function checkUserRating(userId: string | null) {
    if (!userId) return { ratedToday: false };

    const existingRating = await prisma.rating.findFirst({
        where: {
            clerkId: userId,
            date: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    });

    return { ratedToday: !!existingRating, ratedValue: existingRating?.value };
}

export async function editRating(
    userId: string | null,
    newFirstValue: string,
    newSecondValue: string,
) {
    if (!userId) return { success: false };

    await prisma.rating.updateMany({
        where: {
            clerkId: userId,
            date: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
        data: {
            value: Number(newFirstValue) + Number(newSecondValue) / 10,
            date: new Date(),
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

    const startDay = new Date(customDate);
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date(customDate);
    endDay.setHours(23, 59, 59, 999);

    await prisma.rating.updateMany({
        where: {
            clerkId: userId,
            date: {
                gte: startDay,
                lte: endDay,
            },
        },
        data: {
            value: Number(newFirstValue) + Number(newSecondValue) / 10,
            date: customDate,
        },
    });

    revalidatePath(pathToRevalidate);

    return {
        success: true,
        ratedValue: Number(newFirstValue) + Number(newSecondValue) / 10,
    };
}

export async function checkAllRatings(customDate: Date) {
    const startDay = new Date(
        customDate.getFullYear(),
        customDate.getMonth(),
        customDate.getDate(),
        0,
        0,
        0,
        0,
    );
    const endDay = new Date(
        customDate.getFullYear(),
        customDate.getMonth(),
        customDate.getDate(),
        23,
        59,
        59,
        999,
    );

    const result = await prisma.rating.findMany({
        where: {
            date: {
                gte: startDay,
                lte: endDay,
            },
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
