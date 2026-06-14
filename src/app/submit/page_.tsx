import { site } from "@/data/site";

export default function SubmitPage() {
  const hasRealForm = !site.googleFormEmbedUrl.includes("FORM_ID");

  return (
    <>
      <section className="pageHeader container">
        <div className="kicker">שיתוף</div>
        <h1>שיתוף זיכרון או תמונה</h1>
        <p>
          מוזמנים לשתף תמונה, סיפור, משפט או זיכרון. גם כמה מילים קצרות הן זיכרון יקר.
        </p>
      </section>

      <section className="formCard">
        {hasRealForm ? (
          <iframe
            className="formFrame"
            src={site.googleFormEmbedUrl}
            title="טופס שיתוף זיכרון"
          >
            טוען…
          </iframe>
        ) : (
          <div className="formFallback">
            <h2>חברי כאן את טופס Google Forms</h2>
            <p>
              החליפי את <code>googleFormEmbedUrl</code> בקובץ <code>src/data/site.ts</code> בקישור ההטמעה האמיתי של הטופס.
            </p>
            <p>
              שדות מומלצים לטופס: שם, קשר אליו, מילים/זיכרון, העלאת תמונה, שנה/מקום אם יודעים, ואישור שהתוכן יכול להופיע באתר.
            </p>
            <p>
              עד שהטופס יחובר, אפשר לשלוח זיכרונות לכתובת: <strong>{site.contactEmail}</strong>
            </p>
          </div>
        )}
      </section>
    </>
  );
}
