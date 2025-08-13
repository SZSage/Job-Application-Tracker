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
      <ApplicationHeader />
      <div className="flex pb-2">{totalCount} TOTAL JOBS</div>
      <ApplicationTabBar />
      <div className="flex pb-2 pt-2 items-center gap-2">
        {/* Handles checkbox and unchecks the "select all" when applications are deleted */}
        <Checkbox
          checked={jobSelect.size === applications.length && applications.length > 0}
          onCheckedChange={(checked) => checked ? handleSelectAll(handleSelect) : handleUncheck()}
        />
        {jobSelect.size} jobs selected
        {showButton && (
          <DeleteApplications
            jobSelect={jobSelect}
            handleUncheck={handleUncheck}
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

function ApplicationHeader() {
  return (
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-xl font-semibold">Your Job Tracker</h1>
    </div>
  );
}

function ApplicationTabBar() {
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
