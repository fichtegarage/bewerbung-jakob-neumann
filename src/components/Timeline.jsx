import { useRef } from "react";
import "./Timeline.css";

/**
 * PLATZHALTER-DATEN. Die echten Stationen (Arbeitgeber, Zeiträume,
 * Kernaufgaben) fehlen noch – siehe Rückfrage im Chat. Struktur und
 * Interaktion (horizontales Gleiten am Zeitstrahl) sind final, nur
 * der Inhalt ist Demo-Material.
 */
const stations = [
  {
    employer: "Arbeitgeber folgt",
    period: "20XX–20XX",
    bullets: ["Kernaufgabe folgt", "Kernaufgabe folgt"],
  },
  {
    employer: "Arbeitgeber folgt",
    period: "20XX–20XX",
    bullets: ["Kernaufgabe folgt", "Kernaufgabe folgt", "Kernaufgabe folgt"],
  },
  {
    employer: "Arbeitgeber folgt",
    period: "20XX–heute",
    bullets: ["Kernaufgabe folgt", "Kernaufgabe folgt"],
  },
];

export default function Timeline() {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const onPointerDown = (e) => {
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: trackRef.current.scrollLeft,
    };
    trackRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    trackRef.current.scrollLeft = drag.current.startScroll - dx;
  };

  const onPointerUp = () => {
    drag.current.active = false;
  };

  return (
    <section id="lebenslauf" className="section reveal">
      <span className="eyebrow">Werdegang</span>
      <p className="timeline__hint">Zum Entlanggleiten ziehen oder scrollen →</p>
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
          <div className="timeline__station" key={i}>
            <span className="timeline__dot" aria-hidden="true" />
            <span className="timeline__period">{s.period}</span>
            <h3 className="timeline__employer">{s.employer}</h3>
            <ul className="timeline__bullets">
              {s.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
