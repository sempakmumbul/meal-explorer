export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      
      <div className="flex flex-col items-center gap-4">

        {/* SPINNER */}
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-orange-500" />

        {/* TEXT */}
        <p className="text-sm text-slate-500">
          Loading...
        </p>

      </div>

    </div>
  );
}