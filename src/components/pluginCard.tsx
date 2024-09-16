'use client';
import React from "react";
import { styled } from "../../stitches.config";
import i18n from "@/i18n";
import Plugin from "@/types/Plugin";
import Text from "./text";
import publicIcon from "../../assets/public.png";
import pendingIcon from "../../assets/pending.png";
import privateIcon from "../../assets/private.png";
import Image from "next/image";
import ImageResponsive from "./ImageResponsive";

const Card = styled("div", {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '2rem',
    padding: '10px',
    background: '$surface',
    color: '$primary',
    borderRadius: '5px',
    border: '1px solid $tertiary',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
        boxShadow: '0 0 2px 1px $colors$secondary',
    }
});

const SpacedDiv = styled("div", {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
});

const PluginCard = ({plugin}: {plugin: Plugin}) => {
    return (
        <Card onClick={() => window.open(`/editPlugin/${plugin.plugin_id}`, '_self')}>
            <div style={{width: '100%'}}>
                <SpacedDiv>
                    <Text size='0'>{plugin.plugin_name}</Text>
                    <ImageResponsive
                        src={plugin.status === 1 ? publicIcon : plugin.status === 2 ? pendingIcon : privateIcon}
                        alt="Status"
                        width={20}
                        height={20}
                        maxWidth={'0.4rem'}
                        style={{
                            filter: plugin.status === 1
                                ? 'invert(50%) sepia(100%) saturate(500%) hue-rotate(200deg)'
                                : plugin.status === 2
                                ? 'invert(50%) sepia(100%) saturate(500%) hue-rotate(100deg)'
                                : 'invert(50%) sepia(100%) saturate(500%) hue-rotate(0deg)'
                        }}
                    />
                </SpacedDiv>
                <Text size='extraSmall' colors="secondary">{plugin.downloads} downloads</Text>
            </div>
            <SpacedDiv>
                <Text size='extraSmall'>{new Date(plugin.created_at).toLocaleDateString('pt-BR')}</Text>
                <Text size='extraSmall'>version {plugin.version}</Text>
            </SpacedDiv>
        </Card>
    );
}

export default PluginCard;