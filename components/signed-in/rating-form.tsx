import type { WheelPickerOption } from "@/components/wheel-picker";
import { WheelPicker, WheelPickerWrapper } from "@/components/wheel-picker";
import { Dot } from "lucide-react";
import { Button } from "../ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Spinner } from "../ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer";
import { Dispatch, SetStateAction } from "react";

export const createArray = (length: number, add = 0): WheelPickerOption[] =>
    Array.from({ length }, (_, i) => {
        const value = i + add;
        return {
            label: value.toString().padStart(2, "0"),
            value: value.toString(),
        };
    });

const number = createArray(11);
const number2 = createArray(10);

export default function RatingForm({
    firstValue,
    secondValue,
    open,
    loading,
    handleConfirm,
    setFirstValue,
    setSecondValue,
    setOpen,
    setLoading
}: {
    firstValue: string;
    secondValue: string;
    open: boolean;
    loading: boolean;
    setFirstValue: Dispatch<SetStateAction<string>>;
    setSecondValue: Dispatch<SetStateAction<string>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    handleConfirm: () => void
}) {

    const isMobile = useIsMobile();
    return (
        <>
            <p className="text-center text-4xl font-bold tracking-tight md:text-5xl lg:mb-12">
                Coloque sua nota
            </p>

            <div className="flex w-full items-center justify-center">
                <WheelPickerWrapper>
                    <WheelPicker
                        options={number}
                        defaultValue="0"
                        value={firstValue}
                        onValueChange={(e) => setFirstValue(e)}
                        infinite
                    />
                </WheelPickerWrapper>
                {Number(firstValue) < 10 && (
                    <>
                        <div>
                            <Dot />
                        </div>
                        <WheelPickerWrapper>
                            <WheelPicker
                                options={number2}
                                value={secondValue}
                                onValueChange={(e) => setSecondValue(e)}
                                defaultValue="0"
                                infinite
                            />
                        </WheelPickerWrapper>
                    </>
                )}
            </div>
            <div className="text-primary/50 -mt-2 text-center text-lg font-bold">
                {firstValue}
                {Number(firstValue) < 10 && `.${secondValue}`}
            </div>
            {isMobile ? (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        <Button className="w-48">Confirmar</Button>
                    </DrawerTrigger>
                    <DrawerContent className="!rounded-t-xl">
                        <DrawerHeader>
                            <DrawerTitle className="text-2xl font-bold tracking-tight">
                                Tem certeza?
                            </DrawerTitle>
                            <DrawerDescription>
                                Tem certeza que sua nota do dia é de{" "}
                                {firstValue}.{secondValue}
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="flex flex-col gap-2 *:flex-1">
                            <Button
                                className="rounded-full p-3"
                                onClick={handleConfirm}
                                disabled={loading}
                            >
                                <Spinner
                                    style={{
                                        display: loading ? "initial" : "none",
                                    }}
                                />
                                {loading ? "Enviando..." : "Continuar"}
                            </Button>
                            <DrawerClose asChild>
                                <Button
                                    className="p-3"
                                    variant="outline"
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            ) : (
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <Button className="w-full">Confirmar</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tem certeza que sua nota do dia é de{" "}
                                {firstValue}.{secondValue}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="*:flex-1">
                            <AlertDialogCancel disabled={loading}>
                                Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    onClick={handleConfirm}
                                    disabled={loading}
                                >
                                    <Spinner
                                        style={{
                                            display: loading
                                                ? "initial"
                                                : "none",
                                        }}
                                    />
                                    {loading ? "Enviando..." : "Continuar"}
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}
