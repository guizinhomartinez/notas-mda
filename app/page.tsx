"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="from-background flex h-dvh max-h-dvh w-screen flex-col items-center justify-center gap-24 bg-gradient-to-b to-zinc-400/5 p-8">
            <div className="flex flex-col items-center justify-center gap-3">
                <h1 className="bg-gradient-to-b from-zinc-400 to-zinc-700 bg-clip-text text-center text-7xl font-bold text-transparent dark:bg-gradient-to-t dark:!from-transparent dark:to-zinc-400">
                    Notas do M.D.A.
                </h1>
            </div>
            <div className="flex flex-col flex-wrap items-center justify-center gap-4 *:flex-1">
                <Link href="/conteudo">
                <Button className="px-4 py-3">Começar o processo.</Button>                
                </Link>

                <div className="flex items-center justify-center gap-2 *:w-40 md:*:w-40">
                    <Link
                        href="/constituicao"
                        className="flex-grow *:h-10 *:w-40 *:flex-wrap md:*:w-40"
                    >
                        <Button variant="outline">Constituição.</Button>
                    </Link>

                    <Link
                        href="/sobre"
                        className="flex-grow *:h-10 *:w-40 *:flex-wrap md:*:w-40"
                    >
                        <Button variant="outline">
                            O que é o MDA?
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
