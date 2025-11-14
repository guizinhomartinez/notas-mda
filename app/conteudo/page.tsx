import SignInPrompt from "@/components/conteudo-components/not-signed-in/sign-in";
import RatingComponent from "@/components/conteudo-components/signed-in/rating-interface";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Conteudo() {
    const { isAuthenticated, userId } = await auth();
    const date = new Date();

    return (
        <div className="from-background mx-auto flex h-dvh w-screen flex-col items-center justify-center gap-4 bg-gradient-to-b to-zinc-400/5 p-4 lg:p-0">
            {isAuthenticated ? (
                <div className="flex flex-col items-center justify-center gap-3">
                    <RatingComponent {...{ userId, date }} />
                </div>
            ) : (
                <SignInPrompt
                    fallbackRedirectUrl="/conteudo"
                    signUpFallbackRedirectUrl="/conteudo"
                />
            )}
        </div>
    );
}
