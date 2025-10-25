"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "radix-ui";
import { useState } from "react";
import {
    AlignRight,
    CalendarCheck,
    Info,
    LucideIcon,
    Moon,
    NotebookPen,
    Scroll,
    SettingsIcon,
    Sun,
    X,
} from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/change-theme";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { useTheme } from "next-themes";

interface navbarButtonsType {
    text: string;
    link: string;
    icon?: LucideIcon;
}

export default function NavbarCenter({
    date,
    isAuthenticated,
    username,
}: {
    date: Date;
    isAuthenticated: boolean;
    username: string | null;
}) {
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const { theme, setTheme } = useTheme();

    function formatDateUTC(date: Date): string {
        const format = "dd-MM-yy";
        return formatInTimeZone(date, "UTC", format);
    }

    const navbarButtons: navbarButtonsType[] = [
        {
            text: "Nova nota",
            link: "/conteudo",
            icon: NotebookPen,
        },
        {
            text: "Notas de hoje",
            link: `/notas/${formatDateUTC(date)}`,
            icon: CalendarCheck,
        },
        {
            text: "Constituição",
            link: "/constituicao",
            icon: Scroll,
        },
        {
            text: "Sobre",
            link: "/sobre",
            icon: Info,
        },
    ];

    const isActiveTab = navbarButtons.map(
        (element, index) =>
            pathname === element.link ||
            (pathname.startsWith("/nota") && element.link.startsWith("/nota")),
    );

    return (
        <>
            {isMobile ? (
                <>
                    <Drawer
                        open={open}
                        onOpenChange={setOpen}
                        nested={false}
                        modal={false}
                    >
                        <DrawerTrigger asChild>
                            <Button variant="ghost" className="">
                                <AlignRight />
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="w-full pt-4">
                            <VisuallyHidden.Root>
                                <DrawerHeader>
                                    <DrawerTitle>More options menu</DrawerTitle>
                                </DrawerHeader>
                            </VisuallyHidden.Root>

                            <div className="flex w-full flex-col gap-2 p-4">
                                <div
                                    className="flex flex-col items-end justify-center py-2"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    {isAuthenticated ? (
                                        <div className="mx-auto flex flex-col items-center">
                                            <div className="relative">
                                                <UserButton
                                                    appearance={{
                                                        elements: {
                                                            userButtonAvatarBox:
                                                                {
                                                                    width: "3.5rem",
                                                                    height: "3.5rem",
                                                                    position:
                                                                        "relative",
                                                                    zIndex: 70,
                                                                },
                                                        },
                                                    }}
                                                />
                                                <div className="absolute -right-1 -bottom-1">
                                                    <Button
                                                        size="icon-sm"
                                                        variant="secondary"
                                                        className="size-6 rounded-full shadow-md"
                                                    >
                                                        <SettingsIcon />
                                                    </Button>
                                                </div>
                                            </div>

                                            <p className="text-xl font-bold tracking-tight">
                                                {username ?? "Unknown"}
                                            </p>
                                        </div>
                                    ) : (
                                        <Button
                                            className="rounded-full p-5"
                                            variant="outline"
                                            asChild
                                        >
                                            <SignInButton>Log-in</SignInButton>
                                        </Button>
                                    )}
                                    <div className="absolute top-2 left-3">
                                        <DropdownMenu
                                            open={openDropdown}
                                            onOpenChange={setOpenDropdown}
                                        >
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="group *:text-foreground relative justify-start overflow-hidden px-3 duration-300"
                                                >
                                                    <Sun className="h-[1.2rem] w-[1.2rem] -translate-x-0.5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] -translate-x-0.5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                                    <span className="opacity-0 duration-300 group-hover:opacity-100">
                                                        {theme !== "system"
                                                            ? `${capitalizeFirstLetter(String(theme))} theme`
                                                            : "System"}
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        setTheme("light")
                                                    }
                                                >
                                                    Light
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        setTheme("dark")
                                                    }
                                                >
                                                    Dark
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        setTheme("system")
                                                    }
                                                >
                                                    System
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <Separator className="mb-2" />
                                <div className="bg-secondary/30 -mb-6 overflow-hidden rounded-lg [&>:last-child>button]:border-b-0">
                                    {navbarButtons.map((element, index) => {
                                        const Icon = element.icon as
                                            | LucideIcon
                                            | undefined;
                                        return (
                                            <Link
                                                href={element.link}
                                                key={`${element.text}-${index}`}
                                                className="w-full"
                                            >
                                                <Button
                                                    key={`${element.text}-${index}-button`}
                                                    variant="ghost"
                                                    className={cn(
                                                        "border-b-border w-full justify-between gap-3 rounded-none border-b !py-4",
                                                        isActiveTab &&
                                                            "!bg-accent",
                                                    )}
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                >
                                                    {element.text}
                                                    {Icon && (
                                                        <Icon
                                                            size={20}
                                                            strokeWidth={1.5}
                                                        />
                                                    )}
                                                </Button>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button
                                        variant="ghost"
                                        className="absolute top-2 right-2 rounded-full"
                                    >
                                        <X />
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={() =>
                                    !openDropdown && setOpen((prev) => !prev)
                                }
                                className="absolute inset-0 z-50 h-screen w-screen bg-black/50"
                            />
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <div className="bg-primary-foreground/50 border-border absolute top-1 left-1/2 mx-auto flex w-fit -translate-x-1/2 items-center justify-center gap-1 overflow-x-auto rounded-lg border p-1 backdrop-blur-md transition-all duration-300 hover:shadow-md">
                    {navbarButtons.map((element, index) => {
                        const Icon = element.icon as LucideIcon | undefined;
                        return (
                            <Link
                                href={element.link}
                                key={`${element.text} - ${index}`}
                            >
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "!text-primary/75 relative transition-all",
                                        isActiveTab &&
                                            "!text-primary hover:!bg-transparent",
                                    )}
                                >
                                    {Icon && (
                                        <Icon
                                            size={20}
                                            strokeWidth={1.5}
                                            className={cn("text-foreground", isActiveTab && "fill-foreground")}
                                        />
                                    )}

                                    {element.text}
                                    {isActiveTab && (
                                        <motion.div
                                            layoutId="tabs-background"
                                            className="bg-accent absolute inset-0 -z-10 rounded-lg"
                                            transition={{
                                                type: "spring",
                                                bounce: 0,
                                                duration: 0.6,
                                            }}
                                        />
                                    )}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
}
