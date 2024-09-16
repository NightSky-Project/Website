import { styled } from "../../stitches.config";

const Text = styled("p", {
    color: '$primary',
    fontFamily: 'var(--font-geist-mono)',
    variants: {
        size: {
            extraSmall: {
                fontSize: '$extraSmall',
            },
            small: {
                fontSize: '$small',
            },
            0: {
                fontSize: '$0',
            },
            1: {
                fontSize: '$1',
            },
            2: {
                fontSize: '$2',
            },
            3: {
                fontSize: '$3',
            },
        },
        colors: {
            primary: {
                color: '$primary',
            },
            secondary: {
                color: '$secondary',
            }
        },
    },
});

export default Text;