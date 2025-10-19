import { ReactNode } from "react";
import { ScrollAreaDemo } from "./vertical-scroll";

export default function ExplanationPages({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="mx-auto flex h-dvh max-h-dvh w-screen flex-col items-center justify-center gap-24">
            <div className="md:border-border h-dvh w-full max-w-2xl shadow-xs md:h-[96dvh] md:rounded-xl md:border-[1.5]">
                <ScrollAreaDemo className="bg-accent/10 h-full w-full">
                    <div className="flex flex-col items-center justify-center gap-2 px-6 pt-18 pb-12">
                        {children}
                    </div>
                </ScrollAreaDemo>
            </div>
        </div>
    );
}
