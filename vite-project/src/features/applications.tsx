import {  useState, useEffect } from "react";
import type { Applications } from "@/types/types";
import { getApplications, addApplication } from "@/api/applications-api";
import { Plus } from "lucide-react"
import { ActiveButton, ExportCsvButton } from "@/components/ui/button-outline";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"

const ApplicationList = () => {
  const [applications, setApplications] = useState<Applications[]>([]);

  useEffect(() => {
    getApplications()
      .then(applications => setApplications(applications))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="flex text-muted-foreground mt-4 border-1 border-gray-700 shadow-2xl bg-gray-700/50 backdrop-blur-xs rounded-md">
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>

          {applications.map((applications) => (
            <TableRow key={applications.userId}>
              <TableCell>{applications.jobTitle}</TableCell>
              <TableCell>{applications.companyName}</TableCell>
              <TableCell>{applications.location}</TableCell>
              <TableCell>{applications.salary}</TableCell>
              <TableCell>{applications.statusId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function Header() {
  return (
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-xl font-semibold">Your Job Tracker</h1>
    </div>
  );
}


export function AddApplication() {

  // #TODO: Verify current userId
  const getCurrentUser = async () => {
    const response = await fetch("/api/currentUser");
    return response.json();
  }

  const handleSubmit = (event: any) => {
    console.log("Form submitted: ", event)
    event.preventDefault();

    const formData = new FormData(event.target);

    const applicationData = {
      jobTitle: formData.get("job-title"),
      companyName: formData.get("company-name"),
      location: formData.get("location"),
      salary: Number(formData.get("salary")),
      status: Number(formData.get("status")),
      userId: "cb15bad6-01bd-4310-b5ab-58790a604611",
    }

    console.log("Applicaiton Data:", applicationData);
    console.log("Form data:", Object.fromEntries(formData));

    //send API request with form data
    addApplication(applicationData)
      .then(applicationData => {
        console.log("Application added successfully!", applicationData);
      })
      .catch(error => {
        console.log("Error adding application", error);
      })
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
            <Button type="submit" className="font-bold text-sky-300 bg-sky-500/20 backdrop-blur-md rounded-md">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function TabBar() {
  return (
    <div className="flex justify-between">
      <ActiveButton />
      <div className="flex gap-2">
        <ExportCsvButton />
        <AddApplication />
      </div>
    </div>
  )
}

export default function Applications() {
  return (
    <div className="p-4">
      <Header />
      <TabBar />
      <ApplicationList></ApplicationList>
  </div>
  )
}
