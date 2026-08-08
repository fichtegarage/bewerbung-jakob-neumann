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
  const railRef = useRef(null);
  const lineRef = useRef(null);
  const stationRefs = useRef([]);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false, pointerId: null });
  const [activeIndex, setActiveIndex] = useState(
    Math.floor((stations.length - 1) / 2)
  );

  // Breite der Linie wird direkt gemessen (letzte Station), statt sie
  // über CSS-Schlüsselwörter wie max-content berechnen zu lassen -
  // das ist zwischen Browser-Engines nicht immer einheitlich.
  const measureLine = () => {
    const last = stationRefs.current[stations.length - 1];
    if (!last || !lineRef.current) return;
    const width = last.offsetLeft + last.offsetWidth;
    lineRef.current.style.width = `${width}px`;
  };

  // Zentriert eine Station manuell über scrollLeft-Berechnung statt
  // über scrollIntoView - dessen inline:'center'-Option wird nicht in
  // jedem Browser identisch unterstützt.
  const centerStation = (i, behavior) => {
    const track = trackRef.current;
    const el = stationRefs.current[i];
    if (!track || !el) return;
    const elRect = el.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const delta = elRect.left + elRect.width / 2 - (trackRect.left + trackRect.width / 2);
    track.scrollTo({ left: track.scrollLeft + delta, behavior });
  };

  const updateActiveFromScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    let closest = 0;
    let closestDist = Infinity;
    stationRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const elCenter = r.left + r.width / 2;
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

    measureLine();
    centerStation(activeIndex, "auto");

    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActiveFromScroll);
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => measureLine();
    window.addEventListener("resize", onResize);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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
      pointerId: e.pointerId,
    };
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;

    if (!drag.current.moved && Math.abs(dx) > 4) {
      drag.current.moved = true;
      trackRef.current.setPointerCapture(drag.current.pointerId);
      trackRef.current.classList.add("is-dragging");
    }

    if (drag.current.moved) {
      e.preventDefault();
      trackRef.current.scrollLeft = drag.current.startScroll - dx;
    }
  };

  const endDrag = () => {
    if (drag.current.moved && trackRef.current) {
      trackRef.current.classList.remove("is-dragging");
      try {
        trackRef.current.releasePointerCapture(drag.current.pointerId);
      } catch {
        /* pointer was already released */
      }
    }
    drag.current.active = false;
  };

  const goTo = (i) => {
    if (drag.current.moved) return; // Klick direkt nach einer Ziehgeste ignorieren
    setActiveIndex(i);
    centerStation(i, "smooth");
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
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div className="timeline__rail" ref={railRef}>
          <div className="timeline__line" ref={lineRef} />
          {stations.map((s, i) => (
            <button
              type="button"
              key={i}
              ref={(el) => (stationRefs.current[i] = el)}
              className={`timeline__station ${i === activeIndex ? "is-active" : ""}`}
              onClick={() => goTo(i)}
            >
              <span className="timeline__dot" aria-hidden="true" />
              <div className="timeline__content">
                <span className="timeline__period">{s.period}</span>
                <h3 className="timeline__employer">{s.employer}</h3>
                <ul className="timeline__bullets">
                  {s.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
