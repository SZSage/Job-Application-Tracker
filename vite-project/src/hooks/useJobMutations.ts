import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplications } from "@/api/applications-api";

interface DeleteData {
  userId: string | null;
  jobIds: string[];
}

/*
 * Custom hook that deletes job application data and invalidates
*/
export const useJobMutations = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteJobMutation } = useMutation({
    mutationFn: (deleteJobData: DeleteData) => {
      return deleteApplications(deleteJobData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
  return { deleteJobMutation };
};
