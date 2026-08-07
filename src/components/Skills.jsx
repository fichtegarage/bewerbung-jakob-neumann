const skills = [
  "Digitale Lösungen selbst entwickeln",
  "Abläufe analysieren und vereinfachen",
  "Kampagnen und Kundengewinnung steuern",
  "Vermitteln zwischen unterschiedlichen Interessengruppen",
];

export default function Skills() {
  return (
    <section className="section reveal">
      <span className="eyebrow">Skills</span>
      <ul className="skills-list">
        {skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}
