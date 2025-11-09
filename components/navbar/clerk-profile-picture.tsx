"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "motion/react";

export default function ClerkProfilePicture() {
    const { isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Skeleton className="size-10 rounded-full" />
            </motion.div>
        );
    }

    return (
        <Button asChild>
            <UserButton
                appearance={{
                    elements: {
                        userButtonAvatarBox: {
                            width: "2.2rem",
                            height: "2.2rem",
                        },
                    },
                }}
            />
        </Button>
    );
}
