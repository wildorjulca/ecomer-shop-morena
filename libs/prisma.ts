// import "dotenv/config";
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
    host: "localhost",
    user: "root",
    password: "wildor",
    database: "shop_morena",
    connectionLimit: 5
});

// const adapter = new PrismaMariaDb({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   connectionLimit: 5,
//   port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
// });
const prisma = new PrismaClient({ adapter });

export { prisma }