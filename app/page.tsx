"use client";

import { Button } from "@/components/ui/button";
import { ScrollAreaDemo } from "@/components/vertical-scroll";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";

function getUTCDayRange(date: Date) {
    const dayRange = new Date(
        Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            0,
            0,
            0,
            0,
        ),
    );
    return { dayRange };
}

export default function Home() {
    const now = new Date();
    now.setHours(now.getHours() - 3);
    const { dayRange } = getUTCDayRange(now);

    function formatDateUTC(date: Date): string {
        const format = "dd-MM-yy";
        return formatInTimeZone(date, "UTC", format);
    }

    return (
        <ScrollAreaDemo className="from-background h-dvh max-h-dvh w-screen bg-gradient-to-b to-zinc-400/5">
            <div className="flex flex-col items-center justify-center gap-12 p-8 md:h-dvh md:gap-24">
                <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="bg-gradient-to-b from-zinc-400 to-zinc-700 bg-clip-text text-center text-7xl font-bold text-transparent dark:bg-gradient-to-t dark:!from-transparent dark:to-zinc-400">
                        Notas do M.D.A.
                    </h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <Link href="/conteudo">
                            <Button size="lg">Começar o processo.</Button>
                        </Link>
                        <Link href={`/notas/${formatDateUTC(dayRange)}`} className="w-full">
                            <Button
                                className="w-full"
                                variant="secondary"
                                size="lg"
                            >
                                Ver as notas de hoje
                            </Button>
                        </Link>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Link href="/constituicao">
                            <Button variant="link">Constituição.</Button>
                        </Link>
                        <Link href="/sobre">
                            <Button variant="link">O que é o MDA?</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </ScrollAreaDemo>
    );
}
