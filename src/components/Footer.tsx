import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        לזכרו של {site.personName} · {site.years}
      </div>
    </footer>
  );
}
