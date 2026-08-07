import { useEffect } from "react";
import "./ScreenshotModal.css";

export default function ScreenshotModal({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button className="modal-close" onClick={onClose} aria-label="Schließen">
        ×
      </button>
      <img
        src={src}
        alt={alt}
        className="modal-image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
