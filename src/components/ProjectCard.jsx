import StatusDot from "./StatusDot.jsx";

export default function ProjectCard({ title, status, description, shows, media, onOpenMedia }) {
  const thumbSrc = media.type === "flipbook" ? media.thumbnailSrc : media.images[0];

  return (
    <article className="project">
      <StatusDot label={status} />
      <h3 className="project__title">{title}</h3>
      <p>{description}</p>
      <p className="project__shows">
        <strong>Zeigt:</strong> {shows}
      </p>
      <button type="button" className="project__thumb" onClick={onOpenMedia}>
        <img src={thumbSrc} alt="" />
        <span className="project__thumb-label">{media.label}</span>
      </button>
    </article>
  );
}
