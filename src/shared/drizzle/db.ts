/**
 * Global database client setup (e.g. Drizzle ORM)
 */
export interface DatabaseClient {
  query: (sql: string, params?: unknown[]) => Promise<unknown[]>;
}

export const db: DatabaseClient = {
  async query(sql: string, params: unknown[] = []) {
    // Simulated DB query runner
    return [{ executed: sql, params }];
  },
};
