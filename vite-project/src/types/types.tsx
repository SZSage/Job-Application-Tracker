
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface Register {
  email: string;
  password: string;
  repeatPassword: string;
}

export interface Login {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthResponse {
  userId: string,
  token: string;
  tokenType: string;
  expirationTime: number;
  email: string;
  roles: string;
  refreshToken?: string;
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

export interface Users {
  userId: String,
  email: String,
  createdAt: String
}
