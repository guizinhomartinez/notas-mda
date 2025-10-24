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
import { MoreHorizontal } from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

interface navbarButtonsType {
    text: string;
    link: string;
}

export default function NavbarCenter({ date }: { date: Date }) {
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    function formatDateUTC(date: Date): string {
        const format = "dd-MM-yy";
        return formatInTimeZone(date, "UTC", format);
    }

    const navbarButtons: navbarButtonsType[] = [
        {
            text: "Nova nota",
            link: "/conteudo",
        },
        {
            text: "Ver notas do dia",
            link: `/notas/${formatDateUTC(date)}`,
        },
        {
            text: "Constituição",
            link: "/constituicao",
        },
        {
            text: "Sobre",
            link: "/sobre",
        },
    ];

    return (
        <>
            {isMobile ? (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        <Button variant="ghost" className="mr-auto ml-1">
                            <MoreHorizontal />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="w-full">
                        <VisuallyHidden.Root>
                            <DrawerHeader>
                                <DrawerTitle>More options menu</DrawerTitle>
                            </DrawerHeader>
                        </VisuallyHidden.Root>

                        <div className="flex w-full flex-col gap-2 p-4">
                            {navbarButtons.map((element, index) => (
                                <Link
                                    href={element.link}
                                    key={`${element.text}-${index}`}
                                    className="w-full"
                                >
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "!bg-primary-foreground/50 !border-border/75 w-full",
                                            pathname === element.link &&
                                                "!bg-accent",
                                        )}
                                        onClick={() => setOpen(false)}
                                    >
                                        {element.text}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                        <DrawerFooter className="w-full">
                            <DrawerClose asChild>
                                <Button variant="outline" className="w-full">
                                    Fechar
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            ) : (
                <div className="hover:bg-primary-foreground/50 hover:border-border mx-auto flex w-fit items-center justify-center gap-1 overflow-x-auto rounded-lg border border-transparent p-1 opacity-20 transition-all duration-300 hover:opacity-100 hover:shadow-md hover:backdrop-blur-md">
                    {navbarButtons.map((element, index) => (
                        <Link
                            href={element.link}
                            key={`${element.text} - ${index}`}
                        >
                            <Button
                                variant="ghost"
                                className={cn(
                                    "!text-primary/75 relative transition-all",
                                    (pathname === element.link ||
                                        (pathname.startsWith("/nota") &&
                                            element.link.startsWith(
                                                "/nota",
                                            ))) &&
                                        "!text-primary hover:!bg-transparent",
                                )}
                            >
                                {element.text}
                                {(pathname === element.link ||
                                    (pathname.startsWith("/nota") &&
                                        element.link.startsWith("/nota"))) && (
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
                    ))}
                </div>
            )}
        </>
    );
}
