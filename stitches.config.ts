import colors from '@/theme/colors';
import { createStitches } from '@stitches/react';

export const { styled, getCssText } = createStitches({
    theme: {
        colors: {
            primary: colors.primary,
            secondary: colors.secondary,
            tertiary: colors.tertiary,
            background: colors.background,
            foreground: colors.foreground,
        },
        fontSizes: {
            1: '0.75rem',
            2: '0.875rem', 
            3: '1rem', 
        },
    },
});
