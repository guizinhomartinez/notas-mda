import { SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ui/change-theme";
import GoBackPage from "./ui/go-back-page";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import NavbarLinks from "@/components/navbar-links";
import NavbarCenter from "@/components/navbar-center";

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
    const { isAuthenticated } = await auth();

    const now = new Date();
    now.setHours(now.getHours() - 3);
    const { dayRange } = getUTCDayRange(now);

    return (
        <div className="from-background absolute top-0 left-0 z-50 flex w-full items-center justify-between bg-gradient-to-b to-transparent to-100% px-3 py-2">
            <NavbarLinks />
            <NavbarCenter date={dayRange} />
            <div className="flex items-center gap-2">
                {isAuthenticated ? (
                    <Button asChild className="size-10">
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
                ) : (
                    <Button
                        className="rounded-full p-5"
                        variant="outline"
                        asChild
                    >
                        <SignInButton>Log-in</SignInButton>
                    </Button>
                )}
                <ModeToggle />
            </div>
        </div>
    );
}
