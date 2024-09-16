import React from "react";
import Image from 'next/image';


const ImageResponsive = ({ src, alt, width, height, maxWidth, ...props }) => {
    return (
        <div 
            {...props}
            style={{
                maxWidth: maxWidth,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...props.style
            }}
            >
            <Image src={src} alt={alt} width={width} height={height} layout="responsive" />
        </div>
    )
}

export default ImageResponsive;