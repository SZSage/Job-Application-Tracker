
export interface Applications {
    jobId: string,
    jobTitle: string,
    companyName: string,
    salary: number,
    location: string,
    statusId: ApplicationStatus,
    userId: string
}

export type ApplicationStatus = "applied" | "interview" | "offer" | "rejected";

export interface Users {
  userId: String,
  email: String,
  createdAt: String
}
