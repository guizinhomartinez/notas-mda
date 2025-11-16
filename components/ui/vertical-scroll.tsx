import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function ScrollAreaDemo({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <ScrollArea
            className={cn(
                "bg-background",
                className,
            )}
        >
            {children}
        </ScrollArea>
    );
}
