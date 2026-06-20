import { SignalJourney } from "./components/signal-journey";
import { Marquee } from "./components/marquee";
import { Manifesto } from "./components/manifesto";
import { Work } from "./components/work";
import { Stats } from "./components/stats";
import { Process } from "./components/process";
import { Contact } from "./components/contact";

export default function Home() {
  return (
    <main>
      {/* Immersive WebGL signal journey — the showpiece hero */}
      <SignalJourney />

      {/* Real, indexable content below the journey */}
      <Marquee />
      <Manifesto />
      <Work />
      <Stats />
      <Process />
      <Contact />
    </main>
  );
}
