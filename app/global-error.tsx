'use client'

import { Button } from "@/components/ui/button"
 
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
        <div className="grid place-items-center mb-12 pt-12">
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
        <Button
                onClick={
                  // Reload the page
                  () => window.location.reload()
                }
                className="bg-transparent shadow-[inset_0_0_0_2px] shadow-white w-fit text-white font-semibold rounded px-4 py-2 hover:bg-white/10 focus-within:bg-white/20 transition"
              >
                Reload the page
              </Button>
        </div>
      </body>
    </html>
  )
}