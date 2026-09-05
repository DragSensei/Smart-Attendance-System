/**
 * Base server error and response helper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

export function createErrorResponse(message: string): ApiResponse<never> {
  return {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  };
}
