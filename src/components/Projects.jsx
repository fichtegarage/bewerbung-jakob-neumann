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
    title: "Eigenständig gesteuerte Werbekampagne",
    status: "Aktiv gesteuert",
    description:
      "Eine selbst konzipierte und laufend gesteuerte Kampagne zur Kundengewinnung, mit einem eigens entwickelten, datensparsamen Modell zur Erfolgsmessung – bewusst statt einer Standardlösung von der Stange.",
    shows: "strategisches Denken und einen verantwortungsvollen Umgang mit Daten.",
    screenshotSrc: "/screenshots/google-ads.jpg",
    screenshotAlt: "Screenshot der Kampagnensteuerung",
  },
];

export default function Projects() {
  const [openImage, setOpenImage] = useState(null);

  return (
    <section className="section reveal">
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
