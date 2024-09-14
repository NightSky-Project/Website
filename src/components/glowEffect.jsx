import React from 'react';
import { styled } from '../../stitches.config';
import { css } from '@stitches/react';

const dynamicBoxShadow = css({
    variants: {
        color: {
            purple: {},
            red: {},
            golden: {},
        },
    },
});

const GlowBox = styled('div', {
    transition: 'box-shadow 0.3s ease',
    width: '0.1px',
    height: '0.1px',
    borderRadius: '75%',
    zIndex: -1,
    boxSize: 'border-box',
    variants: {
        color: {
            purple: {},
            red: {},
            golden: {},
        },
    },
    defaultVariants: {
        color: 'purple',
    },
});

const GlowEffect = ({ color, position, size, relative }) => {
    const boxShadowStyle = {
        boxShadow: `0 0 ${size || 300}px ${size || 300}px ${
            color === 'red' ? 'rgba(255, 0, 0, 0.342)' :
            color === 'golden' ? 'rgba(255, 215, 0, 0.342)' :
            'rgba(71, 64, 133, 0.342)'
        }`,
        top: `${position.top || 0}`,
        left: `${position.left || 0}`,
        position: relative ? 'relative' : 'absolute',
    };

    return (
        <GlowBox className={dynamicBoxShadow({ color })} style={boxShadowStyle} />
    );
};

export default GlowEffect;
