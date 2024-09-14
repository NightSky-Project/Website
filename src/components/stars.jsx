import React from "react";
import { styled } from "../../stitches.config";
const Star = styled('div', {
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: 'white',
    opacity: '0.5',
    zIndex: -2,
});

const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 3;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        stars.push(
            <Star
                key={i}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${top}%`,
                    left: `${left}%`,
                }}
            />
        );
    }
    return stars;
};

const Stars = () => {
    return <div style={{ position: 'absolute', width: '100vw', height: '100vh', overflow: 'hidden' }}>{generateStars(200)}</div>;
};

export default Stars;