const API_URL = "http://localhost:8080/jobApplications/api/";
const API_DELETE = "http://localhost:8080/jobApplications/api/"
const user_login_URL = "http://localhost:8080/api/auth/"

// A general API handler that checks for HTTP responses
async function apiHandler(response: Response) {
    console.log('Response status:', response.status);
    
    if (!response.ok) {
        const error = await response.json()
                                    .catch(() => ({
            message: "An unknown error occurred"})
        );
        throw new Error(error.message || `Error ${response.status}`);
    }

    const text = await response.text();
    //console.log('Raw response:', text);
    // Handle both JSON and plain text
    try {
        return JSON.parse(text);
    } catch {
        return { message: text }; // Return plain text wrapped in object
    }
}

export async function apiGet<T>(endpoint: string): Promise<T> {
    const userId = retrieveUserId();
    const response = await fetch(`${API_URL}${endpoint}${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return apiHandler(response);
}

export async function apiAddApplication<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return apiHandler(response);
}

export async function apiDeleteApplication<T>(endpoint: string, data: any): Promise<T> {
    const userId = retrieveUserId();
    const response = await fetch(`${API_DELETE}${endpoint}${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    if (response.ok) {
        console.log("Applications deleted");
    };
    return apiHandler(response) as Promise<T>;
}

export async function apiPostAuth<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${user_login_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return apiHandler(response);
}

function retrieveToken(): String | null {
    const sessionToken = sessionStorage.getItem("token");
    return sessionToken;
}

function retrieveUserId(): String | null {
    const userId = sessionStorage.getItem("userId");
    return userId;
}

// Authenticatied GET request function that includes the token in headers
// Retrieve token from sessionStorage
// Include it in the authorization header using Bearer scheme
export async function apiGetAuth<T>(endpoint: string): Promise<T> {
    const sessionToken = retrieveToken();
    console.log("FETCHED TOKEN: " + sessionToken);
    const response = await fetch(`${user_login_URL}${endpoint}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + sessionToken
        },
    });
    return apiHandler(response);
}

// TODO: Token refresh logic
