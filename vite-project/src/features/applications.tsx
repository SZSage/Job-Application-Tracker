import { useState, useEffect } from "react";
import type { Applications } from "@/types/types";
import { getApplications } from "@/api/applications-api";
import { ActiveButton, ExportCsvButton,ButtonIcon } from "@/components/ui/button-outline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"

const ApplicationList = () => {
  const [applications, setApplications] = useState<Applications[]>([]);
  const [loading, setLoading] = useState(true);

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

export function TabBar() {
  return (
    <div className="flex justify-between">
      <ActiveButton />
      <div className="flex gap-2">
        <ExportCsvButton />
        <ButtonIcon />
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
