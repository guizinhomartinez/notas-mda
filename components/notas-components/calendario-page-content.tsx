"use client";

import { DayAverage } from "@/app/notas/page";
import CalendarNotas from "@/components/notas-components/calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function CalendarioPageContent({
    date,
    averages,
}: {
    date: Date;
    averages: DayAverage[];
}) {
    const [tab, setTab] = useState<"month" | "week">("month");

    const [dateState, setDateState] = useState<Date>(date);
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

    const day = String(hoveredDate?.getDate() ?? 1).padStart(2, "0");
    const month = String((hoveredDate?.getMonth() ?? 0) + 1).padStart(2, "0");
    const year = String(hoveredDate?.getFullYear() ?? date.getFullYear()).slice(
        -2,
    );

    const correctedDate = `${day}-${month}-${year}`;

    // const AveragesMapComponent = ({ index }: { index: number }) => {
    //     const day = new Date(date.getFullYear(), index, 1);

    //     const CalendarComponent = ({ value }: { value: number }) => {
    //         return (
    //             <div>
    //                 {Array.from({ length: 12 }).map((_, index) => (
    //                     <CalendarNotas
    //                         key={index}
    //                         month={day}
    //                         date={dateState}
    //                         setDate={setDateState}
    //                         textStr={String(value)}
    //                         hrefStr={correctedDate}
    //                         hoveredDate={hoveredDate}
    //                         setHoveredDate={setHoveredDate}
    //                     />
    //                 ))}
    //             </div>
    //         );
    //     };

    //     return (
    //         <div>
    //             {averages.map((value, index) => (
    //                 <CalendarComponent value={value.average ?? 0} key={index} />
    //             ))}
    //         </div>
    //     );
    // };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 p-4 py-20">
                <p className="absolute top-5 right-5">{hoveredDate?.toString()}</p>
                <div className="bg-primary-foreground/50 border-border absolute top-2.5 left-1/2 z-50 flex w-max -translate-x-1/2 gap-0.5 rounded-lg border p-0.5 opacity-50 backdrop-blur-sm transition-opacity duration-150 hover:opacity-100">
                    <button
                        className={cn(
                            "w-24 rounded-md px-1 py-0.5 transition-colors duration-150",
                            tab === "month"
                                ? "bg-secondary"
                                : "hover:bg-secondary/50",
                        )}
                        onClick={(e) => setTab("month")}
                    >
                        Mês
                    </button>
                    <button
                        className={cn(
                            "w-24 rounded-md px-1 py-0.5 transition-colors duration-150",
                            tab === "week"
                                ? "bg-secondary"
                                : "hover:bg-secondary/50",
                        )}
                        onClick={(e) => setTab("week")}
                    >
                        Semana
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <CalendarNotas
                            key={index}
                            month={new Date(date.getFullYear(), index, 1)}
                            date={dateState}
                            setDate={setDateState}
                            textStr={"a"}
                            hrefStr={correctedDate}
                            hoveredDate={hoveredDate}
                            setHoveredDate={setHoveredDate}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
