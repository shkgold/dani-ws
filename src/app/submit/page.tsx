import MemorySubmitForm from "@/components/MemorySubmitForm";
import { site } from "@/data/site";

export default function SubmitPage() {
  return (
    <main className="page-shell submit-page">
      <section className="page-header">
        <p className="eyebrow">שיתוף זיכרון</p>
        <h1>שתפו מילים או תמונה</h1>
        <p>
          אפשר לכתוב כמה מילים, סיפור קצר, משפט שזוכרים ממנו,
          או לצרף תמונה אחת. כל מה שיישלח יעבור בדיקה לפני פרסום באתר.
        </p>
      </section>

      <section className="submit-card">
        <MemorySubmitForm endpoint={site.basinEndpoint} />
      </section>
    </main>
  );
}