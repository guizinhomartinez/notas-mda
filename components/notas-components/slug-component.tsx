"use client";

import { SlugComponentInterface } from "@/app/notas/[slug]/page";
import EmptyNota from "@/components/notas-components/empty-nota";
import RatingPopup from "@/components/signed-in/rating-popup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { ScrollAreaDemo } from "@/components/vertical-scroll";
import {
    editRatingOfSpecificDay,
    sendRatingOfSpecifcDay,
} from "@/functions/handle-rating-submit";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SlugComponent({
    userData,
    correctedDate,
    userId,
    average,
    previousDay,
    nextDay,
    pageNotFound,
    username,
    actualDate,
    nextActualDate,
    slug,
}: SlugComponentInterface) {
    const [newValues, setNewValues] = useState<string[]>(["0", "0"]);
    const [openEditMenu, setOpenEditMenu] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    function formatDate(date: Date, linkFormatting?: boolean): string {
        const d = date.getDate().toString().padStart(2, "0");
        const m = (date.getMonth() + 1).toString().padStart(2, "0");
        const y = (date.getFullYear() % 100).toString().padStart(2, "0");
        if (linkFormatting) return `${d}-${m}-${y}`;
        else return `${d}/${m}`;
    }

    async function sendRatingButtonFromAnotherDay() {
        setIsUpdating(true);

        try {
            const result = await sendRatingOfSpecifcDay(
                userId,
                newValues[0],
                newValues[1],
                correctedDate,
            );

            if (result?.success) {
                setOpenEditMenu(false);
            }
        } catch (e) {
            console.error(e);
            alert("Algo deu errado");
        } finally {
            setIsUpdating(false);
        }
    }

    async function editRatingFromAnotherDay() {
        try {
            const result = await editRatingOfSpecificDay(
                userId,
                newValues[0],
                newValues[1],
                correctedDate,
                `/notas/${slug}`,
            );

            if (result?.success) {
                setOpenEditMenu(false);
            }
        } catch (e) {
            console.error(e);
            alert("Algo deu errado");
        }
    }

    return (
        <>
            <div className="lg:bg-primary-foreground lg:border-border flex min-h-full min-w-full flex-col justify-center gap-7 rounded-xl border p-6 lg:min-h-0 lg:min-w-96">
                <p className="text-center text-2xl font-bold tracking-tight">
                    {formatDate(correctedDate)}
                </p>
                {!pageNotFound ? (
                    <>
                        <ScrollAreaDemo className="bg-secondary/15 mx-auto flex max-h-48 w-full max-w-96 flex-col items-center justify-center rounded-lg border">
                            <div className="flex w-full flex-col">
                                {userData.map((user, index) => (
                                    <div
                                        className="flex flex-col justify-center"
                                        key={user.userId ?? index}
                                    >
                                        <div className="flex items-center justify-between gap-3 p-2.5">
                                            <div className="flex items-center gap-2">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={
                                                            user.profilePicture ??
                                                            ""
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {user.username?.substring(
                                                            0,
                                                            2,
                                                        ) ?? "??"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <p>
                                                    {user.username ?? "Unknown"}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                {user.userId === userId ? (
                                                    <RatingPopup
                                                        {...{
                                                            newValues,
                                                            openEditMenu,
                                                            setNewValues,
                                                            setOpenEditMenu,
                                                            isUpdating,
                                                        }}
                                                        actionType="edit"
                                                        editRatingButton={
                                                            editRatingFromAnotherDay
                                                        }
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="!border-border/75 gap-2.5 !rounded-sm font-mono"
                                                        >
                                                            {isUpdating ? (
                                                                <Spinner />
                                                            ) : (
                                                                user.rating
                                                            )}
                                                            <Edit className="" />
                                                        </Button>
                                                    </RatingPopup>
                                                ) : (
                                                    <div className="flex h-8 items-center justify-center px-2.5 font-mono text-sm">
                                                        <p>{user.rating}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {userData.length > 0 &&
                                            index < userData.length - 1 && (
                                                <Separator key={index} />
                                            )}
                                    </div>
                                ))}
                            </div>
                        </ScrollAreaDemo>

                        <p className="text-primary/80 -mt-3 text-center text-lg">
                            Média do dia: {average}
                        </p>
                    </>
                ) : (
                    <>
                        <EmptyNota
                            {...{
                                username,
                                userId,
                                newValues,
                                openEditMenu,
                                setNewValues,
                                setOpenEditMenu,
                            }}
                            editRatingButton={sendRatingButtonFromAnotherDay}
                        />
                    </>
                )}

                <div className="absolute bottom-4 left-1/2 flex w-[calc(100vw-3rem)] -translate-x-1/2 items-center justify-center gap-2 *:flex-1 md:w-[calc(50vw)] lg:relative lg:bottom-0 lg:left-0 lg:w-full lg:translate-x-0">
                    <Link
                        href={formatDate(previousDay, true)}
                        className="w-full *:w-full"
                    >
                        <Button variant="secondary">
                            <ChevronLeft />
                            {formatDate(previousDay)}
                        </Button>
                    </Link>

                    <Link
                        href={formatDate(nextDay, true)}
                        className="w-full *:w-full"
                        onClick={(e) => {
                            if (actualDate > nextActualDate) e.preventDefault();
                        }}
                    >
                        <Button
                            variant="secondary"
                            disabled={actualDate > nextActualDate}
                        >
                            {formatDate(nextDay)}
                            <ChevronRight />
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
