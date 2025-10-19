import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="from-background flex h-screen w-screen flex-col items-center justify-center gap-4 bg-gradient-to-b to-zinc-400/5 lg:mx-auto">
            <div className="lg:bg-primary-foreground lg:border-border flex min-h-full w-full flex-col justify-center gap-7 rounded-xl border p-6 lg:min-h-0 lg:!w-96">
                <p className="text-center text-xl">Mona, essa página não é divonica e não tem notas!!! Abafaaaa</p>
                <div className="absolute bottom-4 left-1/2 flex w-[calc(100vw-3rem)] -translate-x-1/2 items-center justify-center gap-2 *:flex-1 md:w-[calc(50vw)] lg:relative lg:bottom-0 lg:left-0 lg:w-full lg:translate-x-0">
                    <Link href="/" className="w-full *:w-full">
                        <Button>Voltar</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
