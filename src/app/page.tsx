import { styled } from "../../stitches.config";
import i18n from "@/i18n";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";
import BlinkingCursor from "@/components/blinkingCursor";
import GradientButton from "@/components/gradientButton";
import GlowEffect from "@/components/glowEffect";
import Stars from "@/components/stars";
import GearAnimated from "@/components/gearAnimated";
import KnowMoreDiv from "@/components/knowMoreDiv";
import Text from "@/components/text";


const Header = styled("header", {
    padding: "1rem",
    color: '$primary',

});

const DescriptionContainer = styled("div", {
    paddingLeft: '1rem',
    marginTop: '-0.5rem',
});


const GradientText = styled(Text, {
    background: 'linear-gradient(130deg, #f6bf75, #d77185, #8766ac, #4150b1)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    width: 'fit-content',
});

const KnowMoreText = styled(Text, {
    color: '$secondary',
    fontSize: '$0',
});

const Section = styled("section", {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: '2rem',
});

export default function Home() {

    return (
        <>
            <Topbar />
            <Stars />
            <div className="page">
                <Header>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.3rem'}}>
                        
                        <GradientText size="3" as={'h1'}>{i18n['NightSky']}<BlinkingCursor>_</BlinkingCursor></GradientText>
                    </div>
                    <Text size="0">{i18n['homeSubtitle']}</Text>
                </Header>
                <main style={{display: 'grid', width: '100%'}}>
                    <div style={{marginTop: '2rem'}}>
                        <KnowMoreDiv style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            minHeight: '1rem',
                            minWidth: '1rem',
                            borderRadius: '999px', 
                        }}>
                            <KnowMoreText>{i18n['knowMore']}</KnowMoreText>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#8aa6ff" className="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 11.354a.5.5 0 0 0 .708 0l4-4a.5.5 0 1 0-.708-.708L8 10.293 4.354 6.646a.5.5 0 1 0-.708.708l4 4z"/>
                            </svg>
                        </KnowMoreDiv>
                    </div>
                    <Section style={{marginTop: "6rem"}}  id="plugins">
                        <Header>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <GearAnimated width={'0.8rem'}/>
                                <Text size="2" colors="secondary" as={'h2'} style={{
                                    marginLeft: '0.3rem',
                                }}>Plugins</Text>
                            </div>
                        </Header>
                        <DescriptionContainer>
                            <Text size="0">{i18n['pluginsDescription']}</Text>
                        </DescriptionContainer>
                    </Section>
                    <Section>
                        <Header>
                            <Text size="2" colors="secondary" as={'h2'}>🎨{i18n['personalization']}</Text>
                        </Header>
                        <DescriptionContainer>
                            <Text size="0">{i18n['personalizationDescription']}</Text>
                            <Text size="0">{i18n['personalizationDescription2']}</Text>
                        </DescriptionContainer>
                    </Section>
                    <Section>
                        <Header>
                            <Text size="2" colors="secondary" as={'h2'}>🔒{i18n['security']}</Text>
                        </Header>
                        <DescriptionContainer>
                            <Text size="0">{i18n['securityDescription']}</Text>
                            <Text size="0">{i18n['securityDescription2']}</Text>
                        </DescriptionContainer>
                    </Section>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '4rem',
                    }}>
                        <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: '-0.3rem'}}>
                            <GlowEffect color={'purple'} size={2} relative={true} position={{top:5, left:0}}/>
                        </div> 
                        <GradientButton
                            href={'#'}      
                            enabled={false}
                        >
                            {i18n["downloadNow"]}
                        </GradientButton>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}
