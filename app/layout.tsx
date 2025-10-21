import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Notas MDA",
    description: "Notas do MDA",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                elements: {
                    footer: "hidden",
                },
                theme: shadcn,
            }}
        >
            <html lang="en" suppressHydrationWarning>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <NextTopLoader
                            color="#c48bd1"
                            initialPosition={0.08}
                            crawlSpeed={200}
                            height={3}
                            crawl={true}
                            showSpinner={true}
                            easing="ease"
                            speed={200}
                            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                            template='<div class="bar" role="bar"><div class="peg"></div></div>'
                            zIndex={1600}
                            showAtBottom={false}
                        />
                        <Navbar />
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
