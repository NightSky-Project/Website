import React from "react";
import { styled } from "../../stitches.config";

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

const Footer = () => {
    return (
        <FooterStyled>
            <p>Footer</p>
        </FooterStyled>
    );
};

export default Footer;