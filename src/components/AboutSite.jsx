import StatusDot from "./StatusDot.jsx";

// TODO: [XX] durch die reale Stundenzahl ersetzen, kurz vor Go-Live.
const HOURS_BUILT = "4";

export default function AboutSite() {
  return (
    <section id="ueber-diese-seite" className="section reveal">
      <span className="eyebrow">Über diese Seite</span>
      <StatusDot label={`Built in ${HOURS_BUILT}h`} />
      <p className="about-site__text">
        Diese Website wurde in <strong>{HOURS_BUILT} Stunden</strong>{" "}
        entwickelt – von der ersten Idee bis zur Veröffentlichung. Keine
        Agentur, kein Entwickler-Team, kein Baukasten. Einfach nur mit den
        Tools, die uns allen im Jahr 2026 zur Verfügung stehen.
      </p>
    </section>
  );
}
