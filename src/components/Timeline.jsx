import { useEffect, useRef, useState } from "react";
import "./Timeline.css";

/**
 * PLATZHALTER-DATEN. Die echten Stationen (Arbeitgeber, Zeiträume,
 * Kernaufgaben) fehlen noch. Struktur und Interaktion (horizontales
 * Gleiten, Klick zum Zentrieren/Hervorheben) sind final, nur der
 * Inhalt ist Demo-Material.
 */
const stations = [
  { employer: "Arbeitgeber folgt", period: "20XX–20XX", bullets: ["Kernaufgabe folgt", "Kernaufgabe folgt"] },
  { employer: "Arbeitgeber folgt", period: "20XX–20XX", bullets: ["Kernaufgabe folgt", "Kernaufgabe folgt"] },
  { employer: "Arbeitgeber folgt", period: "20XX–20XX", bullets: ["Kernaufgabe folgt", "Kernaufgabe folgt", "Kernaufgabe folgt"] },
  { employer: "Arbeitgeber folgt", period: "20XX–20XX", bullets: ["Kernaufgabe folgt", "Kernaufgabe folgt"] },
  { employer: "Arbeitgeber folgt", period: "20XX–heute", bullets: ["Kernaufgabe folgt", "Kernaufgabe folgt"] },
];

export default function Timeline() {
  const trackRef = useRef(null);
  const stationRefs = useRef([]);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [activeIndex, setActiveIndex] = useState(
    Math.floor((stations.length - 1) / 2)
  );

  const updateActiveFromScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    stationRefs.current.forEach((el, i) => {
      if (!el) return;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(elCenter - trackCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActiveFromScroll);
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    // Beim ersten Laden die anfangs aktive (mittlere) Station zentrieren.
    requestAnimationFrame(() => {
      stationRefs.current[activeIndex]?.scrollIntoView({
        inline: "center",
        block: "nearest",
      });
    });

    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e) => {
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: trackRef.current.scrollLeft,
      moved: false,
    };
    trackRef.current.setPointerCapture(e.pointerId);
    trackRef.current.classList.add("is-dragging");
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    e.preventDefault();
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    trackRef.current.scrollLeft = drag.current.startScroll - dx;
  };

  const onPointerUp = () => {
    drag.current.active = false;
    trackRef.current?.classList.remove("is-dragging");
  };

  const goTo = (i) => {
    if (drag.current.moved) return; // Klick direkt nach einer Ziehgeste ignorieren
    setActiveIndex(i);
    stationRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <section id="lebenslauf" className="section reveal">
      <span className="eyebrow">Werdegang</span>
      <p className="timeline__hint">Station anklicken oder entlang des Strahls ziehen →</p>
      <div
        className="timeline__track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className="timeline__line" />
        {stations.map((s, i) => (
          <button
            type="button"
            key={i}
            ref={(el) => (stationRefs.current[i] = el)}
            className={`timeline__station ${i === activeIndex ? "is-active" : ""}`}
            onClick={() => goTo(i)}
          >
            <span className="timeline__dot" aria-hidden="true" />
            <span className="timeline__period">{s.period}</span>
            <h3 className="timeline__employer">{s.employer}</h3>
            <ul className="timeline__bullets">
              {s.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </section>
  );
}
