'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
        <button
                onClick={
                  // Reload the page
                  () => window.location.reload()
                }
                className="bg-transparent shadow-[inset_0_0_0_2px] shadow-white w-fit text-white font-semibold rounded px-4 py-2 hover:bg-white/10 focus-within:bg-white/20 transition"
              >
                Reload the page
              </button>
      </body>
    </html>
  )
}