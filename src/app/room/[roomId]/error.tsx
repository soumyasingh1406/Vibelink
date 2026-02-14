'use client';

import { useEffect } from 'react';
import { NeonButton } from "@/components/ui/NeonButton";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong!</h2>
            <p className="text-gray-400 mb-6 max-w-md text-center bg-white/5 p-4 rounded-lg font-mono text-sm">
                {error.message || "Unknown error occurred"}
            </p>
            <div className="flex gap-4">
                <NeonButton
                    onClick={() => reset()}
                    variant="primary"
                    glowColor="cyan"
                >
                    Try again
                </NeonButton>
                <NeonButton
                    onClick={() => window.location.href = '/'}
                    variant="secondary"
                >
                    Go Home
                </NeonButton>
            </div>
        </div>
    );
}
