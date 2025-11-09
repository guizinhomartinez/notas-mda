"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarHomeButton() {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-2">
            <Link href="/">
                <Button
                    variant="outline"
                    className={cn("group", pathname === "/" && "bg-accent")}
                    size="icon"
                >
                    <HomeIcon
                        className={cn(
                            "text-muted-foreground",
                            pathname === "/" && "!text-primary stroke-3",
                        )}
                    />
                </Button>
            </Link>
        </div>
    );
}
