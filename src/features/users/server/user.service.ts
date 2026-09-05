import { db } from "@/shared/drizzle/db";
import { createSuccessResponse, createErrorResponse, type ApiResponse } from "@/shared/server/api";
import { type User, isValidEmail } from "../schemas/user.schema";

export async function getUserById(id: string): Promise<ApiResponse<User>> {
  await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return createSuccessResponse({
    id,
    name: "Sample Employee",
    email: "employee@wajha.com",
    department: "Engineering",
    role: "employee",
    createdAt: new Date().toISOString(),
  });
}

export async function createUser(data: Omit<User, "id" | "createdAt">): Promise<ApiResponse<User>> {
  if (!isValidEmail(data.email)) {
    return createErrorResponse("Invalid user email address");
  }

  const newUser: User = {
    ...data,
    id: `usr_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  await db.query("INSERT INTO users (id, name, email, department, role) VALUES (?, ?, ?, ?, ?)", [
    newUser.id,
    newUser.name,
    newUser.email,
    newUser.department,
    newUser.role,
  ]);

  return createSuccessResponse(newUser);
}
