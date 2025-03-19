import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function ButtonOutline() {
  return <Button variant="outline"></Button>
}

export function ActiveButton() {
  return <Button variant="animated" className="font-bold text-sky-300 bg-sky-500/20 backdrop-blur-lg rounded-md">Active</Button>
}

export function ExportCsvButton() {
  return <Button variant="outline" className="font-bold text-sky-300 bg-sky-500/20 backdrop-blur-md rounded-md">Export CSV</Button>
}

export function ButtonIcon() {
  return (
    <Button variant="outline" className="font-bold text-sky-300 bg-sky-500/20 backdrop-blur-md rounded-md">
      <Plus />
    Add Applications
  </Button>
  )
}

export function SubmitButton() {
  return <Button variant="outline" className="font-bold text-sky-300 bg-sky-500/20 backdrop-blur-md rounded-md">Submit</Button>
}

