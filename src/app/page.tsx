import { styled } from "../../stitches.config";

const Header = styled("header", {
    padding: "1rem",
    color: '$primary',
});

const Text = styled("p", {
    color: '$primary',
    fontFamily: 'var(--font-geist-mono)',
    variants: {
        size: {
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
    },
});

export default function Home() {
    return (
        <div className="page">
            <Header>
                <Text size="3" as={'h1'}>Hello World</Text>
            </Header>
        </div>
    );
}
