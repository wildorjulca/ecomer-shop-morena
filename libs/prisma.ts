// import "dotenv/config";
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

// const adapter = new PrismaMariaDb({
//     host: "localhost",
//     user: "root",
//     password: "wildor",
//     database: "shop_morena",
//     connectionLimit: 5
// });




// const adapter = new PrismaMariaDb({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     connectionLimit: 5,
//     port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
// });

// const adapter = new PrismaMariaDb({
//     host: process.env.DATABASE_HOST!,
//     user: process.env.DATABASE_USER!,
//     password: process.env.DATABASE_PASSWORD!,
//     database: process.env.DATABASE_NAME!,
//     port: Number(process.env.DATABASE_PORT ?? 3306),
//     connectionLimit: 5,
// });

// DATABASE_HOST=altaria.proxy.rlwy.net
// DATABASE_PORT=43249
// DATABASE_USER=root
// DATABASE_PASSWORD=LfnPygxpSgIOGPhxFfPlPRfZGZspkrSA
// DATABASE_NAME=railway

// const adapter = new PrismaMariaDb({
//     host: "altaria.proxy.rlwy.net",
//     user: "root",
//     password: "LfnPygxpSgIOGPhxFfPlPRfZGZspkrSA",
//     database: "railway",
//     port: 43249,
//     // connectionLimit: 5,
// });

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  port: Number(process.env.DATABASE_PORT ?? 3306),

//  connectionLimit: 5,
  acquireTimeout: 10000,
  connectTimeout: 10000,
});

const prisma = new PrismaClient({ adapter });

export { prisma }