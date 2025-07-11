import { apiDeleteApplication } from "@/api/api-client"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export function DeleteApplications() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="font-bold" variant={"destructive"}>
          <Trash2/>
          Delete</Button>
        <DialogContent>
          <DialogTitle>Delete Applications</DialogTitle>
          <DialogHeader>Are you sure you want to delete the selected applications?</DialogHeader>
          <DialogFooter>
            <Button className="font-bold" variant={"outline"}>Close</Button>
            <Button className="font-bold" variant={"destructive"}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </DialogTrigger>
    </Dialog>
  )
}
