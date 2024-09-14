import React from "react";
import Image from 'next/image';
import { styled } from "../../stitches.config";
import logo from "../../assets/logo.png";

const TopbarStyled = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "rgba(26, 26, 30, 0.6)", 
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

const Topbar = () => {
    return (
        <TopbarStyled>
            <Image src={logo} alt="nightsky icon" width={50} height={50} />
            <button>Harburguer btn</button>  
        </TopbarStyled>
    );
};

export default Topbar;