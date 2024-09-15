import React from "react";
import Image from 'next/image';
import { styled } from "../../stitches.config";
import logo from "../../assets/logo.png";
import accountIcon from "../../assets/account-avatar.svg";

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
        padding: "15px",
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


const Topbar = () => {
    return (
        <TopbarStyled>
            <a href="/" style={{
                maxWidth: "0.9rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Image src={logo} alt="nightsky icon" width={50} height={50} layout="responsive" />
            </a>
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

                <a href="/api/auth" style={{
                    display: "flex",
                    maxWidth: "0.9rem",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "0.5rem",
                    borderRadius: "50%",
                    // backgroundColor: "rgba(255, 255, 255, 0.04)",
                    padding: "0.1rem",
                }}>
                    <Image src={accountIcon} alt="account icon" width={50} height={50} layout="responsive" />
                </a>
                
            </nav>
        </TopbarStyled>
    );
};

export default Topbar;