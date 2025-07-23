import { useState, useEffect } from "react";
import { getApplications } from "@/api/applications-api";

export interface Applications {
  jobId: string;
  jobTitle: string;
  companyName: string;
  salary: number;
  location: string;
  jobType: string;
  statusId: ApplicationStatus;
  userId: string;
}

export type ApplicationStatus =
  | "Saved"
  | "Applied"
  | "Screen"
  | "Interviewing"
  | "Offer"
  | "Withdrawn"
  | "Rejected"
  | "Ghosted"
  | "Accepted";

// Custom hook for fetching applications, job data, and calculating job count
export function useApplications() {
  const [applications, setApplications] = useState<Applications[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    getApplications().then((applications) => {
      setApplications(applications);
      setTotalCount(applications.length);
    })
    .catch((error) => console.error("Failed to fetch data: ", error));
  }, []);

  return { applications, totalCount };
}
