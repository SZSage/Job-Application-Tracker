import { addApplication } from "@/api/applications-api";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

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
        <Button className="font-bold">
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
              className="font-bold rounded-lg"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

