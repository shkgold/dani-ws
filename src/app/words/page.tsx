import  MemoryPostCard  from "@/components/MemoryPostCard";
import { memoryPosts } from "@/data/posts";

export default function WordsPage() {
  return (
    <>
      <section className="pageHeader container">
        <div className="kicker">מילים</div>
        <h1>מילים עליו</h1>
        <p>
          סיפורים, פוסטים וזיכרונות שנכתבו על ידי משפחה וחברים.
        </p>
      </section>
      <section className="container posts" aria-label="זיכרונות כתובים">
        {memoryPosts.map((post) => (
          <MemoryPostCard key={post.id} post={post} />
        ))}
      </section>
    </>
  );
}
