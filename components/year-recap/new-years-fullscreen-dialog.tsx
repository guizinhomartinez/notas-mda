import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

export default async function NewYearsFullscreenDialog() {
    return (
        <Dialog open={true}>
            <DialogContent className="h-[95dvh] !w-[95vw] !max-w-[95vw]">
                <DialogHeader>
                    <DialogTitle>Recap do ano</DialogTitle>
                    <DialogDescription>
                        Aqui você pode ver um resumo do ano passado.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex h-full w-full flex-col gap-2 lg:flex-row">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-center text-5xl font-bold tracking-tight">
                            Ebaaa fim de ano 🥳
                        </p>
                        <p className="flex-grow">
                            Bora ver qual foi a média de cada mês do ano, e como
                            foi o ano todo.
                        </p>
                    </div>

                    <div className="flex flex-grow flex-col items-center gap-2">
                        <div className="bg-card flex max-h-48 w-full max-w-96 flex-col items-center justify-center rounded-lg border">
                            <div className="flex items-center justify-between gap-2 p-2.5 *:flex-grow">
                                <p className="text-lg font-bold">Janeiro</p>
                                <p className="text-sm">Média: 25°C</p>
                            </div>
                        </div>
                        <div className="bg-card flex max-h-48 w-full max-w-96 flex-col items-center justify-center rounded-lg border">
                            <div className="flex items-center justify-between gap-2 p-2.5 *:flex-grow">
                                <p className="text-lg font-bold">Janeiro</p>
                                <p className="text-sm">Média: 25°C</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
