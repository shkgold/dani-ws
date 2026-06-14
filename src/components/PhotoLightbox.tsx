"use client";

import { useEffect } from "react";
import type { Photo } from "@/types/content";

type Props = {
  photos: Photo[];
  activeIndex: number;
  onClose: () => void;
  onMove: (index: number) => void;
};

export function PhotoLightbox({ photos, activeIndex, onClose, onMove }: Props) {
  const photo = photos[activeIndex];

  const previous = () => onMove((activeIndex - 1 + photos.length) % photos.length);
  const next = () => onMove((activeIndex + 1) % photos.length);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      // RTL-friendly: right arrow moves to previous, left arrow moves to next.
      if (event.key === "ArrowRight") previous();
      if (event.key === "ArrowLeft") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="lightboxBackdrop" role="dialog" aria-modal="true" aria-label="צפייה בתמונה">
      <div className="lightboxPanel">
        <div className="lightboxImageWrap">
          <button className="lightboxButton lightboxClose" onClick={onClose} aria-label="סגירת התמונה">
            ×
          </button>
          <button className="lightboxButton lightboxPrev" onClick={previous} aria-label="התמונה הקודמת">
            ›
          </button>
          <img src={photo.src} alt={photo.alt ?? photo.caption ?? "תמונת זיכרון"} />
          <button className="lightboxButton lightboxNext" onClick={next} aria-label="התמונה הבאה">
            ‹
          </button>
        </div>

        {(photo.caption || photo.credit) && (
          <div className="lightboxInfo">
            {photo.caption ? <div>{photo.caption}</div> : null}
            {photo.credit ? <div>שותף/ה על ידי {photo.credit}</div> : null}
          </div>
        )}
      </div>
    </div>
  );
}
