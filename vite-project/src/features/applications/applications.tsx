import { AddApplication } from "./addApplication.tsx";
import type { Applications } from "@/types/types";
import { ActiveButton, ExportCsvButton } from "@/components/ui/button-outline";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteApplications } from "./deleteApplications.tsx";
import ApplicationsList from "@/components/applications/ApplicationList.tsx";
import { useJobSelection } from "@/hooks/useJobSelection.ts";
import { useApplications } from "@/hooks/useApplications.tsx";

export default function Applications() {
  const { applications, isLoading, error, totalCount } = useApplications();
  const { jobSelect, handleJobSelect, handleSelectAll, handleUncheck } = useJobSelection();

  const handleSelect = applications.map((app) => app.jobId);
  const showButton = jobSelect.size > 0;

  if (isLoading) {
    return <div className="p-4">Loading applications...</div>;
  }

  if (error) {
    return <div className="p-4">Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <Header />
      <div className="flex pb-2">{totalCount} TOTAL JOBS</div>
      <TabBar />
      <div className="flex pb-2 pt-2 items-center gap-2">
        <Checkbox
          onCheckedChange={(checked) =>
            checked ? handleSelectAll(handleSelect) : handleUncheck()
          }
        />
        {jobSelect.size} jobs selected
        {showButton && (
          <DeleteApplications
            jobSelect={jobSelect}
          ></DeleteApplications>
        )}
      </div>
      <ApplicationsList
        applications={applications}
        jobSelect={jobSelect}
        handleJobSelect={handleJobSelect}
      />
    </div>
  );
}

function Header() {
  return (
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-xl font-semibold">Your Job Tracker</h1>
    </div>
  );
}

function TabBar() {
  return (
    <div className="flex justify-between mb-4">
      <ActiveButton />
      <div className="flex gap-2">
        <ExportCsvButton />
        <AddApplication />
      </div>
    </div>
  );
}
