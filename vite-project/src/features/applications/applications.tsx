import * as React from "react";
import { useState, useEffect, useReducer } from "react";
import { DropDownMenuCheckboxes } from "./dropdownMenuCheckbox";
import { AddApplication } from "./addApplication.tsx";
import type { Applications } from "@/types/types";
import { deleteApplications, getApplications } from "@/api/applications-api";
import { MapPin, Building, DollarSign } from "lucide-react";
import { ActiveButton, ExportCsvButton } from "@/components/ui/button-outline";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DeleteApplications } from "./deleteApplications.tsx";
import ApplicationsList from "@/components/applications/ApplicationList.tsx";
import { useJobSelection } from "@/hooks/useJobSelection.ts";
import { useApplications } from "@/hooks/useApplications.tsx";

interface jobInfo {
  checked: boolean;
  status: number;
}

interface JobSelectionProps {
  selectedJobs: number;
  setJobSelect: React.Dispatch<React.SetStateAction<number>>;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  jobData: Record<string, jobInfo>;
  setJobData: React.Dispatch<React.SetStateAction<Record<string, jobInfo>>>;
  totalCount: number;
  onItemsDeleted: (value: string[]) => void;
}

interface ApplicationListProps {
  jobData: Record<string, jobInfo>;
  setJobData: React.Dispatch<React.SetStateAction<Record<string, jobInfo>>>;
  setJobSelect: React.Dispatch<React.SetStateAction<number>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  onItemsDeleted: (value: string[]) => void;
}

interface VisibleHandlerProps {
  isVisible: boolean;
  jobData: Record<string, jobInfo>;
  onItemsDeleted: (value: string[]) => void;
}

export default function Applications() {
  const {applications, totalCount } = useApplications();
  const {jobSelect, handleJobSelect, handleSelectAll, handleUncheck} = useJobSelection();

  const handleSelect = applications.map(app => app.jobId);
  const showButton = jobSelect.size > 0;

  return (
    <div className="p-4">
      <Header />
      <div className="flex pb-2">{applications.length} TOTAL APPLICATIONS</div>
      <TabBar />
      <div className="flex pb-2 pt-2 items-center gap-2">
        <Checkbox
          onCheckedChange={(checked) => checked? handleSelectAll(handleSelect): handleUncheck()}
        /> {jobSelect.size} selected
        {showButton && (
          <DeleteApplications
            jobData={applications}
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
