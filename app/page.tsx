export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4">
      <main className="flex flex-col items-center w-full max-w-md gap-6 py-16">
        <div className="w-24 h-24 rounded-full bg-sky-400/20 flex items-center justify-center text-sky-400 text-3xl font-bold">
          LC
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-50">
          LinkTree Cavalcante
        </h1>
        <p className="text-sm text-slate-400 text-center max-w-xs">
          [PLACEHOLDER: bio/headline]
        </p>
        <div className="w-full flex flex-col gap-3 mt-4">
          <div className="h-12 rounded-lg bg-slate-800 animate-pulse" />
          <div className="h-12 rounded-lg bg-slate-800 animate-pulse" />
          <div className="h-12 rounded-lg bg-slate-800 animate-pulse" />
        </div>
      </main>
    </div>
  );
}
