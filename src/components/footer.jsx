import React from "react";
import { styled } from "../../stitches.config";
import {createdBy} from "../../i18n/pt-BR.json";
import Image from "next/image";
import githubLogo from "../../assets/github-mark-white.svg";

const width = typeof window !== "undefined" ? window.screen.width : 1024;

const FooterStyled = styled("footer", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "transparent",
    color: "$primary",
    borderTop: "1px solid $tertiary",
    width: "100%",
    height: "80px",
    zIndex: 1000,
    marginTop: "auto",

    '@media (max-width: 768px)': {
        padding: "10px",
        height: "60px",
    },
});

const Text = styled("p", {
    fontSize: "$small",
    fontWeight: "bold",
    fontFamily: "var(--font-geist-mono)",
    color: "$secondary",
    margin: 0,
    '@media (max-width: 768px)': {
        fontSize: "$0",
    },
});

const Footer = () => {
    return (
        <FooterStyled>
            <Text>
                {createdBy}
            </Text>
            <a href="www.github.com/Rafael-BD" target="_blank" rel="noreferrer"
                style={{
                    marginLeft: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    maxWidth: "0.45rem",
                }}
            >
                <Image src={githubLogo} width={20} height={20} alt="github logo" layout="responsive"/>
            </a>
        </FooterStyled>
    );
};

export default Footer;