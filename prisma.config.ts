
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
     seed: "tsx ./seed/seed-database.ts"
    // seed: "tsx ./seed/seed-database.ts"
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});