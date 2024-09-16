'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from "../../stitches.config";
import i18n from "@/i18n";
import { fetchStorePlugins } from "@/services/pluginsApi";
import { Session } from 'next-auth';
import getSession from '@/utils/getSession';


const PluginsView = () => {
    const [plugins, setPlugins] = useState([]);
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
            setPlugins(data);
            setLoading(false);
        });
    }, [token]);

    return (
        <div></div>
    );
}

export default PluginsView;