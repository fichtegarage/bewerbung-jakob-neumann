import { useEffect, useRef, useState } from "react";
import "./DotNav.css";

const items = [
  { id: "start", label: "Start" },
  { id: "lebenslauf", label: "Werdegang" },
  { id: "hintergrund", label: "Hintergrund" },
  { id: "projekte", label: "Projekte" },
  { id: "skills", label: "Skills" },
  { id: "ueber-diese-seite", label: "Über diese Seite" },
  { id: "kontakt", label: "Kontakt" },
];

export default function DotNav() {
  const [activeId, setActiveId] = useState("start");
  const observer = useRef(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean);

    // Wir merken uns den Sichtbarkeits-Anteil JEDES Abschnitts fortlaufend,
    // statt nur auf den aktuellen Callback-Batch zu reagieren – sonst kann
    // bei ungünstigem Timing ein Abschnitt aktiv werden, der zufällig der
    // einzige im gerade eintreffenden Batch ist, statt der tatsächlich
    // sichtbarste zu sein.
    const ratios = new Map(items.map((i) => [i.id, 0]));

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });

        let bestId = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId) setActiveId(bestId);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    sections.forEach((s) => observer.current.observe(s));
    return () => observer.current?.disconnect();
  }, []);

  return (
    <nav className="dot-nav" aria-label="Seitennavigation">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`dot-nav__dot ${activeId === item.id ? "is-active" : ""}`}
          aria-label={item.label}
          aria-current={activeId === item.id}
          onClick={() =>
            document
              .getElementById(item.id)
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="dot-nav__tooltip">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
