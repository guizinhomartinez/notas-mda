"use client";

import {
    checkUserRating,
    sendRating,
    editRating,
} from "@/functions/handle-rating-submit";
import { useEffect, useState } from "react";
import RatingForm from "./rating-form";
import { Spinner } from "../ui/spinner";
import EditRatingUI from "./edit-rating";

export default function RatingInterface({
    userId,
    date,
}: {
    userId: string | null;
    date: Date;
}) {
    const [firstValue, setFirstValue] = useState("0");
    const [secondValue, setSecondValue] = useState("0");
    const [newValues, setNewValues] = useState<string[]>(["0", "0"]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [loadingEditMenu, setLoadingEditMenu] = useState(false);
    const [openEditMenu, setOpenEditMenu] = useState(false);
    const [sentRating, setSentRating] = useState<boolean | null>(null);
    const [ratedValue, setRatedValue] = useState<number | undefined>(0);

    async function handleConfirm() {
        setLoading(true);
        try {
            const result = await sendRating(userId, firstValue, secondValue);

            if (!result?.alreadyRated) {
                setOpen(false);
                setSentRating(true);
            }
        } catch (err) {
            console.error(err);
            alert("Algo deu errado");
        } finally {
            setLoading(false);
        }
    }

    async function editRatingButton() {
        setLoadingEditMenu(true);
        try {
            const result = await editRating(userId, newValues[0], newValues[1], date);

            if (result?.success) {
                setOpenEditMenu(false);
                setRatedValue(result?.ratedValue);
            }
        } catch (e) {
            console.error(e);
            alert("Algo deu errado");
        } finally {
            setLoadingEditMenu(false);
        }
    }

    useEffect(() => {
        async function checkIfUserRated() {
            const result = await checkUserRating(userId, date);
            if (result?.ratedToday) setSentRating(true);
            else setSentRating(false);
            setRatedValue(result.ratedValue);
        }

        checkIfUserRated();
    }, [userId]);

    return (
        <>
            <div className="relative flex flex-col items-center gap-4 p-8 md:p-0 lg:-mt-12">
                {sentRating === null ? (
                    <Spinner className="size-7" />
                ) : (
                    <>
                        {!sentRating ? (
                            <RatingForm
                                {...{
                                    firstValue,
                                    handleConfirm,
                                    loading,
                                    open,
                                    secondValue,
                                    setFirstValue,
                                    setLoading,
                                    setOpen,
                                    setSecondValue,
                                }}
                            />
                        ) : (
                            <EditRatingUI
                                {...{
                                    editRatingButton,
                                    firstValue,
                                    openEditMenu,
                                    ratedValue,
                                    secondValue,
                                    setOpenEditMenu,
                                    newValues,
                                    setNewValues,
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    );
}
