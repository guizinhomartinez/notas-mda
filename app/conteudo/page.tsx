import SignedInContent from "@/components/signed-in/signed-in-content";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Conteudo() {
    const { isAuthenticated } = await auth();

    return (
        <div className="from-background mx-auto flex h-dvh w-screen flex-col items-center justify-center gap-4 p-4 lg:p-0 bg-gradient-to-b to-zinc-400/5">
            {isAuthenticated ? (
                <div className="flex flex-col items-center justify-center gap-3">
                    <SignedInContent />
                </div>
            ) : (
                <>
                    <p className="text-center">
                        Você não está logado. Entre em uma conta ou vá embora.
                    </p>
                    <Button className="p-5" asChild>
                        <SignInButton
                            fallbackRedirectUrl="/conteudo"
                            signUpFallbackRedirectUrl="/conteudo"
                        >
                            Log-in
                        </SignInButton>
                    </Button>
                </>
            )}
        </div>
    );
}
