import { getApplications, addApplication } from "@/api/applications-api";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export interface Applications {
  jobId: string;
  jobTitle: string;
  companyName: string;
  salary: number;
  location: string;
  jobType: string;
  statusId: number;
  userId: string | null;
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


export interface CreateApplicationRequest {
  jobTitle: string;
  companyName: string;
  location: string;
  salary: number;
  statusId: number;
  userId: string;
}

export function useApplications() {
  const query = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });

  return {
    applications: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    totalCount: query.data?.length || 0,
  };
}

export const useAddApplications = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addJobMutation } = useMutation({
    mutationFn: (addJobData: CreateApplicationRequest) => {
      return addApplication(addJobData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  return { addJobMutation };
}
