import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function SignInPrompt({
    fallbackRedirectUrl,
    signUpFallbackRedirectUrl,
}: {
    fallbackRedirectUrl: string;
    signUpFallbackRedirectUrl: string;
}) {
    return (
        <>
            <p className="text-center">
                Você não está logado. Entre em uma conta ou vá embora.
            </p>
            <Button className="p-5" asChild>
                <SignInButton
                    fallbackRedirectUrl={fallbackRedirectUrl}
                    signUpFallbackRedirectUrl={signUpFallbackRedirectUrl}
                >
                    Log-in
                </SignInButton>
            </Button>
        </>
    );
}
