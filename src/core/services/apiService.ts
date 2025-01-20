const API_BASE_URL = "http://localhost:5177";

export const apiRequest = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: any,
  headers: Record<string, string> = {}
): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "An error occurred");
    }

    return (await response.json()) as T;
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getRequest = <T>(
  endpoint: string,
  headers?: Record<string, string>
) => apiRequest<T>(endpoint, "GET", undefined, headers);

export const postRequest = <T>(
  endpoint: string,
  body: any,
  headers?: Record<string, string>
) => apiRequest<T>(endpoint, "POST", body, headers);

export const putRequest = <T>(
  endpoint: string,
  body: any,
  headers?: Record<string, string>
) => apiRequest<T>(endpoint, "PUT", body, headers);

export const deleteRequest = <T>(
  endpoint: string,
  body: any,
  headers?: Record<string, string>
) => apiRequest<T>(endpoint, "DELETE", body, headers);
