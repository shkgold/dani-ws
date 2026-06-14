"use client";

import { useEffect, useState } from "react";
import type { Photo } from "@/types/content";
import { PhotoLightbox } from "./PhotoLightbox";

export function PhotoMosaic({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeIndex === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <>
      <section className="mosaic" aria-label="גלריית תמונות">
        {photos.map((photo, index) => (
          <button className="photoCard" key={photo.id} onClick={() => setActiveIndex(index)}>
            <span className="photoCardInner">
              <img src={photo.src} alt={photo.alt ?? photo.caption ?? "תמונת זיכרון"} loading="lazy" />
              {photo.caption ? <span className="photoCaption">{photo.caption}</span> : null}
            </span>
          </button>
        ))}
      </section>

      {activeIndex !== null ? (
        <PhotoLightbox
          photos={photos}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onMove={setActiveIndex}
        />
      ) : null}
    </>
  );
}
