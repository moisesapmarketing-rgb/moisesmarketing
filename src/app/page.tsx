import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import VideoHub from "@/components/VideoHub";
import Automations from "@/components/Automations";
import Results from "@/components/Results";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Manifesto />
      <Services />
      <VideoHub />
      <Automations />
      <Results />
      <Contact />
      <Footer />
    </main>
  );
}
