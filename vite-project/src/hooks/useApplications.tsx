import { useState, useEffect } from "react";
import { getApplications } from "@/api/applications-api";

interface jobInfo {
  checked: boolean;
  status: number;
}

export interface Applications {
    jobId: string,
    jobTitle: string,
    companyName: string,
    salary: number,
    location: string,
    jobType: string,
    statusId: ApplicationStatus,
    userId: string,
}

export type ApplicationStatus =
  "Saved" |
  "Applied" |
  "Screen" |
  "Interviewing" |
  "Offer" |
  "Withdrawn" |
  "Rejected" |
  "Ghosted" |
  "Accepted"

// Custom hook for fetching applications, job data, and calculating job count
export function useApplications() {
  const [applications, setApplications] = useState<Applications[]>([]);
  const [jobData, setJobData] = useState<Record<string, jobInfo>>({});
  const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
      getApplications().then((applications) => {
        // Creating new object to store job data
        const jobs: Record<string, jobInfo> = {};
        applications.forEach((job) => {
          jobs[job.jobId] = {
            checked: false,
            status: parseInt(job.statusId)
          };
        });

        setJobData(jobs);
        setApplications(applications);
        setTotalCount(applications.length);
        console.log("JOBS: " + JSON.stringify(jobs));
      })
    }, []);

  return { applications, jobData, totalCount };
}

