import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function SignInPrompt() {
    return (
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
    );
}
