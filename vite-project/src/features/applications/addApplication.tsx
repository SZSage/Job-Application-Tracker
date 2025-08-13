import { useState } from "react";
import { useAddApplications } from "@/hooks/useApplications";
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
  // Utilize useJobMutations
  const { addJobMutation } = useAddApplications();
  const [ isOpen, setIsOpen] = useState<boolean>(false);
    // Construct delete payload and calls API
  const handleAddSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log("Form data: ", formData);
    try {
      await addJobMutation({
        jobTitle: formData.get("jobTitle") as string,
        companyName: formData.get("companyName") as string,
        location: formData.get("location") as string,
        salary: Number(formData.get("salary")),
        statusId: Number(formData.get("statusId")),
        userId: sessionStorage.getItem("userId") as string,
      });
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to add application:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Add application</DialogTitle>
        </DialogHeader>
        {/* Add application form */}
        <form onSubmit={handleAddSubmit}>
          <div className="grid gap-4 py-4">

            <div className="grid grid-cols-1 gap-4 items-center">
              <Label htmlFor="jobTitle" className="text-right">
                Job Title
              </Label>
              <Input id="jobTitle" name="jobTitle" className="col-span-3" />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="companyName" className="text-center">
                Company Name
              </Label>
              <Input id="companyName" name="companyName" className="col-span-3" />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="location" className="text-center">
                Location
              </Label>
              <Input id="location" name="location" className="col-span-3" />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="salary" className="text-center">
                Salary
              </Label>
              <Input id="salary" name="salary" className="col-span-3" />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="statusId" className="text-center">
                Status
              </Label>
              <Input id="statusId" name="statusId" className="col-span-3" />
            </div>

          </div>
          <DialogFooter>
            <Button type="submit" className="font-bold rounded-lg">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
