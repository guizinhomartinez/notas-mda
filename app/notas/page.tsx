import CalendarioPageContent from "@/components/notas-components/calendario-page-content";
import { ScrollAreaDemo } from "@/components/vertical-scroll";
import { checkAllRatings } from "@/functions/handle-rating-submit";

export type DayAverage = {
    date: Date;
    average: number | null;
};

export default async function NotasCalendario() {
    const date = new Date();

    const averages: DayAverage[] = await getYearAverages(
        new Date().getFullYear(),
    );

    return (
        <ScrollAreaDemo className="from-background flex h-dvh w-screen items-center gap-4 bg-gradient-to-b to-zinc-400/5 lg:mx-auto">
            <CalendarioPageContent date={date} averages={averages} />
        </ScrollAreaDemo>
    );
}

async function getYearAverages(year: number): Promise<DayAverage[]> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const daysInYear =
        Math.floor(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1;

    const averages = await Promise.all(
        Array.from({ length: daysInYear }, async (_, i) => {
            const date = new Date(year, 0, 1 + i);
            const checkedRatings = await checkAllRatings(date);

            if (!checkedRatings?.ratings?.length)
                return { date, average: null };

            const average =
                checkedRatings.ratings.reduce((sum, val) => sum + val, 0) /
                checkedRatings.ratings.length;

            return { date, average };
        }),
    );

    return averages;
}
