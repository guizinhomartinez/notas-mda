"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { Skeleton } from "./skeleton";
import { motion } from "motion/react";

export function ModeToggle({
    variant,
    expandOnHover,
    className,
}: {
    variant?:
        | "outline"
        | "secondary"
        | "link"
        | "default"
        | "destructive"
        | "ghost"
        | null
        | undefined;
    expandOnHover?: boolean;
    className?: string;
}) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Skeleton className="size-9" />
            </motion.div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={variant ?? "outline"}
                    size="icon"
                    className={cn(
                        "group *:text-foreground relative justify-start overflow-hidden px-3 duration-300",
                        !expandOnHover && "justify-center",
                        expandOnHover &&
                            (theme !== "system"
                                ? "hover:w-32"
                                : "hover:!w-[7.5rem]"),
                        className,
                    )}
                >
                    <Sun
                        className={cn(
                            "h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90",
                            expandOnHover && "translate-x-0.5",
                        )}
                    />
                    <Moon
                        className={cn(
                            "absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0",
                            expandOnHover && "translate-x-0.5",
                        )}
                    />
                    <span
                        className={cn(
                            "opacity-0 duration-300 group-hover:opacity-100",
                            !expandOnHover && "hidden",
                        )}
                    >
                        {theme !== "system"
                            ? `${capitalizeFirstLetter(String(theme))} theme`
                            : "System"}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
