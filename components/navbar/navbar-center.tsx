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
import { useEffect, useState } from "react";
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
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";

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

    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        setPageLoaded(true);
    }, []);

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

    return (
        <>
            {isMobile ? (
                <>
                    {!pageLoaded ? (
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Skeleton className="size-9 rounded-md md:hidden" />
                        </motion.div>
                    ) : (
                        <>
                            <Drawer
                                open={open}
                                onOpenChange={setOpen}
                                nested={false}
                                modal={false}
                            >
                                <DrawerTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <AlignRight />
                                    </Button>
                                </DrawerTrigger>
                                <DrawerContent className="h-fit max-h-full pb-8">
                                    <DrawerFooter className="mt-0 flex flex-row items-start justify-between gap-2 px-4 py-0 pt-3">
                                        <ModeToggle
                                            variant="ghost"
                                            className="rounded-full"
                                        />
                                        <DrawerClose asChild>
                                            <Button
                                                variant="ghost"
                                                className="rounded-full"
                                                size="icon"
                                            >
                                                <X />
                                            </Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                    <VisuallyHidden.Root>
                                        <DrawerHeader>
                                            <DrawerTitle>
                                                More options menu
                                            </DrawerTitle>
                                        </DrawerHeader>
                                    </VisuallyHidden.Root>

                                    <div className="flex w-full flex-col gap-2 p-4 pt-0">
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
                                                <div className="mx-auto flex flex-col items-center gap-2">
                                                    <p className="text-center text-xl font-semibold">
                                                        Você não está logado
                                                    </p>
                                                    <Button
                                                        variant="outline"
                                                        size="lg"
                                                        asChild
                                                    >
                                                        <SignInButton>
                                                            Log-in
                                                        </SignInButton>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        <Separator className="mb-2" />
                                        <div className="bg-secondary/30 -mb-6 overflow-hidden rounded-lg [&>:last-child>button]:border-b-0">
                                            {navbarButtons.map(
                                                (element, index) => {
                                                    const Icon =
                                                        element.icon as
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
                                                                    "border-b-border h-12 w-full justify-between gap-3 rounded-none border-b !px-5",
                                                                    pathname ===
                                                                        element.link ||
                                                                        (pathname.startsWith(
                                                                            "/nota",
                                                                        ) &&
                                                                            element.link.startsWith(
                                                                                "/nota",
                                                                            ) &&
                                                                            "!bg-accent"),
                                                                )}
                                                                onClick={() =>
                                                                    setOpen(
                                                                        false,
                                                                    )
                                                                }
                                                            >
                                                                {element.text}
                                                                {Icon && (
                                                                    <Icon
                                                                        size={
                                                                            20
                                                                        }
                                                                        strokeWidth={
                                                                            1.5
                                                                        }
                                                                    />
                                                                )}
                                                            </Button>
                                                        </Link>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => setOpen((prev) => !prev)}
                                        className="absolute inset-0 z-50 h-screen w-screen bg-black/50"
                                    />
                                )}
                            </AnimatePresence>
                        </>
                    )}
                </>
            ) : (
                <div className="bg-primary-foreground/50 dark:bg-background/50 border-border absolute top-1 left-1/2 mx-auto hidden w-fit -translate-x-1/2 items-center justify-center gap-1 overflow-x-auto rounded-xl border p-1 backdrop-blur-md transition-all duration-300 hover:shadow-sm md:flex">
                    {navbarButtons.map((element, index) => {
                        const Icon = element.icon as LucideIcon | undefined;
                        const isActiveTab =
                            pathname === element.link ||
                            (pathname.startsWith("/nota") &&
                                element.link.startsWith("/nota"));

                        return (
                            <Link
                                href={element.link}
                                key={`${element.text} - ${index}`}
                            >
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "text-card-foreground/75 relative rounded-lg transition-all",
                                        isActiveTab &&
                                            "fill-foreground !text-primary",
                                    )}
                                >
                                    {Icon && (
                                        <Icon
                                            size={20}
                                            strokeWidth={1.5}
                                            className={cn(
                                                "text-muted-foreground transition-all duration-300",
                                                isActiveTab &&
                                                    "text-primary stroke-3",
                                            )}
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
