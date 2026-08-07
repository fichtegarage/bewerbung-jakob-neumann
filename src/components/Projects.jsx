import { useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import ScreenshotModal from "./ScreenshotModal.jsx";
import "./Projects.css";

const projects = [
  {
    title: "Digitale Plattform für die Organisation eines Trainingsgeschäfts",
    status: "Live seit März 2026",
    description:
      "Eine selbst entwickelte Online-Lösung, über die Kundinnen und Kunden Termine buchen, Verträge und Unterlagen automatisch erstellt und sicher abgelegt werden – ohne manuellen Aufwand im Hintergrund.",
    shows:
      "die Fähigkeit, einen komplexen Ablauf zu durchdringen und eigenständig in eine funktionierende digitale Lösung zu übersetzen.",
    screenshotSrc: "/screenshots/coach-compass.jpg",
    screenshotAlt: "Screenshot der Buchungsplattform",
  },
  {
    title: "Automatisierte Abrechnung",
    status: "Automatisiert",
    description:
      "Ein Werkzeug, das eine vorher aufwändige, fehleranfällige manuelle Abrechnung zwischen zwei Trainern automatisiert. Was früher mehrere Stunden dauerte, läuft heute in wenigen Minuten – zuverlässig und nachvollziehbar.",
    shows:
      "die Fähigkeit, bestehende Abläufe zu hinterfragen und praxistauglich zu vereinfachen.",
    screenshotSrc: "/screenshots/trainer-abrechnung.jpg",
    screenshotAlt: "Screenshot des Abrechnungswerkzeugs",
  },
  {
    title: "Print-Broschüre nach eigenem Markenkonzept",
    status: "Realisiert",
    description:
      "Eine Broschüre, komplett nach einem selbst entwickelten Markenkonzept gestaltet und gesetzt – ohne Agentur, ohne Layouter. Einzige externe Beteiligung war die Druckerei für die Produktion.",
    shows:
      "die Fähigkeit, ein Vorhaben von der Konzeption bis zum fertigen, professionellen Ergebnis eigenständig durchzuziehen.",
    screenshotSrc: "/screenshots/broschuere.jpg",
    screenshotAlt: "Foto der gedruckten Broschüre",
  },
];

export default function Projects() {
  const [openImage, setOpenImage] = useState(null);

  return (
    <section id="projekte" className="section reveal">
      <span className="eyebrow">Projekte</span>
      <div className="project-list">
        {projects.map((p) => (
          <ProjectCard
            key={p.title}
            {...p}
            onOpenScreenshot={(src, alt) => setOpenImage({ src, alt })}
          />
        ))}
      </div>
      {openImage && (
        <ScreenshotModal
          src={openImage.src}
          alt={openImage.alt}
          onClose={() => setOpenImage(null)}
        />
      )}
    </section>
  );
}
