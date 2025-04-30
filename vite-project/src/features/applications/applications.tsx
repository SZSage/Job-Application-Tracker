import * as React from "react";
import { useState, useEffect } from "react";
import type { Applications } from "@/types/types";
import { getApplications, addApplication } from "@/api/applications-api";
import { MapPin, Building, DollarSign } from "lucide-react";
import { Plus } from "lucide-react";
import { ActiveButton, ExportCsvButton } from "@/components/ui/button-outline";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Applications() {
  const [ totalCount, setTotalCount ] = useState<number>(0);
  const [ jobSelect, setJobSelect ] = useState<number>(0);
  return (
    <div className="p-4">
      <Header />
      <div className="pb-2">
        {totalCount} TOTAL APPLICATIONS
      </div>
      <TabBar />
      <JobSelection selectedJobs={jobSelect}/>
      <NewAppList setJobSelect={setJobSelect} setTotalCount={setTotalCount}/>
    </div>
  );
}

export function Header() {
  return (
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-xl font-semibold">Your Job Tracker</h1>
    </div>
  );
}

export function TabBar() {
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

interface JobSelectionProps {
  selectedJobs: number;
}

export function JobSelection({ selectedJobs }: JobSelectionProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox />
      <h3> {selectedJobs} jobs selected</h3>
    </div>
  )
}


export function NewAppList({ setJobSelect, setTotalCount }) {
  const [applications, setApplications] = useState<Applications[]>([]);
  const [ status, setStatus ] = useState(() => 0)
  const [ jobData, setJobData ] = useState<Record<string, jobInfo>>({});

  interface jobInfo {
    checked: boolean;
    status: number
  };


  /* State Management: Sets checked status for each jobId when called */
  const handleCheckBox = (newCheckedState: boolean, jobId: string) => {
    const updatedJobData = {
      ...jobData,
      [jobId]: {
        ...jobData[jobId],
        checked: newCheckedState
      }
    };
    setJobData(updatedJobData)
    const wasChecked = jobData[jobId]?.checked || false;

    // Update count based on checked applications
    if (wasChecked != newCheckedState) {
      setJobSelect((prevCount: number) => newCheckedState ? prevCount + 1 : prevCount - 1);
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
            status: parseInt(job.statusId)
          };
          setStatus(parseInt(job.statusId))
        });

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
          className="flex relative justify-between items-center mt-4 w-full h-30 border-1 border-gray-600 rounded-lg shadow-2xl bg-card/70 backdrop-blur-xs pl-4 pr-4">
          <div className="flex relative flex-col text-muted-foreground">
            <div key={application.jobId} className="flex gap-2 items-center">
              <Checkbox
                checked={jobData[application.jobId]?.checked || false}
                onCheckedChange={(newState: boolean) => {
                  handleCheckBox(newState, application.jobId)
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

export function AddApplication() {
  const handleSubmit = (event: any) => {
    console.log("Form submitted: ", event);
    event.preventDefault();

    const formData = new FormData(event.target);

    const applicationData = {
      jobId: formData.get("job-id"),
      jobTitle: formData.get("job-title"),
      companyName: formData.get("company-name"),
      location: formData.get("location"),
      salary: Number(formData.get("salary")),
      status: Number(formData.get("status")),
      userId: sessionStorage.getItem("userId"),
    };

    console.log("Applicaiton Data:", applicationData);
    console.log("Form data:", Object.fromEntries(formData));

    //send API request with form data
    addApplication(applicationData)
      .then((applicationData) => {
        console.log("Application added successfully!", applicationData);
      })
      .catch((error) => {
        console.log("Error adding application", error);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold text-sky-300 bg-sky-500/20 backdrop-blur-md rounded-md">
          <Plus />
          Add Application
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w[450px]">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4 items-center">
              <Label htmlFor="job-title" className="text-right">
                Job Title
              </Label>
              <Input name="job-title" className="col-span-3" />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="company-name" className="text-center">
                Company Name
              </Label>
              <Input name="company-name" className="col-span-3" />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="location" className="text-center">
                Location
              </Label>
              <Input name="location" className="col-span-3" />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="salary" className="text-center">
                Salary
              </Label>
              <Input name="salary" className="col-span-3" />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="status" className="text-center">
                Status
              </Label>
              <Input name="status" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="font-bold text-sky-300 bg-sky-500/20 backdrop-blur-md rounded-md"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DropDownMenuCheckboxes() {
  const [selectedStatus, setSelectedStatus] = React.useState<string>("saved");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Status</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" sideOffset={4} align="end">
        <Arrow width={20} height={10} />
        <DropdownMenuCheckboxItem
          checked={selectedStatus === "saved"}
          onCheckedChange={() => setSelectedStatus("saved")}
        >
          Saved
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "applied"}
          onCheckedChange={() => setSelectedStatus("applied")}
        >
          Applied
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "screen"}
          onCheckedChange={() => setSelectedStatus("screen")}
        >
          Screen
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "interviewing"}
          onCheckedChange={() => setSelectedStatus("interviewing")}
        >
          Interviewing
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "offer"}
          onCheckedChange={() => setSelectedStatus("offer")}
        >
          Offer
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuCheckboxItem
          checked={selectedStatus === "withdrawn"}
          onCheckedChange={() => setSelectedStatus("withdrawn")}
        >
          Withdrawn
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "Rejected"}
          onCheckedChange={() => setSelectedStatus("Rejected")}
        >
          Rejected
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "ghosted"}
          onCheckedChange={() => setSelectedStatus("ghosted")}
        >
          Ghosted
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={selectedStatus === "accepted"}
          onCheckedChange={() => setSelectedStatus("accepted")}
        >
          Accepted
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
