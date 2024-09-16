
import Security from "../../../../utils/security.ts";
import type { AuthOptions, Session } from "next-auth";
import type { GithubProfile, GithubEmail } from "next-auth/providers/github";
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";
import axios from 'axios';

const API_URL = process.env.API_URL || "http://localhost:8001";

function Github<P extends GithubProfile>(
    options: OAuthUserConfig<P>
    ): OAuthConfig<P> {
        return {
            id: "github",
            name: "GitHub",
            type: "oauth",
            authorization: {
                url: "https://github.com/login/oauth/authorize",
                params: { scope: "read:user user:email public_repo" },
            },
            token: "https://github.com/login/oauth/access_token",
            userinfo: {
                url: "https://api.github.com/user",
                async request({ client, tokens }) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const profile = await client.userinfo(tokens.access_token!)
            
                    if (!profile.email) {
                        // If the user does not have a public email, get another via the GitHub API
                        // See https://docs.github.com/en/rest/users/emails#list-public-email-addresses-for-the-authenticated-user
                        const res = await fetch("https://api.github.com/user/emails", {
                            headers: { Authorization: `token ${tokens.access_token}` },
                        })
            
                        if (res.ok) {
                            const emails: GithubEmail[] = await res.json()
                            profile.email = (emails.find((e) => e.primary) ?? emails[0]).email
                        }
                    }
            
                    return profile
                },
            },
            profile(profile: GithubProfile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name ?? profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                }
            },
            style: { logo: "/github.svg", bg: "#24292f", text: "#fff" },
            options,
        }
    }

async function checkUser(hash: string): Promise<boolean> {
    try {
        const response = await axios.get(`${API_URL}/auth/account`, {
            params: { github_access_token: hash },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status == 200) {
            return true;
        }
        if(response.status == 404) {
            return false;
        }

        const userExists = response.data.exists;
        return userExists;
    } catch (error) {
        return false;
    }
}

async function createAccount(github_access_token: string, name: string): Promise<boolean> {
    try {
        const response = await axios.post(`${API_URL}/auth/account`, {
            github_access_token,
            name,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 201) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}

declare module "next-auth" {
    interface Session {
        Awaitable: boolean;
        accessToken?: string;
    }
    interface signIn {
        accessToken?: string;
    }
    interface User {
        accessToken?: string;
    }
}

export const options: AuthOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: "/api/auth",
        signOut: "/logout",
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                const security = new Security();
                const hash = account.access_token ? security.encrypt(account.access_token) : '';
                token.accessToken = hash;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && token.accessToken) {
                if (typeof token.accessToken === 'string') {
                    session.accessToken = token.accessToken;
                }
            }
            return session;
        },
        async signIn({ account, user }) {
            if (account && account.provider === "github") {
                const { access_token } = account;
                const security = new Security();
                let hash = '';
                if (access_token) {
                    hash = security.encrypt(access_token);
                } else {
                    console.error("Access token is undefined");
                    return false;
                }

                // Check if user exists in the backend
                const userExists = await checkUser(hash);
                if (userExists) {
                    return true;
                }

                // Create user in the backend
                const { name } = user;
                let sucess = false;
                if (name) {
                    sucess = await createAccount(hash, name);
                } else {
                    console.error("User name is undefined");
                    return false;
                }

                if (!sucess) {
                    throw new Error("Error creating user");
                }
                return true;
            }
            return false;
        },
    }
};