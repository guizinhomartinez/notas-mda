import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h1>Notas MDA</h1>
            <Button>
                Log in <ArrowRight />
            </Button>
        </div>
    );
}
