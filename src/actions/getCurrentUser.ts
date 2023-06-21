import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export default async function getCurrentUser() {
    try {
        const session = await getServerSession(authOptions); 

        if(!session?.user?.email) {
            throw new Error("Authentication error")
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email, 
            }
        }); 

        return currentUser; 
        
    } catch (error) {
        console.log(error); 
        return null; 
        
    }
}