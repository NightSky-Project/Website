'use client';
import React from 'react';
import { styled } from '../../stitches.config';
import { keyframes } from '@stitches/react';

const BlinkingStyle = styled('span', {
    animation: `${keyframes({
        '0%': { opacity: 0 },
        '50%': { opacity: 1 },
    })} 1s step-end infinite`,
});

const BlinkingCursor = ({ children }) => {
    return <BlinkingStyle>{children}</BlinkingStyle>;
};

export default BlinkingCursor;