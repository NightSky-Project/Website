import { styled } from "../../stitches.config";
import { NightSky, homeSubtitle, knowMore } from "../../i18n/pt-BR.json";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";
import BlinkingCursor from "@/components/blinkingCursor";
import GradientButton from "@/components/gradientButton";
import GlowEffect from "@/components/glowEffect";
import Stars from "@/components/stars";


const Header = styled("header", {
    padding: "1rem",
    color: '$primary',
});

const Text = styled("p", {
    color: '$primary',
    fontFamily: 'var(--font-geist-mono)',
    variants: {
        size: {
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
    },
});

const GradientText = styled(Text, {
    background: 'linear-gradient(130deg, #f6bf75, #d77185, #8766ac, #4150b1)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    width: 'fit-content',
});


export default function Home() {
    return (
        <>
            <Topbar />
            <Stars />
            <div className="page">
                <Header>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.3rem'}}>
                        
                        <GradientText size="3" as={'h1'}>{NightSky}<BlinkingCursor>_</BlinkingCursor></GradientText>
                    </div>
                    <Text size="0">{homeSubtitle}</Text>
                </Header>
                <main style={{display: 'grid', width: '100%', justifyContent: 'center'}}>
                    <div style={{marginTop: '1rem'}}>
                        <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: '-0.5rem'}}>
                            <GlowEffect color={'purple'} size={100} relative={true} position={{top:5, left:0}}/>
                        </div>
                        <GradientButton
                            href={'https://github.com/NightSky-Project'}
                        >{knowMore}</GradientButton>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}
