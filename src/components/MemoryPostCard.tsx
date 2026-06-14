import Image from "next/image";
import type { MemoryPost } from "@/types/content";

type MemoryPostCardProps = {
  post: MemoryPost;
};

export default function MemoryPostCard({ post }: MemoryPostCardProps) {
  const isFacebook = post.source === "facebook";

  return (
    <article className={`memory-card ${isFacebook ? "facebook-memory-card" : ""}`}>
      <header className="memory-card-header">
        <div>
          {post.name && <h2>{post.name}</h2>}

          {post.relation && <p>{post.relation}</p>}
        </div>

        {post.dateLabel && <span className="memory-card-badge">{post.dateLabel}</span>}
      </header>

      {post.text && <p className="memory-card-text">{post.text}</p>}

      {post.imageSrc && (
        <div className={isFacebook ? "facebook-screenshot-wrap" : "memory-card-image-wrap"}>
          <Image
            src={post.imageSrc}
            alt={post.imageAlt ?? post.text ?? "זיכרון על דני"}
            width={1100}
            height={1400}
            className={isFacebook ? "facebook-screenshot" : "memory-card-image"}
          />
        </div>
      )}
    </article>
  );
}