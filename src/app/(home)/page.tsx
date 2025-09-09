import { AboutView } from "@/modules/about/views/page";
import { HomeView } from "@/modules/home/views/home-view";
import { ProjectView } from "@/modules/projects/views/project-view";
import { ShortVideoView } from "@/modules/short-videos/views/short-video-view";
import { TestimonialView } from "@/modules/testimonial/views/testimonial-view";
export default function Home() {
  return (
    <div>
      <HomeView />
      <ProjectView />
      <ShortVideoView />
      <TestimonialView />
      <AboutView />
    </div>
  );
}
