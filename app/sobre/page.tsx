import ExplanationPages from "@/components/explanation-pages";
import { Separator } from "@/components/ui/separator";

export default function Sobre() {
    return (
        <ExplanationPages>
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-center text-5xl font-bold md:text-7xl mb-4">
                    O que é o MDA?
                </h1>
            </div>
            <Separator />
        </ExplanationPages>
    );
}
