import React from 'react';
import { styled } from '../../../../stitches.config';
import i18n from "@/i18n";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";
import PluginsView from '@/components/pluginsView';
import Text from '@/components/text';
import publicIcon from "../../../../assets/public.png";
import pendingIcon from "../../../../assets/pending.png";
import privateIcon from "../../../../assets/private.png";
import Image from "next/image";
import ImageResponsive from '@/components/ImageResponsive';

const Header = styled("header", {
    marginBottom: '1rem',
});

const Menu = styled("div", {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '0.28rem',
    marginBottom: '-0.28rem',
});

const StatusDescriptionContainer = styled("div", {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '5rem',
});

const StatusDescription = styled("div", {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});

const CreatePluginButton = styled("a", {
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid $tertiary',
    backgroundColor: 'green',
    fontStyle: 'bold',
    textDecoration: 'none',
    cursor: 'pointer',
});

const Dashboard = () => {
    return (
        <>
            <Topbar />
                <div className='page-wide'>
                    <Header>
                        <Text size='2' as={'h1'} >Dashboard</Text>
                    </Header>
                    <main style={{display: 'grid', width: '100%', height: '100%'}}>
                        <div>
                            <Text size='0'>Meus plugins</Text>
                            <Menu>
                                <StatusDescriptionContainer>
                                    <StatusDescription>
                                        <Text size='extraSmall'>Público: </Text>
                                        <ImageResponsive
                                            src={publicIcon}
                                            alt="Status"
                                            width={20}
                                            height={20}
                                            maxWidth={'0.35rem'}
                                            style={{
                                                filter: 'invert(50%) sepia(100%) saturate(500%) hue-rotate(200deg)'
                                            }}
                                        />
                                    </StatusDescription>
                                    <StatusDescription>
                                        <Text size='extraSmall'>Pendente: </Text>
                                        <ImageResponsive
                                            src={pendingIcon}
                                            alt="Status"
                                            width={20}
                                            height={20}
                                            maxWidth={'0.35rem'}
                                            style={{
                                                filter: 'invert(50%) sepia(100%) saturate(500%) hue-rotate(100deg)'
                                            }}
                                        />
                                    </StatusDescription>
                                    <StatusDescription>
                                        <Text size='extraSmall'>Privado: </Text>
                                        <ImageResponsive
                                            src={privateIcon}
                                            alt="Status"
                                            width={20}
                                            height={20}
                                            maxWidth={'0.35rem'}
                                            style={{
                                                filter: 'invert(50%) sepia(100%) saturate(500%) hue-rotate(0deg)'
                                            }}
                                        />
                                    </StatusDescription>
                                </StatusDescriptionContainer>
                                <CreatePluginButton href='/editPlugin '>
                                    <Text size='extraSmall' style={{
                                        fontFamily: 'var(--font-geist-sans)',
                                    }}>Novo plugin</Text>
                                </CreatePluginButton>
                            </Menu>
                        </div>
                        <PluginsView/>
                    </main>
                </div>
            <Footer />
        </>
    );
};

export default Dashboard;