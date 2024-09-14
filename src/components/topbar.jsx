import React from "react";
import Image from 'next/image';
import { styled } from "../../stitches.config";
import logo from "../../assets/logo.png";
import {account} from "../../i18n/pt-BR.json"

const TopbarStyled = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px",
    backgroundColor: "rgba(1, 1, 12, 0.6)", 
    color: "$primary",
    borderBottom: "1px solid $tertiary",
    position: "fixed",
    top: 0,
    width: "100%",
    height: "80px",
    backdropFilter: "blur(10px)", 
    zIndex: 1000,

    '@media (max-width: 768px)': {
        padding: "10px",
        height: "60px",
    },
});

const TopNavText = styled("a", {
    fontSize: "$0",
    fontWeight: "bold",
    fontFamily: "var(--font-geist-mono)",
    color: "$secondary",
    margin: 0,
});

async function isLogged() {
    // Check if user is logged in
    return false;
}

const Topbar = () => {
    return (
        <TopbarStyled>
            <div style={{
                maxWidth: "0.8rem",
            }}>
                <Image src={logo} alt="nightsky icon" width={50} height={50} layout="responsive" />
            </div>
            <nav style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
            }}>
                <TopNavText 
                    href="#"
                >Plugins</TopNavText>

                <TopNavText
                    href="#"
                >Dashboard</TopNavText>

                <TopNavText
                    href={isLogged() ? "#" : "/#login"}
                >{!isLogged() ? account : "Login"}</TopNavText> 
            </nav>
        </TopbarStyled>
    );
};

export default Topbar;