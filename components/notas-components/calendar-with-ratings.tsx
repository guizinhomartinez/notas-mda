"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { DayButtonProps } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";

export default function CalendarWithRatings({
    month,
    textStr,
    date,
    setDate,
    hrefStr,
    hoveredDate,
    setHoveredDate,
}: {
    month: Date;
    textStr?: string | undefined;
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
    hrefStr: string;
    hoveredDate: Date | null;
    setHoveredDate: Dispatch<SetStateAction<Date | null>>;
}) {
    const router = useRouter();

    return (
        <Calendar
            mode="single"
            required
            selected={date}
            onSelect={setDate}
            month={month}
            disableNavigation
            showOutsideDays={false}
            lang="pt-br"
            locale={ptBR}
            className="overflow-hidden rounded-md border p-2"
            classNames={{
                month_caption: "ms-2.5 me-20 justify-start",
                nav: "hidden",
            }}
            onDayClick={(e) => {
                if (hoveredDate?.toDateString() === e.toDateString()) {
                    router.push(`/notas/${hrefStr}`);
                } else {
                    setHoveredDate(e);
                }
            }}
            // onDayMouseEnter={(e) => setTimeout(setHoveredDate, 500)}
            // onDayMouseLeave={() => setHoveredDate(null)}
            components={{
                DayButton: (props: DayButtonProps) => (
                    <DayButton
                        {...props}
                        text={textStr ?? ""}
                        hrefStr={hrefStr}
                    />
                ),
            }}
        />
    );
}

function DayButton(
    props: DayButtonProps & { text: string | undefined; hrefStr: string },
) {
    const { day, modifiers, text, hrefStr, ...buttonProps } = props;

    return (
        <button {...buttonProps}>
            <span className="flex flex-col">
                {props.children}
                {text && (
                    <span
                        className={cn(
                            "text-[10px] font-medium",
                            Number(text) > 5
                                ? "text-emerald-500"
                                : "text-muted-foreground group-data-selected:text-primary-foreground/70",
                        )}
                    >
                        {text}
                    </span>
                )}
            </span>
        </button>
    );
}
