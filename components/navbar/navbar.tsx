import { SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../ui/change-theme";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import NavbarHomeButton from "@/components/navbar/navbar-home-buttons";
import NavbarCenter from "@/components/navbar/navbar-center";
import { getUsernameByUserId } from "@/backend-actions/clerk-handling";
import ClerkProfilePicture from "./clerk-profile-picture";

function getUTCDayRange(date: Date) {
    const dayRange = new Date(
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
    return { dayRange };
}

export default async function Navbar() {
    const { isAuthenticated, userId } = await auth();

    const now = new Date();
    now.setHours(now.getHours() - 3);
    const { dayRange } = getUTCDayRange(now);

    const username = await getUsernameByUserId(userId);

    return (
        <div className="from-background absolute top-0 left-0 z-50 flex w-full items-center justify-between bg-gradient-to-b to-transparent to-100% px-3 py-2">
            <NavbarHomeButton />
            <NavbarCenter
                date={dayRange}
                isAuthenticated={isAuthenticated}
                username={username}
            />
            <div className="hidden items-center gap-2 md:flex">
                {isAuthenticated ? (
                    <ClerkProfilePicture />
                ) : (
                    <Button variant="outline" asChild>
                        <SignInButton>Log-in</SignInButton>
                    </Button>
                )}
                <ModeToggle />
            </div>
        </div>
    );
}
