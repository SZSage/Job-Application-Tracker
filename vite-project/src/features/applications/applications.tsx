import * as React from "react";
import { useState, useEffect, useReducer } from "react";
import { DropDownMenuCheckboxes } from "./dropdownMenuCheckbox";
import { AddApplication } from "./addApplication.tsx";
import type { Applications } from "@/types/types";
import { getApplications, deleteApplications} from "@/api/applications-api";
import { MapPin, Building, DollarSign } from "lucide-react";
import { ActiveButton, ExportCsvButton, DeleteButton } from "@/components/ui/button-outline";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent
} from "@/components/ui/card";
import { DeleteApplications } from "./deleteApplications.tsx";

interface jobInfo {
  checked: boolean;
  status: number;
}

interface State {
  count: number;
  totalCount: number;
  error: string | null;
  selected: boolean;
}

interface Action {
  type: "select" | "unselect";
}

interface JobSelectionProps {
  selectedJobs: number;
  setJobSelect: React.Dispatch<React.SetStateAction<number>>;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  jobData: Record<string, jobInfo>;
  setJobData: React.Dispatch<React.SetStateAction<Record<string, jobInfo>>>;
  totalCount: number;
}

interface ApplicationListProps {
  jobData: Record<string, jobInfo>;
  setJobData: React.Dispatch<React.SetStateAction<Record<string, jobInfo>>>;
  setJobSelect: React.Dispatch<React.SetStateAction<number>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

interface VisibleHandlerProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Applications() {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [jobSelect, setJobSelect] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [jobData, setJobData] = useState<Record<string, jobInfo>>({});

  // This will run whenever jobSelect changes
  useEffect(() => {
    setIsVisible(jobSelect > 0);
  }, [jobSelect]);

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case "select": {
        const newCount = state.count + 1;
        // Define error here?
        return {
          ...state,
          count: state.selected ? state.count : newCount,
        };
      }
    }
  }

  return (
    <div className="p-4">
      <Header />
      <div className="pb-2">{totalCount} TOTAL APPLICATIONS</div>
      <TabBar />
      <JobSelection
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        selectedJobs={jobSelect}
        setJobSelect={setJobSelect}
        jobData={jobData}
        setJobData={setJobData}
        totalCount={totalCount}
      />
      <ApplicationList
        jobData={jobData}
        setJobData={setJobData}
        setJobSelect={setJobSelect}
        setTotalCount={setTotalCount}
      />
    </div>
  );
}

function HiddenDelete({ isVisible, setIsVisible }: VisibleHandlerProps) {
  return (
    <div>
      {isVisible ? (
        <DeleteApplications></DeleteApplications>
      ) : (
        <div></div>
      )}
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

function JobSelection({jobData, setJobData, isVisible, setIsVisible, selectedJobs, setJobSelect, totalCount }: JobSelectionProps) {
  const [allCheckedChange, setAllCheckedChange] = useState<boolean>(false);
  // Using a separate function to maintain the state update logic
  // which prevents inconsistent state updates across the component
  const toggleAllChecked = (newCheckedState: boolean) => {
    const updatedJobData = Object.fromEntries(
      Object.entries(jobData).map(([id, jobInfo]) => [
        id,
        { ...jobInfo, checked: newCheckedState },
      ]),
    );
    setJobData(updatedJobData);
    console.log("updatedJobData", updatedJobData);
    setJobSelect(newCheckedState ? totalCount : 0);
  };

  const handleAllCheckedChange = (newState: boolean) => {
    setAllCheckedChange(newState);
    toggleAllChecked(newState);
  };

  return (
    <div className="flex items-center gap-2 pb-4 pt-2">
      {/* Direct mapping to onCheckedChange instead of a separate handler to keep component
        simpler since this is the only checkbox that affects all items at once */}
      <Checkbox onCheckedChange={handleAllCheckedChange} />
      {allCheckedChange === false || selectedJobs ?  (
        <h3> {selectedJobs} JOBS SELECTED</h3>
      ) : (
        <h3>{totalCount} ALL JOBS SELECTED</h3>
      )}
      <HiddenDelete
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      ></HiddenDelete>
    </div>
  );
}

function ApplicationList({
  jobData,
  setJobData,
  setJobSelect,
  setTotalCount,
}: ApplicationListProps) {
  const [applications, setApplications] = useState<Applications[]>([]);

  /* State Management: Sets checked status for each jobId when called */
  const handleCheckBox = (newCheckedState: boolean, jobId: string) => {
    const updatedJobData = {
      ...jobData,
      [jobId]: {
        ...jobData[jobId], // Copies all existing properties
        checked: newCheckedState,
      },
    };
    setJobData(updatedJobData);
    const wasChecked = jobData[jobId]?.checked || false;

    // Update count based on checked applications
    if (wasChecked != newCheckedState) {
      setJobSelect((prevCount: number) =>
        newCheckedState ? prevCount + 1 : prevCount - 1,
      );
    }

    if (newCheckedState) {
      console.log("Job checked: ", jobId);
    }
  };

  /* Get applications and set each one to keep track of checked status */
  useEffect(() => {
    getApplications()
      .then((applications) => {
        const jobs: Record<string, jobInfo> = {};
        setTotalCount(applications.length);

        applications.forEach((job) => {
          jobs[job.jobId] = {
            checked: false,
            status: parseInt(job.statusId),
          };
        });
        setJobData(jobs);
        setApplications(applications);
        console.log("JOBS: " + JSON.stringify(jobs));
      })
      .catch((error) => console.error("Failed to fetch data: " + error));
  }, []);

  const renderCompanyIcon = () => <Building className="w-4 h-4" />;
  const renderSalaryIcon = () => <DollarSign className="w-4 h-4" />;
  const renderJobTypeIcon = () => <MapPin className="w-4 h-4" />;

  return (
    <div className="flex flex-col w-full">

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      {applications.map((application) => (
        <div
          key={application.companyName}
          className="flex relative justify-between items-center mt-4 w-full h-30 border shadow-md bg-card pl-4 pr-4 rounded"
        >
          <div className="flex relative flex-col text-muted-foreground">
            <div key={application.jobId} className="flex gap-2 items-center">
              <Checkbox
                checked={jobData[application.jobId]?.checked || false}
                onCheckedChange={(newState: boolean) => {
                  handleCheckBox(newState, application.jobId);
                }}
              />
              <div className="flex flex-col">
                <span className="font-bold text-md">
                  {application.jobTitle}
                </span>

                <div className="flex items-center gap-1">
                  {renderCompanyIcon()}
                  <span>{application.companyName}</span>
                </div>

                <div className="flex items-center gap-1">
                  {renderSalaryIcon()}
                  <span>{application.salary}</span>
                </div>

                <div className="flex items-center gap-1">
                  {renderJobTypeIcon()}
                  <span>{application.location}</span>
                </div>
              </div>
            </div>
          </div>
          <DropDownMenuCheckboxes />
        </div>
      ))}
    </div>
  );
}
