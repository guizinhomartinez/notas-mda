import type { WheelPickerOption } from "@/components/wheel-picker";
import { WheelPicker, WheelPickerWrapper } from "@/components/wheel-picker";
import { Dot } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "motion/react";

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
    setLoading,
}: {
    firstValue: string;
    secondValue: string;
    open: boolean;
    loading: boolean;
    setFirstValue: Dispatch<SetStateAction<string>>;
    setSecondValue: Dispatch<SetStateAction<string>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    handleConfirm: () => void;
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
            <Button
                className="relative overflow-hidden p-3 px-4 w-24"
                onClick={handleConfirm}
                disabled={loading}
            >
                <AnimatePresence initial={false} mode="wait">
                    {loading ? (
                        <motion.div
                            key="spinner"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            exit={{ y: -20 }}
                            transition={{ duration: 0.1, ease: "easeIn" }}
                        >
                            <Spinner
                                style={{
                                    display: loading ? "initial" : "none",
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
                            Enviar
                        </motion.span>
                    )}
                </AnimatePresence>
            </Button>
        </>
    );
}
