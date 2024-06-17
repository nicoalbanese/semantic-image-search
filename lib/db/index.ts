// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
//
// export const client = postgres(process.env.DATABASE_URL!);
// export const db = drizzle(client);

import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const db = drizzle(sql);
