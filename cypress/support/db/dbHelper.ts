import sql from 'mssql';
import { dbConfig } from './dbConfig';

export class DatabaseHelper {
  private static pool: sql.ConnectionPool | null = null;

  static async connect(): Promise<sql.ConnectionPool> {
    if (!this.pool) {
      this.pool = await sql.connect(dbConfig);
    }
    return this.pool;
  }

  static async executeQuery(query: string): Promise<any> {
    const pool = await this.connect();
    const result = await pool.request().query(query);
    return result.recordset;
  }

  static async executeStoredProcedure(
    procedureName: string,
    params?: { name: string; type: any; value: any }[]
  ): Promise<any> {
    const pool = await this.connect();
    const request = pool.request();

    if (params) {
      params.forEach(param => {
        request.input(param.name, param.type, param.value);
      });
    }

    const result = await request.execute(procedureName);
    return result.recordset;
  }

  static async closeConnection(): Promise<void> {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
    }
  }
}
