import React from "react";
import { styled } from "../../../../stitches.config";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";
import SignInButton from "@/components/signInButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";
import i18n from "@/i18n";
import Text from "@/components/text";

const Header = styled("header", {
    padding: "1rem",
    color: '$primary',
});

const LoginContainer = styled("div", {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
    marginBottom: '2rem',
});

const DescriptionContainer = styled("div", {

});

const Login = () => {
    getServerSession(options).then((session) => {
        if (session) {
            redirect("/dashboard");
        }
    });


    return (
        <>
            <Topbar />
            <div className="page">
                <Header>
                    <Text size={2}>{i18n["LoginWithGitHub"]}</Text>
                    <DescriptionContainer>
                        <Text size={0}>{i18n["LoginDescription"]}</Text>
                        <Text size={0} >{i18n["LoginDescription2"]}</Text>
                    </DescriptionContainer>
                </Header>
                <main style={{display: 'grid', width: '100%'}}>
                    <LoginContainer>
                        <SignInButton />
                    </LoginContainer>
                    {/* <DescriptionContainer style={{
                        padding: '1rem',
                    }}>
                        <Text size={'extraSmall'} colors={'primary'}>{i18n["Terms"]}</Text>
                        <Text size={'extraSmall'} colors={'primary'}>{i18n["Terms2"]}</Text>
                    </DescriptionContainer> */}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Login;
