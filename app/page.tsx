import ProfileHeader from "@/components/ProfileHeader";
import SocialIcons from "@/components/SocialIcons";
import InstagramFeed from "@/components/InstagramFeed";
import LocationCard from "@/components/LocationCard";
import ProjectLinks from "@/components/ProjectLinks";
import PoolEffect from "@/components/PoolEffect";
import MouseInteraction from "@/components/MouseInteraction";
import AnimatedSection from "@/components/dashboard/AnimatedSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-dvh px-4">
      <PoolEffect />
      <MouseInteraction>
        <main className="flex flex-col items-center w-full max-w-md gap-6 py-16 relative z-10">
          <AnimatedSection delay={100} className="w-full">
            <ProfileHeader
              name="Lucas Cavalcante"
              bio="Analista de Dados | IA &amp; Machine Learning | Visão Computacional"
              avatar="/images/foto-perfil.webp"
            />
          </AnimatedSection>
          <AnimatedSection delay={200} className="w-full">
            <ProjectLinks />
          </AnimatedSection>
          <AnimatedSection delay={300} className="w-full">
            <InstagramFeed />
          </AnimatedSection>
          <AnimatedSection delay={400} className="w-full">
            <LocationCard />
          </AnimatedSection>
          <AnimatedSection delay={500} className="w-full">
            <SocialIcons />
          </AnimatedSection>
        </main>
      </MouseInteraction>
    </div>
  );
}
