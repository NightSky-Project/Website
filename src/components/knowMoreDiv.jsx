'use client';
import React from 'react';

export default function KnowMoreDiv({ children, ...props}) {
    function scrollToElement() {
        const element = document.getElementById('plugins');
        if (element) {
            const offset = 50;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    return (
        <div {...props} onClick={scrollToElement}>
            {children}
        </div>
    );
}