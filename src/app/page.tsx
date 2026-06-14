import Link from "next/link";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { heroPhotos } from "@/data/photos";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <section className="hero">
      <div className="container heroGrid">
        <div className="heroText">
          <div className="kicker">לזכרו · {site.years}</div>
          <h1>{site.personName}</h1>
          <p className="heroLine">{site.memorialLine}</p>
          <p className="heroIntro">{site.intro}</p>
          <div className="buttonRow">
            <Link className="button buttonPrimary" href="/photos">
              לתמונות
            </Link>
            <Link className="button" href="/submit">
              שיתוף זיכרון
            </Link>
          </div>
        </div>
        <HeroSlideshow photos={heroPhotos} />
      </div>
    </section>
  );
}
