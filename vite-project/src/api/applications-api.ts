import { apiGet, apiAdd, apiGetAuth } from "./api-client";
import { Register, LoginCredentials, AuthResponse , Applications }  from "@/types/types";

export async function getApplications(): Promise<Applications[]> {
  return apiGet<Applications[]>("getApplications/");
}

export async function addApplication(data: any): Promise<Applications[]> {
    return apiAdd<Applications[]>("addApplication", data);
}

export async function registerUser(data: any): Promise<Register> {
    return apiAdd<Register>("register", data);
}

export async function userLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiAdd<AuthResponse>("login", credentials);
}

