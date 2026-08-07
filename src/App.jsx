import Hero from "./components/Hero.jsx";
import Bridge from "./components/Bridge.jsx";
import Timeline from "./components/Timeline.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import AboutSite from "./components/AboutSite.jsx";
import Contact from "./components/Contact.jsx";
import DotNav from "./components/DotNav.jsx";

export default function App() {
  return (
    <>
      <DotNav />
      <main>
        <Hero />
        <Bridge />
        <Timeline />
        <Projects />
        <Skills />
        <AboutSite />
        <Contact />
      </main>
    </>
  );
}
