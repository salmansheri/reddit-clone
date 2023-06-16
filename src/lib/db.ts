import { PrismaClient } from '@prisma/client'; 
import "server-only"; 

declare global {
    var client: PrismaClient | undefined; 
}

const prisma = globalThis.client || new PrismaClient(); 

if(process.env.NODE_ENV !== "production") global.client = prisma

export default prisma; 