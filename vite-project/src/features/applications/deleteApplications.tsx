import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useJobMutations } from "@/hooks/useJobMutations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ReactEventHandler } from "react";

interface DeleteData {
  userId: string | null;
  jobIds: string[];
}

interface DeleteApplicationsProps {
  jobSelect: string[];
  handleUncheck: any; // placeholder for now
}

/*
 * Component for deleting selected job applications. Shows confirmation dialog before performing bulk delete operation.
 */
export function DeleteApplications({ jobSelect, handleUncheck }: DeleteApplicationsProps) {
  const { deleteJobMutation } = useJobMutations();
  // Constructs delete payload and calls API
  const handleSubmit = async () => {
    const deleteData: DeleteData = {
      userId: sessionStorage.getItem("userId"),
      jobIds: [...jobSelect], // Spread operator to avoid mutation of original array
    };
    try {
      const result = await deleteJobMutation(deleteData);
      console.log("Delete successful: ", result);
      handleUncheck();
    } catch (error) {
      console.log("Failed to delete applications: ", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        {/* Delete button with destructive styling */}
        <Button className="font-bold" variant={"destructive"}>
          <Trash2 />
          Delete
        </Button>
        {/* Confirmation modal content */}
        <DialogContent>
          <DialogTitle>Delete Applications</DialogTitle>
          <DialogHeader>
            Are you sure you want to delete the selected applications?
          </DialogHeader>
          <DialogFooter>
            {/* Cancel action */}
            <Button className="font-bold" variant={"outline"}>
              Close
            </Button>
            {/* Confirm delete action */}
            <Button
              className="font-bold"
              variant={"destructive"}
              onClick={handleSubmit}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogTrigger>
    </Dialog>
  );
}
