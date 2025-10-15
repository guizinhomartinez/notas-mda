import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

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
