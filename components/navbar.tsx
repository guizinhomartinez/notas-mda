import { ModeToggle } from "./ui/change-theme";

export default function Navbar() {
    return (
        <>
            <div className="flex items-center gap-1.5 justify-end p-2 fixed top-1 right-1 bg-primary-foreground/80 transition-[width,opacity] max-w-96 duration-300 rounded-full z-50 backdrop-blur-sm opacity-30 hover:opacity-100">
                <ModeToggle />
            </div>
        </>
    );
}
