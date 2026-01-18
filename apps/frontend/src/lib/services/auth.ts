import { config } from "@/lib/config";
const { API_URL } = config;

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData);
  }

  return await response.json();
}

export async function loginUser(username: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/signin`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData);
  }
  return await response.json();
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData);
  }

  return await response.json();
}

export async function getUserDashboard() {
  const response = await fetch(`${API_URL}/api/user`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      typeof errorData === "string" ? errorData : "Failed to fetch user data",
    );
  }

  return await response.json();
}

export async function updateUser(formData: FormData) {
  const response = await fetch(`${API_URL}/api/user`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      typeof errorData === "string" ? errorData : "Failed to update user",
    );
  }

  return await response.json();
}
