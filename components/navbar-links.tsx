"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLinks() {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-2">
            <Link href="/">
                <Button
                    variant="ghost"
                    className={cn("group", pathname === "/" && "bg-accent")}
                >
                    <HomeIcon className={cn("group-hover:fill-primary transition-all duration-300", pathname === "/" && "fill-primary")} />
                </Button>
            </Link>
        </div>
    );
}
