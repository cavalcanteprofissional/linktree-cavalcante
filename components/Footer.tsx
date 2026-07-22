import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full mt-12 pt-8 pb-6 border-t border-white/5">
      <div className="max-w-md mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} Lucas Cavalcante.
          <br className="hidden sm:block" />
          Todos os direitos reservados.
        </p>
        <a
          href="https://github.com/cavalcanteprofissional"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span>Produzido por</span>
          <Image
            src="/images/assinatura-lucas.png"
            alt="Lucas Cavalcante"
            width={103}
            height={80}
            className="h-7 w-auto opacity-70 group-hover:opacity-100 transition-opacity"
          />
        </a>
      </div>
    </footer>
  );
}
