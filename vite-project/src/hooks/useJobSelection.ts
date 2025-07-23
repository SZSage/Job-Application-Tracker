import { useState } from "react";

export function useJobSelection() {
  const [jobSelect, setJobSelect] = useState<Set<string>>(new Set());

  const handleJobSelect = (jobId: string) => {
    setJobSelect((prev) => {
      const newSet = new Set(prev);
      newSet.has(jobId) ? newSet.delete(jobId) : newSet.add(jobId);
      console.log("newSet: ", newSet);
      return newSet;
    });
  };

  const handleSelectAll = (allJobIds: string[]) => {
    setJobSelect(new Set(allJobIds));
  };

  const handleUncheck = () => {
    setJobSelect(new Set())
  }

  return { jobSelect, handleJobSelect, handleSelectAll, handleUncheck };
}

