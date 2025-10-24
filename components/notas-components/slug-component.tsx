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
import { useState } from "react";
import { formatInTimeZone } from "date-fns-tz";

export default function SlugComponent({
    userData,
    correctedDate,
    userId,
    average,
    previousDay,
    nextDay,
    ratingsAreNotAvailable,
    username,
    actualDate,
    nextActualDate,
    slug,
    userRated,
}: SlugComponentInterface) {
    const date = new Date(correctedDate);
    const prev = new Date(previousDay);
    const next = new Date(nextDay);

    const [newValues, setNewValues] = useState<string[]>(["0", "0"]);
    const [openEditMenu, setOpenEditMenu] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    function formatDateUTC(date: Date, linkFormatting?: boolean): string {
        const format = linkFormatting ? "dd-MM-yy" : "dd/MM";
        return formatInTimeZone(date, "UTC", format);
    }

    async function sendRatingButtonFromAnotherDay() {
        setIsUpdating(true);

        try {
            const result = await sendRatingOfSpecifcDay(
                userId,
                newValues[0],
                newValues[1],
                date,
                `notas/${slug}`,
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
        setIsUpdating(true);

        try {
            const result = await editRatingOfSpecificDay(
                userId,
                newValues[0],
                newValues[1],
                date,
                `/notas/${slug}`,
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

    return (
        <>
            <div className="lg:bg-primary-foreground lg:border-border flex min-h-full min-w-full flex-col justify-center gap-7 rounded-xl border p-6 lg:min-h-0 lg:min-w-96">
                <p className="text-center text-2xl font-bold tracking-tight">
                    {formatDateUTC(date)}
                </p>
                {!ratingsAreNotAvailable ? (
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
                                                            <Edit />
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

                <div className="absolute bottom-4 left-1/2 w-[calc(100vw-3rem)] -translate-x-1/2 md:w-[calc(50vw)] lg:relative lg:bottom-0 lg:left-0 lg:w-full lg:translate-x-0">
                    <div className="flex flex-col items-center justify-center gap-3 *:flex-grow">
                        {!userRated && (
                            <RatingPopup
                                {...{
                                    openEditMenu,
                                    setOpenEditMenu,
                                    isUpdating,
                                    newValues,
                                    setNewValues,
                                }}
                                actionType="add"
                                editRatingButton={
                                    sendRatingButtonFromAnotherDay
                                }
                            >
                                <Button className="w-full">
                                    Adicionar nota
                                </Button>
                            </RatingPopup>
                        )}
                        <div className="flex w-full items-center justify-center gap-2">
                            <Link
                                href={formatDateUTC(prev, true)}
                                className="w-full *:w-full"
                            >
                                <Button variant="secondary">
                                    <ChevronLeft />
                                    {formatDateUTC(prev)}
                                </Button>
                            </Link>

                            <Link
                                href={formatDateUTC(next, true)}
                                className="w-full *:w-full"
                                onClick={(e) => {
                                    if (
                                        actualDate.getTime() >
                                        nextActualDate.getTime()
                                    )
                                        e.preventDefault();
                                }}
                            >
                                <Button
                                    variant="secondary"
                                    disabled={
                                        actualDate.getTime() >
                                        nextActualDate.getTime()
                                    }
                                >
                                    {formatDateUTC(next)}
                                    <ChevronRight />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
