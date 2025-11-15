"use client";

import CalendarNotas from "@/components/notas-components/calendar-with-ratings";
import { motion } from "motion/react";
import { useState } from "react";

interface tabTypesInterface {
    text: string;
    type: "month" | "week";
}

const tabTypes: tabTypesInterface[] = [
    {
        text: "Mês",
        type: "month",
    },
    {
        text: "Semana",
        type: "week",
    },
];

export default function CalendarView({ date }: { date: Date }) {
    const [tab, setTab] = useState<"month" | "week">("month");

    const [dateState, setDateState] = useState<Date>(date);
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

    const day = String(hoveredDate?.getDate() ?? 1).padStart(2, "0");
    const month = String((hoveredDate?.getMonth() ?? 0) + 1).padStart(2, "0");
    const year = String(hoveredDate?.getFullYear() ?? date.getFullYear()).slice(
        -2,
    );

    const correctedDate = `${day}-${month}-${year}`;

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 p-4 py-20">
                <p className="absolute top-5 right-5">
                    {hoveredDate?.toString()}
                </p>
                <div className="bg-primary-foreground/50 border-border absolute bottom-2.5 left-1/2 z-40 flex w-max -translate-x-1/2 gap-0.5 rounded-lg border p-0.5 opacity-50 backdrop-blur-sm transition-opacity duration-150 hover:opacity-100">
                    {tabTypes.map((element, index) => (
                        <button
                            className="hover:bg-secondary/50 relative w-24 rounded-md px-1 py-0.5 transition-colors duration-150"
                            onClick={() => setTab(element.type)}
                            key={index}
                        >
                            {element.text}

                            {element.type === tab && (
                                <motion.div
                                    layoutId="tabs-background-calendar"
                                    className="bg-secondary absolute inset-0 -z-10 rounded-lg"
                                    transition={{
                                        type: "spring",
                                        bounce: 0,
                                        duration: 0.6,
                                    }}
                                ></motion.div>
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex items-center justify-center">
                    <CalendarNotas
                        month={date}
                        date={dateState}
                        setDate={setDateState}
                        textStr={"a"}
                        hrefStr={correctedDate}
                        hoveredDate={hoveredDate}
                        setHoveredDate={setHoveredDate}
                    />
                </div>
            </div>
        </>
    );
}
