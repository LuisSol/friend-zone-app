import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { mkdir } from "fs/promises";
import { initializeDatabase } from "./dbInitializer";

type Schema = {
  users: Array<{
    id: string;
    name: string;
    profilePicture: string;
    friends: string[];
  }>;
  [key: string]: Record<string, unknown>[];
};

const defaultData: Schema = {
  users: [],
};

class Database {
  private db: Low<Schema>;
  private static instance: Database;

  private constructor() {
    const dbPath = path.join(process.cwd(), "data", "db.json");
    const adapter = new JSONFile<Schema>(dbPath);
    this.db = new Low(adapter, defaultData);
  }

  static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      Database.instance = new Database();
      const dataExists = !!(await mkdir(path.join(process.cwd(), "data"), {
        recursive: true,
      }));

      if (!dataExists) {
        console.log("Initializing db...");
        initializeDatabase();
      }

      await Database.instance.db.read();
    }
    return Database.instance;
  }

  async create<T extends keyof Schema>(
    collection: T,
    data: Omit<Schema[T][number], "id" | "createdAt">
  ): Promise<Schema[T][number]> {
    const item = {
      ...data,
    } as Schema[T][number];

    this.db.data[collection].push(item);
    await this.db.write();
    return item;
  }

  async findMany<T extends keyof Schema>(
    collection: T,
    query: Partial<Schema[T][number]> = {}
  ): Promise<Schema[T][number][]> {
    return this.db.data[collection].filter((item) =>
      Object.entries(query).every(([key, value]) => item[key] === value)
    );
  }

  async findOne<T extends keyof Schema>(
    collection: T,
    query: Partial<Schema[T][number]>
  ): Promise<Schema[T][number] | null> {
    const item = this.db.data[collection].find((item) =>
      Object.entries(query).every(([key, value]) => item[key] === value)
    );
    return item || null;
  }

  async update<T extends keyof Schema>(
    collection: T,
    query: Partial<Schema[T][number]>,
    update: Partial<Schema[T][number]>
  ): Promise<number> {
    let count = 0;
    this.db.data[collection] = this.db.data[collection].map(
      (item: Record<string, unknown>) => {
        if (
          Object.entries(query).every(([key, value]) => item[key] === value)
        ) {
          count++;
          return { ...item, ...update };
        }
        return item;
      }
    );
    await this.db.write();
    return count;
  }
}

export const getDb = Database.getInstance;
