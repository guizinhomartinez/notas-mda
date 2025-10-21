import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { WheelPicker, WheelPickerWrapper } from "../wheel-picker";
import { Dot } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { createArray } from "@/components/signed-in/rating-form";
import { useIsMobile } from "@/hooks/use-mobile";
import { Spinner } from "@/components/ui/spinner";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

const number = createArray(11);
const number2 = createArray(10);

export default function RatingPopup({
    openEditMenu,
    newValues,
    setNewValues,
    setOpenEditMenu,
    editRatingButton,
    children,
    actionType,
    isUpdating,
}: {
    openEditMenu: boolean;
    newValues: string[];
    setOpenEditMenu: Dispatch<SetStateAction<boolean>>;
    setNewValues: Dispatch<SetStateAction<string[]>>;
    editRatingButton: () => void;
    children?: ReactNode;
    actionType: "edit" | "add";
    isUpdating?: boolean;
}) {
    const isMobile = useIsMobile();

    const Content = () => {
        return (
            <div className="mt-2 flex flex-col items-center justify-center gap-2 px-7 md:p-0">
                <div className="flex w-full items-center justify-center">
                    <WheelPickerWrapper>
                        <WheelPicker
                            options={number}
                            defaultValue="0"
                            value={newValues[0]}
                            onValueChange={(e) =>
                                setNewValues((prev) => [e, prev[1]])
                            }
                            infinite
                        />
                    </WheelPickerWrapper>
                    {Number(newValues[0]) < 10 && (
                        <>
                            <div>
                                <Dot />
                            </div>
                            <WheelPickerWrapper>
                                <WheelPicker
                                    options={number2}
                                    value={newValues[1]}
                                    onValueChange={(e) =>
                                        setNewValues((prev) => [prev[0], e])
                                    }
                                    defaultValue="0"
                                    infinite
                                />
                            </WheelPickerWrapper>
                        </>
                    )}
                </div>
                <div className="text-primary/50 text-center text-lg font-bold">
                    {newValues[0]}
                    {Number(newValues[0]) < 10 && `.${newValues[1]}`}
                </div>
            </div>
        );
    };

    const Confirmar = () => {
        return (
            <Button
                className={cn("w-full", isMobile && "p-3")}
                onClick={editRatingButton}
                disabled={isUpdating}
            >
                <AnimatePresence initial={false} mode="wait">
                    {isUpdating ? (
                        <motion.div
                            key="spinner"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            exit={{ y: -20 }}
                            transition={{ duration: 0.1, ease: "easeIn" }}
                        >
                            <Spinner
                                style={{
                                    display: isUpdating ? "initial" : "none",
                                }}
                            />
                        </motion.div>
                    ) : (
                        <motion.span
                            key="text"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            exit={{ y: -20 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                        >
                            Confirmar
                        </motion.span>
                    )}
                </AnimatePresence>
            </Button>
        );
    };

    if (isMobile) {
        return (
            <Drawer open={openEditMenu} onOpenChange={setOpenEditMenu}>
                <DrawerTrigger asChild>
                    {children ? children : <Button>Editar nota</Button>}
                </DrawerTrigger>
                <DrawerContent className="!rounded-t-xl">
                    <DrawerHeader>
                        <DrawerTitle className="text-center text-2xl font-bold tracking-tight">
                            {actionType === "add" ? "Adicionar" : "Editar"} nota
                        </DrawerTitle>
                        <DrawerDescription
                            className={cn(actionType === "edit" && "hidden")}
                        >
                            Coloque a {actionType === "add" && "nova"} nota
                        </DrawerDescription>
                    </DrawerHeader>
                    <Content />
                    <DrawerFooter className="mb-4">
                        <Confirmar />
                        <DrawerClose className="w-full">
                            <Button variant="outline" className="w-full p-3">
                                Cancelar
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={openEditMenu} onOpenChange={setOpenEditMenu}>
            <DialogTrigger asChild>
                {children ? children : <Button>Editar nota</Button>}
            </DialogTrigger>
            <DialogContent className="max-h-[98vh] rounded-xl">
                <DialogHeader className="-mt-2">
                    <DialogTitle className="text-center text-3xl font-bold tracking-tight">
                        {actionType === "add" ? "Adicionar" : "Editar"} nota
                    </DialogTitle>
                    <DialogDescription
                        className={cn(
                            "text-primary/80 -mt-2 text-center",
                            actionType === "edit" && "hidden",
                        )}
                    >
                        Coloque a {actionType === "add" && "nova"} nota
                    </DialogDescription>
                </DialogHeader>
                <Content />
                <DialogFooter>
                    <Confirmar />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
