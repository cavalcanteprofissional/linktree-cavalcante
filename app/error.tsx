"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4 text-center">
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Algo deu errado
      </h1>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Ocorreu um erro inesperado. Tente novamente.
      </p>
      <button
        onClick={reset}
        className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all"
      >
        Tentar novamente
      </button>
    </div>
  );
}
