import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function ButtonOutline() {
  return <Button variant="outline"></Button>
}

export function ActiveButton() {
  return <Button variant="outline" className="font-bold">Active</Button>
}

export function ExportCsvButton() {
  return <Button variant="default" className="font-bold">Export CSV</Button>
}

export function ButtonIcon() {
  return (
    <Button variant="default" className="font-bold">
      <Plus />
    Add Applications
  </Button>
  )
}

export function SubmitButton() {
  return <Button variant="outline" className="font-bold">Submit</Button>
}

export function DeleteButton() {
  return <Button variant="outline" className="font-bold">Delete</Button>
}
