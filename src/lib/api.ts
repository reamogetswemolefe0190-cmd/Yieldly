const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("yieldly_token") : null;
  
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => null);
  
  if (!res.ok) {
    throw new Error(data?.error || `API error: ${res.status}`);
  }
  
  return data;
}

export const api = {
  // Auth
  register: (name: string, email: string, password: string) =>
    fetchApi("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),
  
  login: (email: string, password: string) =>
    fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // User
  getMe: () => fetchApi("/users/me"),
  updateMe: (data: Record<string, unknown>) =>
    fetchApi("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Stokvels
  getStokvels: () => fetchApi("/stokvels"),
  getStokvel: (id: string) => fetchApi(`/stokvels/${id}`),
  createStokvel: (data: Record<string, unknown>) =>
    fetchApi("/stokvels", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  joinStokvel: (id: string) =>
    fetchApi(`/stokvels/${id}/join`, { method: "POST" }),
};
