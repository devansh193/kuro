import { HomeView } from "@/modules/home/views/home-view";
import { ProjectView } from "@/modules/projects/views/project-view";
export default function Home() {
  return (
    <div>
      <HomeView />
      <ProjectView />
      {/* <TestimonialView /> */}
    </div>
  );
}
