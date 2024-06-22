import NextAuth, { DefaultSession } from 'next-auth';


declare module 'next-auth' {
    export interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified?: boolean;
            role: string;
            image?: string;
        } & DefaultSession['user'];
    }
}