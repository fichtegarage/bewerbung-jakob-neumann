import { useEffect, useRef, useState } from "react";
import "./DotNav.css";

const items = [
  { id: "start", label: "Start" },
  { id: "hintergrund", label: "Hintergrund" },
  { id: "lebenslauf", label: "Werdegang" },
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

    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { threshold: 0.4 }
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
