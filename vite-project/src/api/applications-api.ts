import { apiGet, apiAddApplication, apiDeleteApplication, apiPostAuth } from "./api-client";
import { Register, LoginCredentials, AuthResponse , Applications, DeleteApplications }  from "@/types/types";

export async function getApplications(): Promise<Applications[]> {
  return apiGet<Applications[]>("getApplications/");
}

export async function addApplication(data: any): Promise<Applications[]> {
    return apiAddApplication<Applications[]>("addApplication", data);
}

export async function registerUser(data: any): Promise<Register> {
    return apiAddApplication<Register>("register", data);
}

export async function userLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiPostAuth<AuthResponse>("login", credentials);
}

export async function deleteApplications(data: any): Promise<any> {
    return apiDeleteApplication("deleteApplications/", data);
}
