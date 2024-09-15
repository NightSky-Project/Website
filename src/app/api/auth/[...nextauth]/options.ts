
import Security from "../../../../utils/security.ts";
import type { AuthOptions } from "next-auth";
import type { GithubProfile, GithubEmail } from "next-auth/providers/github";
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

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
        async signIn({account }) {
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
        
                try {
                    const response = await fetch('http://localhost:8000/api/save-github-user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            github_access_token: hash,
                        }),
                    });
            
                    if (!response.ok) {
                        console.error("Erro ao enviar dados para o backend:", response.statusText);
                        return false;
                    }
            
                    return true;
                } catch (error) {
                    console.error("Erro ao salvar usuário no backend:", error);
                    return false;
                }
            }
            return false;
        },
    }
};