"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GoBackPage() {
    const pathName = usePathname();

    return (
        <div
            className={cn(
                "transition-all duration-300 ease-in-out",
                pathName === "/" && "-translate-y-20"
            )}
        >
            <Link href="/" className="group">
                <Button
                    variant="secondary"
                    size="icon"
                    className="justify-start border px-3 duration-300 hover:w-28"
                >
                    <ArrowLeft className="-translate-x-0.5" />
                    <span className="opacity-0 duration-300 group-hover:opacity-100">
                        Go back
                    </span>
                </Button>
            </Link>
        </div>
    );
}
