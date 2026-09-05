export interface LoginCredentials {
  email: string;
  passwordHash: string;
}

export interface AuthSession {
  token: string;
  userId: string;
  expiresAt: string;
}

export function validateCredentials(creds: unknown): creds is LoginCredentials {
  if (typeof creds !== "object" || creds === null) return false;
  const c = creds as Record<string, unknown>;
  return typeof c.email === "string" && typeof c.passwordHash === "string";
}
