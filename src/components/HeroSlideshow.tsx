"use client";

import { useEffect, useState } from "react";
import type { Photo } from "@/types/content";

export function HeroSlideshow({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % photos.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [photos.length]);

  return (
    <div className="heroFrame" aria-label="תמונות זיכרון מתחלפות">
      {photos.map((photo, index) => (
        <div
          className={`heroSlide ${index === activeIndex ? "heroSlideActive" : ""}`}
          key={photo.id}
          aria-hidden={index !== activeIndex}
        >
          <img src={photo.src} alt={photo.alt ?? photo.caption ?? "תמונת זיכרון"} />
          {photo.caption ? <div className="heroCaption">{photo.caption}</div> : null}
        </div>
      ))}
    </div>
  );
}
