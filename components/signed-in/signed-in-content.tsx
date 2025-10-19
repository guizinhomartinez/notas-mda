"use server";

import RatingInterface from "./rating-interface";
import { auth } from "@clerk/nextjs/server";

export default async function SignedInContent() {
    const { userId } = await auth();

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <RatingInterface {...{userId}} />
        </div>
    );
}
