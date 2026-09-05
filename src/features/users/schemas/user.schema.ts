export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: "admin" | "manager" | "employee";
  createdAt: string;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
