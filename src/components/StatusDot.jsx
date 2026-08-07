import "./StatusDot.css";

/**
 * Kleines Status-Signal, das bei jedem Projekt und im "Über diese
 * Seite"-Abschnitt wiederkehrt: zeigt, dass etwas tatsächlich läuft,
 * statt nur behauptet zu werden.
 *
 * Bewusst als eigene, isolierte Komponente gebaut: falls später eine
 * Lottie-Animation den CSS-Puls ersetzen soll, wird nur diese Datei
 * ausgetauscht – der Rest der Seite bleibt unberührt.
 */
export default function StatusDot({ label }) {
  return (
    <span className="status-dot">
      <span className="status-dot__pulse" aria-hidden="true" />
      <span className="status-dot__label">{label}</span>
    </span>
  );
}
