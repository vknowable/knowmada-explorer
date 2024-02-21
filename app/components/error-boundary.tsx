import { Button } from "@/components/ui/button"

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
    <div className="grid place-items-center mb-12 pt-12">
      <h2 className="mb-8">{title}</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          resetHandler
        }
        className=""
      >
        Try again
      </Button>
    </div>
  )
}