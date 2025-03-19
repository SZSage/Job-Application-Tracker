import { apiGet, apiAdd } from "./api-client";
import { Applications }  from "@/types/types";

// get all applications
export async function getApplications(): Promise<Applications[]> {
  return apiGet<Applications[]>("getApplications");
}

// Add application
export async function addApplication(data: any): Promise<Applications[]> {
    return apiAdd<Applications[]>("addApplication", data);
}
