import * as React from "react";
import { useState, useEffect, useReducer } from "react";
import { DropDownMenuCheckboxes } from "./dropdownMenuCheckbox";
import { AddApplication } from "./addApplication.tsx";
import type { Applications } from "@/types/types";
import { getApplications, addApplication } from "@/api/applications-api";
import { MapPin, Building, DollarSign } from "lucide-react";
import { ActiveButton, ExportCsvButton } from "@/components/ui/button-outline";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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

export default function Applications() {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [jobSelect, setJobSelect] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [jobData, setJobData] = useState<Record<string, jobInfo>>({});
  const [state, dispatch] = useReducer(reducer, { count: 0, error: null });

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

function HiddenDelete({ isVisible, setIsVisible }) {
  return (
    <div>
      {isVisible ? (
        <div></div>
      ) : (
        <Button onClick={() => setIsVisible(!isVisible)}>Delete</Button>
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

function JobSelection({
  jobData,
  setJobData,
  isVisible,
  setIsVisible,
  selectedJobs,
  totalCount,
}: JobSelectionProps) {
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
  };

  const handleAllCheckedChange = (newState: boolean) => {
    setAllCheckedChange(newState);
    toggleAllChecked(newState);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Direct mapping to onCheckedChange instead of a separate handler to keep component
        simpler since this is the only checkbox that affects all items at once */}
      <Checkbox onCheckedChange={handleAllCheckedChange} />
      {allCheckedChange === false ? (
        <h3> {selectedJobs} JOBS SELECTED</h3>
      ) : (
        <h3>{totalCount} JOBS SELECTED</h3>
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
        console.log(jobs);
      })
      .catch((error) => console.error("Failed to fetch data: " + error));
  }, []);

  const renderCompanyIcon = () => <Building className="w-4 h-4" />;
  const renderSalaryIcon = () => <DollarSign className="w-4 h-4" />;
  const renderJobTypeIcon = () => <MapPin className="w-4 h-4" />;

  return (
    <div className="flex flex-col w-full">
      {applications.map((application) => (
        <div
          key={application.companyName}
          className="flex relative justify-between items-center mt-4 w-full h-30 border-1 border-gray-600 rounded-lg shadow-2xl bg-card/70 backdrop-blur-xs pl-4 pr-4"
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
