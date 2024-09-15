import colors from '@/theme/colors';
import { createStitches } from '@stitches/react';

export const { styled, getCssText } = createStitches({
    theme: {
        colors: {
            primary: colors.primary,
            secondary: colors.secondary,
            tertiary: colors.tertiary,
            surface: colors.surface,
            background: colors.background,
            backgroundTransparent: colors.backgroundTransparent,
            foreground: colors.foreground,
        },
        fontSizes: {
            extraSmall: '0.22rem',
            small: '0.25rem',
            0: '0.3rem',
            1: '0.45rem',
            2: '0.65rem', 
            3: '1rem', 
        },
    },
});
