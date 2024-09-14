import GitHubProvider from "next-auth/providers/github";
import type { AuthOptions } from "next-auth";

export const options: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        })
    ],
    pages: {
        signIn: "/login",
        signOut: "/logout",
    },
};