import { ProjectsCard } from "./components/projects-card";
import { StatsOverview } from "./components/stats-overview";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      {/* Overview */}
      <StatsOverview />

      {/* Projects */}
      <ProjectsCard />
    </div>
  );
}
