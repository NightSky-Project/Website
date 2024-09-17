'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from "../../stitches.config";
import i18n from "@/i18n";
import { fetchStorePlugins } from "@/services/pluginsApi";
import getSession from '@/utils/getSession';
import {Plugin} from '@/types/Plugin';
import genFakePluginData from '@/utils/genFakePluginData';
import PluginCard from './pluginCard';

const Grid = styled("div", {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '0.5rem',
    marginTop: '0.5rem',
    borderRadius: '10px',
    padding: '0.2rem',
    paddingBottom: '3rem',
    border: '1px solid $tertiary',
    width: '100%',
    height: '100%',
    backgroundColor: '$foreground',
    alignContent: 'start',

    '@media (max-width: 600px)': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    },
});

const PluginsView = () => {
    const [plugins, setPlugins] = useState([] as Plugin[]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');

    useEffect(() => {
        const getServerSession = async () => {
            const session = await getSession().then((session) => {
                return session;
            });
            if(session?.accessToken) {
                setToken(session.accessToken);
            }
        }
        getServerSession();
    }, []);

    useEffect(() => {
        if(token === '') return;
        fetchStorePlugins(token).then((data) => {
            if(data.length > 0) {
                setPlugins(data);
            }
            else{
                const fakePlugins = genFakePluginData(10); // Dev only
                setPlugins(fakePlugins);
            }
            setLoading(false);
        });
    }, [token]);

    if(loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            </div>
        )
    }

    return (
        <Grid>
            {plugins.map((plugin) => (
                <div key={plugin.plugin_id}>
                    <PluginCard plugin={plugin}/>
                </div>
            ))}
        </Grid>
    );
}

export default PluginsView;