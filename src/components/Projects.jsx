import { useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import GalleryModal from "./GalleryModal.jsx";
import BrochureModal from "./BrochureModal.jsx";
import "./Projects.css";

const projects = [
  {
    title: "Digitale Plattform für die Organisation eines Trainingsgeschäfts",
    status: "Live seit März 2026",
    description:
      "Eine selbst entwickelte Online-Lösung, über die Kundinnen und Kunden Termine buchen, Verträge und Unterlagen automatisch erstellt und sicher abgelegt werden – ohne manuellen Aufwand im Hintergrund.",
    shows:
      "die Fähigkeit, einen komplexen Ablauf zu durchdringen und eigenständig in eine funktionierende digitale Lösung zu übersetzen.",
    media: {
      type: "gallery",
      images: [
        "/screenshots/coach-compass-1.jpg",
        "/screenshots/coach-compass-2.jpg",
        "/screenshots/coach-compass-3.jpg",
        "/screenshots/coach-compass-4.jpg",
      ],
      alt: "Screenshot der Buchungsplattform",
      label: "4 Screenshots ansehen",
    },
  },
  {
    title: "Automatisierte Abrechnung",
    status: "Automatisiert",
    description:
      "Ein Werkzeug, das eine vorher aufwändige, fehleranfällige manuelle Abrechnung zwischen zwei Trainern automatisiert. Was früher mehrere Stunden dauerte, läuft heute in wenigen Minuten – zuverlässig und nachvollziehbar.",
    shows:
      "die Fähigkeit, bestehende Abläufe zu hinterfragen und praxistauglich zu vereinfachen.",
    media: {
      type: "gallery",
      images: [
        "/screenshots/trainer-abrechnung-1.jpg",
        "/screenshots/trainer-abrechnung-2.jpg",
        "/screenshots/trainer-abrechnung-3.jpg",
        "/screenshots/trainer-abrechnung-4.jpg",
      ],
      alt: "Screenshot des Abrechnungswerkzeugs",
      label: "4 Screenshots ansehen",
    },
  },
  {
    title: "Print-Broschüre nach eigenem Markenkonzept",
    status: "Realisiert",
    description:
      "Eine Broschüre, komplett nach einem selbst entwickelten Markenkonzept gestaltet und gesetzt – ohne Agentur, ohne Layouter. Einzige externe Beteiligung war die Druckerei für die Produktion.",
    shows:
      "die Fähigkeit, ein Vorhaben von der Konzeption bis zum fertigen, professionellen Ergebnis eigenständig durchzuziehen.",
    media: {
      type: "flipbook",
      thumbnailSrc: "/broschuere/page-1.jpg",
      label: "Broschüre durchblättern",
    },
  },
];

export default function Projects() {
  const [modal, setModal] = useState(null);

  const openMedia = (media) => {
    if (media.type === "flipbook") {
      setModal({ type: "flipbook" });
    } else {
      setModal({ type: "gallery", images: media.images, alt: media.alt });
    }
  };

  return (
    <section id="projekte" className="section reveal">
      <span className="eyebrow">Projekte</span>
      <div className="project-list">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} onOpenMedia={() => openMedia(p.media)} />
        ))}
      </div>
      {modal?.type === "gallery" && (
        <GalleryModal
          images={modal.images}
          alt={modal.alt}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "flipbook" && (
        <BrochureModal onClose={() => setModal(null)} />
      )}
    </section>
  );
}
