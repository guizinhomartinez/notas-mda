import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ui/change-theme";
import GoBackPage from "./ui/go-back-page";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <>
            <GoBackPage />
            <div className="bg-primary-foreground/80 fixed top-1 right-1 z-50 flex max-w-96 items-center justify-end gap-1.5 rounded-full p-2 opacity-30 backdrop-blur-sm transition-[width,opacity] duration-300 hover:opacity-100">
                <SignedIn>
                    <Button
                        asChild
                        className="size-10"
                    >
                        <UserButton
                            appearance={{
                                elements: { userButtonAvatarBox: {
                                    width: "2.5rem",
                                    height: "2.5rem"
                                } },
                            }}
                        />
                    </Button>
                </SignedIn>
                <ModeToggle />
            </div>
        </>
    );
}
