export const ErrorBoundary = ({
  title = 'Something went wrong!',
  error,
  reset,
}: {
  title?: string
  error: Error & { digest?: string }
  reset: () => void
}) => {
  const resetHandler = () => {
    console.log('Attempting to recover from error')
    reset()
  }

  return (
    <div>
      <h2 className="mb-8">{title}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          resetHandler
        }
        className="bg-zinc-50 w-fit text-black font-semibold rounded px-4 py-2 hover:bg-zinc-100 focus-within:bg-zinc-300 transition"
      >
        Try again
      </button>
    </div>
  )
}