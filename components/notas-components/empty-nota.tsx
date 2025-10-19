"use client";

import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import RatingPopup from "@/components/signed-in/rating-popup";
import { CircleDashed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { editRating } from "@/functions/handle-rating-submit";

export default function EmptyNota({
    username,
    userId,
    editRatingButton,
    newValues,
    setNewValues,
    openEditMenu,
    setOpenEditMenu,
}: {
    username: string | null;
    userId: string | null;
    editRatingButton: () => void;
    newValues: string[];
    setNewValues: Dispatch<SetStateAction<string[]>>;
    openEditMenu: boolean;
    setOpenEditMenu: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <Empty className="h-fit lg:border lg:border-dashed !p-0 !py-4">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <CircleDashed />
                </EmptyMedia>
                <EmptyTitle>
                    {username}, você não adicionou a nota esse dia.
                </EmptyTitle>
                <EmptyDescription>Adicione ou vá embora.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <RatingPopup
                    {...{
                        editRatingButton,
                        newValues,
                        openEditMenu,
                        setNewValues,
                        setOpenEditMenu,
                    }}
                    actionType="add"
                >
                    <Button size="sm">Adicionar nota</Button>
                </RatingPopup>
            </EmptyContent>
        </Empty>
    );
}
