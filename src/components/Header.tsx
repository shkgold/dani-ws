import Link from "next/link";
import { site } from "@/data/site";

export function Header() {
  return (
    <header className="header">
      <div className="container headerInner">
        <Link className="brand" href="/" aria-label="לעמוד הבית">
          {site.personName}
        </Link>
        <nav className="nav" aria-label="ניווט ראשי">
          <Link href="/photos">תמונות</Link>
          <Link href="/words">מילים עליו</Link>
          <Link href="/submit">שיתוף זיכרון</Link>
        </nav>
      </div>
    </header>
  );
}
