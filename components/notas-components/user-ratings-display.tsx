"use client";

import EmptyNotePlaceholder from "@/components/notas-components/empty-note-placeholder";
import RatingEditor from "@/components/ui/rating-components/rating-editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { ScrollAreaDemo } from "@/components/ui/vertical-scroll";
import {
    editRatingOfSpecificDay,
    sendRatingOfSpecifcDay,
} from "@/backend-actions/handle-rating-submit";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { UserRatingsDisplayInterface } from "@/app/notas/[slug]/page";

export default function UserRatingsDisplay({
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
}: UserRatingsDisplayInterface) {
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
            <div className="lg:bg-card/50 lg:border-border flex min-h-full min-w-full flex-col justify-center gap-7 rounded-xl border p-6 lg:min-h-0 lg:min-w-96">
                <p className="tranlate-y-3 text-center text-2xl font-bold tracking-tight md:translate-y-0">
                    {formatDateUTC(date)}
                </p>
                {!ratingsAreNotAvailable ? (
                    <>
                        <ScrollAreaDemo className="bg-card mx-auto flex max-h-48 w-full max-w-96 flex-col items-center justify-center rounded-md border">
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
                                                    <RatingEditor
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
                                                    </RatingEditor>
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

                        <p className="text-card-foreground/80 -mt-3 text-center text-lg">
                            Média do dia: {average}
                        </p>
                    </>
                ) : (
                    <>
                        <EmptyNotePlaceholder
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
                            <RatingEditor
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
                            </RatingEditor>
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
