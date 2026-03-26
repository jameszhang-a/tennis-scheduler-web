import HealthCheck from "./health-check";
import StatsCard from "./stats-card";

export default function Content() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <HealthCheck />
        </div>
        <div>
          <StatsCard />
        </div>
      </div>
    </div>
  );
}
