import CalendarioPageContent from "@/components/notas-components/calendario-page-content";
import { ScrollAreaDemo } from "@/components/vertical-scroll";

export default async function NotasCalendario() {
    const date = new Date();

    // const averages: DayAverage[] = await getYearAverages(
    //     new Date().getFullYear(),
    // );

    return (
        <ScrollAreaDemo className="from-background flex h-dvh w-screen items-center gap-4 bg-gradient-to-b to-zinc-400/5 lg:mx-auto">
            <CalendarioPageContent date={date} />
        </ScrollAreaDemo>
    );
}