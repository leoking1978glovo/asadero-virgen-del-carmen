import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Dishes } from "@/components/site/Dishes";
import { MenuPreview } from "@/components/site/MenuPreview";
import { Story } from "@/components/site/Story";
import { VideoSection } from "@/components/site/VideoSection";
import { Reservation } from "@/components/site/Reservation";
import { MapSection } from "@/components/site/MapSection";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <div className="bg-cream">
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Dishes />
        <MenuPreview />
        <Story />
        <VideoSection />
        <Reservation />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
