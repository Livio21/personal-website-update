import { PhotographySection } from './photography-section';
import { MusicSection } from './music-section';
import { BlogSection } from './blog-section';

export default function HobbiesPage() {
  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll no-scrollbar">
      <PhotographySection />
      <MusicSection />
      <BlogSection />
    </div>
  );
}
