import ProfileHeader from "@/components/ProfileHeader";
import LinkButton from "@/components/LinkButton";
import InstagramFeed from "@/components/InstagramFeed";
import { links } from "@/config/links.config";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-dvh px-4">
      <main className="flex flex-col items-center w-full max-w-md gap-6 py-16">
        <ProfileHeader
          name="Lucas Cavalcante"
          bio="Analista de Dados | IA &amp; Machine Learning | Visão Computacional"
          avatar="/images/foto-perfil.webp"
        />
        <div className="w-full flex flex-col gap-3">
          {links.map((link) => (
            <LinkButton
              key={link.label}
              label={link.label}
              url={link.url}
              icon={link.icon}
            />
          ))}
        </div>
        <InstagramFeed />
        <a
          href="/dashboard"
          className="text-xs text-muted-foreground hover:text-primary transition-colors mt-2"
        >
          📊 Analytics
        </a>
      </main>
    </div>
  );
}
