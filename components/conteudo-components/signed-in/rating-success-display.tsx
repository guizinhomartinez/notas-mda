import { Dispatch, SetStateAction } from "react";
import RatingEditor from "@/components/ui/rating-components/rating-editor";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RatingSuccessDisplay({
    ratedValue,
    firstValue,
    secondValue,
    openEditMenu,
    newValues,
    setNewValues,
    setOpenEditMenu,
    editRatingButton,
}: {
    ratedValue: number | undefined;
    firstValue: string;
    secondValue: string;
    openEditMenu: boolean;
    newValues: string[];
    setOpenEditMenu: Dispatch<SetStateAction<boolean>>;
    setNewValues: Dispatch<SetStateAction<string[]>>;
    editRatingButton: () => void;
}) {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    const correctedDate = `${day}-${month}-${year}`;

    return (
        <>
            <p className="text-center text-4xl font-bold tracking-tight">
                Nota enviada
                <br />
            </p>
            <p>
                Sua nota hoje foi {ratedValue ?? `${firstValue}.${secondValue}`}
            </p>
            <div className="flex gap-2 *:flex-grow">
                <RatingEditor
                    {...{
                        editRatingButton,
                        newValues,
                        openEditMenu,
                        ratedValue,
                        secondValue,
                        setNewValues,
                        setOpenEditMenu,
                    }}
                    actionType="edit"
                />
                <Link
                    href={`/notas/${correctedDate}`}
                    className="flex-grow *:w-full *:flex-grow"
                >
                    <Button variant="outline">Ver outras notas</Button>
                </Link>
            </div>
        </>
    );
}
