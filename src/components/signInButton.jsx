"use client";
import { signIn } from "next-auth/react";
import { styled } from "../../stitches.config";
import githubLogo from "../../assets/github-mark-white.svg";
import Image from "next/image";


const Button = styled("button", {
    backgroundColor: "transparent",
    fontSize: "$1",
    color: "$white",
    padding: "10px 20px",
    borderRadius: "50px",
    border: "1px solid $tertiary",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "&:hover": {
        backgroundColor: "$surface",
    },
});


const SignInButton = () => {
    return (
        <Button onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
            <div style={{
                maxWidth: "0.6rem",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
            }}>
                <Image src={githubLogo} alt="GitHub Logo" width={20} height={20} layout="responsive" />
            </div>
            Sign in with GitHub
        </Button>
    );
};

export default SignInButton;