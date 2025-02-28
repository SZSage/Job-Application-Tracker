import { useState, useEffect } from "react";
import { List, Plus } from "lucide-react";
import type { Applications } from "@/types/types";
import { getApplications } from "@/api/applications-api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ApplicationList = () => {
  const [applications, setApplications] = useState<Applications[]>([]);
  const [loading, setLoading] = useState(true);

  // call useEffect
  useEffect(() => {
    getApplications()
      .then(applications => setApplications(applications))
      .catch(error => console.error(error));
  }, []);

  // return render
  return (
    <div className="flex mt-4 border-1 bg-card rounded-lg">
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
      <div className="bg-blue-500/50 backdrop-blur-lg text-white px-1 py-1 rounded-lg flex items-center">Active
      </div>
      <button className="bg-blue-500/50 backdrop-blur-lg text-white px-1 py-1 rounded-lg flex items-center">
          <Plus/>
      </button>
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
