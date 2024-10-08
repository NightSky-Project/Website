import React from "react";
import { styled } from "../../stitches.config";

const Star = styled('div', {
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: 'white',
    opacity: '0.5',
    zIndex: -2,
    pointerEvents: 'none',
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
    return <div 
    style={{ position: 'fixed', width: '100vw', minHeight: '100vh', height: '100%', overflow: 'hidden', left: 0, bottom: 0, top: 0, pointerEvents: 'none', zIndex: -2 }}>
        {generateStars(100)}
    </div>;
};

export default Stars;