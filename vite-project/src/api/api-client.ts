const API_URL = "http://localhost:8080/jobApplications/api/";

const user_register_URL = "http://localhost:8080/api/auth/"

const user_register_test = "http://localhost:8080/api/auth/"

// A general API handler that checks for HTTP responses
async function apiHandler(response: Response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({
            message: "An unknown error occured",
        }));
        throw new Error(error.message || `Error ${response.status}`);
    }
    return response.json();
}

export async function apiGet<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    return apiHandler(response);
}

export async function apiAdd<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${user_register_test}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return apiHandler(response);
}
