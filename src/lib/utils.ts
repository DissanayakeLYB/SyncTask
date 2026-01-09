import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// API base URL for backend services
export const API_BASE =
  "https://sync-task-uom-mse-instructors-backend.vercel.app";

// Generic JSON helpers
async function requestJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text || res.statusText}`);
  }
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return res.json();
  }
  // Fallback for endpoints that return plain text (e.g., "successful")
  const text = await res.text();
  return text as unknown as T;
}

export function getJSON<T>(path: string): Promise<T> {
  return requestJSON<T>(path, { method: "GET" });
}

export function postJSON<T>(path: string, body: unknown): Promise<T> {
  return requestJSON<T>(path, { method: "POST", body: JSON.stringify(body) });
}

export function putJSON<T>(path: string, body: unknown): Promise<T> {
  return requestJSON<T>(path, { method: "PUT", body: JSON.stringify(body) });
}

export function deleteJSON<T>(path: string): Promise<T> {
  return requestJSON<T>(path, { method: "DELETE" });
}

// Task-specific helpers
export interface ApiTask {
  id?: string;
  _id?: string;
  taskDescription: string;
  status: "todo" | "working" | "done";
  responsible: string[];
}

export interface LeaveDate {
  year: number;
  month: number;
  day: number;
}
export interface Leave {
  name: string;
  leave_dates: LeaveDate[];
}

export function fetchTasks(): Promise<ApiTask[]> {
  return getJSON<ApiTask[]>("/tasks");
}

export function fetchLeaves(): Promise<Leave[]> {
  return getJSON<Leave[]>("/leaves");
}

export function createTask(payload: {
  taskDescription: string;
  status: "todo" | "working" | "done";
  responsible: string[];
}): Promise<ApiTask | string> {
  return postJSON<ApiTask | string>("/tasks", payload);
}

export function updateTaskStatus(
  id: string,
  status: "todo" | "working" | "done"
): Promise<ApiTask | string> {
  return putJSON<ApiTask | string>(`/tasks/${id}`, { status });
}

export function deleteTask(id: string): Promise<unknown> {
  return deleteJSON<unknown>(`/tasks/${id}`);
}
