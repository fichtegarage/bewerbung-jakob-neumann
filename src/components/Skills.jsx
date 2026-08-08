const skills = [
  "Digitale Lösungen selbst entwickeln",
  "Video- und Audioproduktion",
  "Abläufe analysieren und vereinfachen",
  "Marken- und Kommunikationsmaterial eigenständig produzieren",
  "Vermitteln zwischen unterschiedlichen Interessengruppen",
  "Menschen motivieren und durch Veränderungsprozesse begleiten",
];

export default function Skills() {
  return (
    <section id="skills" className="section reveal">
      <span className="eyebrow">Skills</span>
      <ul className="skills-list">
        {skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}
