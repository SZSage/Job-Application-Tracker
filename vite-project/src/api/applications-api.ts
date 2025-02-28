import { apiGet } from "./api-client";
import { Applications }  from "@/types/types";

// get all applications
export async function getApplications(): Promise<Applications[]> {
  return apiGet<Applications[]>("getApplications");
}


