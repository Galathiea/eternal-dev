export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary"></div>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
  
  