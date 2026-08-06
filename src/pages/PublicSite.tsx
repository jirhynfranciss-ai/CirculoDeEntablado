import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Story from "../components/sections/Story";
import MissionVision from "../components/sections/MissionVision";
import Achievements from "../components/sections/Achievements";
import Officers from "../components/sections/Officers";
import Productions from "../components/sections/Productions";
import Events from "../components/sections/Events";
import Gallery from "../components/sections/Gallery";
import Media from "../components/sections/Media";
import Testimonials from "../components/sections/Testimonials";
import JoinUs from "../components/sections/JoinUs";
import Contact from "../components/sections/Contact";

export default function PublicSite() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Story />
        <MissionVision />
        <Achievements />
        <Officers />
        <Productions />
        <Events />
        <Gallery />
        <Media />
        <Testimonials />
        <JoinUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
