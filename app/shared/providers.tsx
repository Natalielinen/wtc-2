'use client';

import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from "./theme-provider";
import { Suspense } from "react";
export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {

    return (
        <Suspense>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
            <Toaster />
            <NextTopLoader />

        </Suspense>
    )
};
