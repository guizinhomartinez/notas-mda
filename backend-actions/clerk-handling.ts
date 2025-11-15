"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function getUsernameByUserId(userId: string | null) {
    if (!userId) return null;
    const clerk = await clerkClient();

    const user = await clerk.users.getUser(userId);

    return (
        user.username || user.firstName || user.emailAddresses[0]?.emailAddress
    );
}

export async function getProfilePhotoByUserId(userId: string | null) {
    if (!userId) return null;
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    return user.imageUrl;
}
