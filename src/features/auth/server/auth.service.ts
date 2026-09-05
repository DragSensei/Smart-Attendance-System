import { createSuccessResponse, createErrorResponse, type ApiResponse } from "@/shared/server/api";
import { type LoginCredentials, type AuthSession, validateCredentials } from "../schemas/auth.schema";

export async function login(credentials: LoginCredentials): Promise<ApiResponse<AuthSession>> {
  if (!validateCredentials(credentials)) {
    return createErrorResponse("Invalid email or password format");
  }

  const session: AuthSession = {
    token: `jwt_${Math.random().toString(36).substring(2)}`,
    userId: "usr_sample",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };

  return createSuccessResponse(session);
}

export async function logout(): Promise<ApiResponse<{ loggedOut: boolean }>> {
  return createSuccessResponse({ loggedOut: true });
}
