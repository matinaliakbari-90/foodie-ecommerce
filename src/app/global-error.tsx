'use client' // Error boundaries must be Client Components

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        // global-error must include html and body tags
        <html>
            <body>
                <h2>{error.message}</h2>
                <button onClick={() => reset()}>تلاش مجدد</button>
            </body>
        </html>
    )
}