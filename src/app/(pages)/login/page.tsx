import React from "react";
import { styled } from "../../../../stitches.config";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";
import githubLogo from "../../../../assets/github-mark-white.svg";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";
import SignInButton from "@/components/signInButton";

const Header = styled("header", {
    padding: "1rem",
    color: '$primary',
});

const Text = styled("p", {
    color: '$primary',
    fontFamily: 'var(--font-geist-mono)',
    variants: {
        size: {
            0: {
                fontSize: '$0',
            },
            1: {
                fontSize: '$1',
            },
            2: {
                fontSize: '$2',
            },
            3: {
                fontSize: '$3',
            },
        },
        colors: {
            primary: {
                color: '$primary',
            },
            secondary: {
                color: '$secondary',
            }
        },
    },
});

const LoginContainer = styled("div", {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
});

const Login = async () => {
    const session = await getServerSession(options);
    if (session) {
        redirect("/profile");
    }
    return (
        <>
            <Topbar />
            <Header>
                <Text size={2}>Login with GitHub</Text>
            </Header>
                <LoginContainer>
                    <SignInButton />
                </LoginContainer>
            <Footer />
        </>
    );
};

export default Login;
