import React from 'react';
import { styled } from '../../../../stitches.config';
import i18n from "@/i18n";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";
import PluginsView from '@/components/pluginsView';

const Header = styled("header", {
    marginBottom: '1rem',
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


const Dashboard = () => {
    return (
        <>
            <Topbar />
                <div className='page-wide'>
                    <Header>
                        <Text size='3' as={'h1'} >Dashboard</Text>
                    </Header>
                    <main style={{display: 'grid', width: '100%'}}>
                        <div>
                            <Text size='1'>Meus plugins</Text>
                        </div>
                        <div>
                            <PluginsView/>
                        </div>
                    </main>
                </div>
            <Footer />
        </>
    );
};

export default Dashboard;