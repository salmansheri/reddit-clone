import { AuthOptions } from "next-auth";
import prisma from "./db";
import { PrismaAdapter } from '@auth/prisma-adapter'; 
import GithubProvider from 'next-auth/providers/github'; 
import { nanoid } from 'nanoid'; 

const authOptions: AuthOptions = {
    // @ts-ignore
    adapter: PrismaAdapter(prisma), 
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!, 
            clientSecret: process.env.GITHUB_SECRET_KEY!, 

        })

    ], 
    session: {
        strategy: 'jwt', 
    }, 
    pages: {
        signIn: "/sign-in", 
    }, 
    callbacks: {
        async session({ token, session }) {
            if(token) {
                // @ts-ignore
                session.user.id = token.id; 
                 // @ts-ignore
                session.user.name = token.name; 
                 // @ts-ignore
                session.user.email = token.email; 
                 // @ts-ignore
                session.user.image = token.picture;
                 // @ts-ignore
                session.user.username = token.username 

            }

            return session; 
        },
        // @ts-ignore 
        async jwt({ token, user }) {
            const dbUser  = await prisma.user.findFirst({
                where: {
                    email: token.email, 
                }, 

            }); 

            if(!dbUser) {
                token.id = user!.id
                return token
            }

            if(!dbUser.username) {
                await prisma.user.update({
                    where: {
                        id: dbUser.id

                    }, 
                    data: {
                        username: nanoid(10), 
                    }
                })
            }

            return {
                id: dbUser.id, 
                name: dbUser.name,
                email: dbUser.email, 
                username: dbUser.username, 
                image: dbUser.image, 
            }

            
        }, 
        redirect() {
            return "/"
        }
    }
    
    
}

export default authOptions; 