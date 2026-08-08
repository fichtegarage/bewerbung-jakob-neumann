import { useEffect, useRef, useState, forwardRef } from "react";
import { createPortal } from "react-dom";
import HTMLFlipBook from "react-pageflip";
import "./BrochureModal.css";

const PAGE_COUNT = 8;
const pages = Array.from({ length: PAGE_COUNT }, (_, i) => `/broschuere/page-${i + 1}.jpg`);

const Page = forwardRef(({ src, alt }, ref) => (
  <div className="brochure-page" ref={ref}>
    <img src={src} alt={alt} draggable={false} />
  </div>
));

const PAGE_ASPECT = 1240 / 1754; // Breite/Höhe der gerenderten PDF-Seiten (A4 Hochformat)

function computeSize() {
  const maxW = Math.min(window.innerWidth - 120, 560);
  const maxH = Math.min(window.innerHeight - 160, 800);
  let width = maxW;
  let height = width / PAGE_ASPECT;
  if (height > maxH) {
    height = maxH;
    width = height * PAGE_ASPECT;
  }
  return { width: Math.round(width), height: Math.round(height) };
}

export default function BrochureModal({ onClose }) {
  const bookRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [size, setSize] = useState(computeSize);

  useEffect(() => {
    const onResize = () => setSize(computeSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") bookRef.current?.pageFlip()?.flipNext();
      if (e.key === "ArrowLeft") bookRef.current?.pageFlip()?.flipPrev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="modal-overlay brochure-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Broschüre, zum Durchblättern"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="modal-close" onClick={onClose} aria-label="Schließen">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className="brochure-wrap" onClick={(e) => e.stopPropagation()}>
        <HTMLFlipBook
          width={size.width}
          height={size.height}
          showCover={true}
          drawShadow={false}
          mobileScrollSupport={true}
          className="brochure-flipbook"
          ref={bookRef}
          onFlip={(e) => setPageIndex(e.data)}
        >
          {pages.map((src, i) => (
            <Page key={src} src={src} alt={`Broschüre Seite ${i + 1}`} />
          ))}
        </HTMLFlipBook>

        <div className="brochure-controls">
          <button
            type="button"
            onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
            aria-label="Vorherige Seite"
          >
            ‹
          </button>
          <span className="brochure-page-count">
            {pageIndex + 1} / {pages.length}
          </span>
          <button
            type="button"
            onClick={() => bookRef.current?.pageFlip()?.flipNext()}
            aria-label="Nächste Seite"
          >
            ›
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
