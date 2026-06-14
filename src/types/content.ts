export type Photo = {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
  credit?: string;
};

export type MemoryPost = {
  id: string;
  name: string;
  relation?: string;
  text?: string;
  imageSrc?: string;
  imageAlt?: string;
  source?: "manual" | "facebook" | "submitted";
  dateLabel?: string;
};
