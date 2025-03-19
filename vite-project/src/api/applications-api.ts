import { apiGet, apiAdd } from "./api-client";
import { Applications }  from "@/types/types";

export async function getApplications(): Promise<Applications[]> {
  return apiGet<Applications[]>("getApplications");
}

export async function addApplication(data: any): Promise<Applications[]> {
    return apiAdd<Applications[]>("addApplication", data);
}

export async function registerUser(data: any): Promise<Applications[]> {
    return apiAdd<Applications[]>("addApplication", data);
}

