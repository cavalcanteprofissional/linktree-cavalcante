import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4 text-center">
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Página não encontrada
      </h1>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        O link que você acessou não existe ou foi removido.
      </p>
      <Link
        href="/"
        className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all inline-flex items-center"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
