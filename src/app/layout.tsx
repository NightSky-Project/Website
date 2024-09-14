import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getCssText } from "../../stitches.config";

const geistSans = localFont({
    src: [
        {
            path: "./fonts/GeistVF.woff",
            weight: "100 900",
        },
    ],
    variable: "--font-geist-sans",
});
const geistMono = localFont({
    src: [
        {
            path: "./fonts/GeistMonoVF.woff",
            weight: "100 900",
        },
    ],
    variable: "--font-geist-mono",
});

export const metadata: Metadata = {
    title: "NightSky Portal",
    description: "NightSky Portal",
};

export default function RootLayout({
    children,
}: Readonly<{
        children: React.ReactNode;
    }>) {
        return (
            <html lang="pt-br">
            <head>
                <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children}
            </body>
            </html>
        );
    }
