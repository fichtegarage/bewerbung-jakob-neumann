import StatusDot from "./StatusDot.jsx";

export default function ProjectCard({
  title,
  status,
  description,
  shows,
  screenshotSrc,
  screenshotAlt,
  onOpenScreenshot,
}) {
  return (
    <article className="project">
      <StatusDot label={status} />
      <h3 className="project__title">{title}</h3>
      <p>{description}</p>
      <p className="project__shows">
        <strong>Zeigt:</strong> {shows}
      </p>
      <button
        type="button"
        className="project__thumb"
        onClick={() => onOpenScreenshot(screenshotSrc, screenshotAlt)}
      >
        <img src={screenshotSrc} alt="" />
        <span className="project__thumb-label">Screenshot ansehen</span>
      </button>
    </article>
  );
}
