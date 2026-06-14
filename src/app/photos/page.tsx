import { PhotoMosaic } from "@/components/PhotoMosaic";
import { galleryPhotos } from "@/data/photos";

export default function PhotosPage() {
  return (
    <>
      <section className="pageHeader container">
        <div className="kicker">תמונות</div>
        <h1>רגעים שזוכרים</h1>
        <p>
		לחץ על תמונה כדי להגדיל
        </p>
      </section>
      <div className="container">
        <PhotoMosaic photos={galleryPhotos} />
      </div>
    </>
  );
}
