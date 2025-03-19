import { http, HttpResponse } from "msw"

export const handlers = [
    http.get("http://localhost:8080/jobApplications/api/getApplications", () => {
        return HttpResponse.json({
            "jobId": "mock-id-123",
            "jobTitle": "Mock Software Engineer",
            "companyName": "Moch Tech Corp",
            "salary": 100000,
            "location": "New York",
            "statusId": 1,
            "userId": "mockcb15bad6-01bd-4310-b5ab-58790a604611"
        })
    })
]
