import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./GalleryModal.css";

/**
 * Zeigt ein oder mehrere Bilder im Lightbox-Modal. Bei mehr als einem
 * Bild erscheinen Pfeile und ein Zähler. Ersetzt das frühere
 * einzelbild-only ScreenshotModal.
 */
export default function GalleryModal({ images, initialIndex = 0, alt, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const hasMultiple = images.length > 1;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (hasMultiple && e.key === "ArrowRight") next();
      if (hasMultiple && e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, hasMultiple]);

  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="modal-close" onClick={onClose} aria-label="Schließen">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M5 5L19 19M19 5L5 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {hasMultiple && (
        <button
          className="modal-nav modal-nav--prev"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Vorheriges Bild"
        >
          ‹
        </button>
      )}

      <img
        src={images[index]}
        alt={hasMultiple ? `${alt} (${index + 1}/${images.length})` : alt}
        className="modal-image"
        onClick={(e) => e.stopPropagation()}
      />

      {hasMultiple && (
        <button
          className="modal-nav modal-nav--next"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Nächstes Bild"
        >
          ›
        </button>
      )}

      {hasMultiple && (
        <span className="modal-counter">
          {index + 1} / {images.length}
        </span>
      )}
    </div>,
    document.body
  );
}
