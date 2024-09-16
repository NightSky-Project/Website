'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Text from '@/components/text';
import { useParams } from 'next/navigation';
import { styled } from '../../../../stitches.config';
import Topbar from '@/components/topbar';
import Footer from '@/components/footer';
import { fetchCategories } from '@/services/pluginsApi';

const Header = styled("header", {
    marginBottom: '1rem',
});

const Form = styled("form", {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.2rem',
    paddingInline: '1rem',
    borderRadius: '10px',
    border: '1px solid $tertiary',
    paddingInlineEnd: '3rem',
    paddingInlineStart: '3rem',
    paddingBlockStart: '1rem',
    paddingBlockEnd: '5rem',
});

const Input = styled("input", {
    padding: '0.2rem',
    borderRadius: '5px',
    border: '1px solid $tertiary',
    backgroundColor: '$foreground',
    color: '$primary',
    fontSize: '$0',
    variants: {
        size: {
            '1': {
                width: '100%',
            },
            '2': {
                width: '75%',
            },
            '3': {
                width: '50%',
            },
            '4': {
                width: '25%',
            },
        },
    },
});


const CreatePlugin = () => {
    const {id} = useParams();
    const [categories, setCategories] = React.useState<string[]>([]);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    return (
        <>
            <Topbar />
                <div className='page-wide'>
                    <Header>
                        <Text size='2' as={'h1'} >Create Plugin</Text>
                    </Header>
                    <main style={{display: 'grid', width: '100%', height: '100%', alignContent: 'center'}}>
                        <Form>
                            <Input size={1} placeholder='Plugin Name' />
                            <Input placeholder='Repository ID' />
                            <Input placeholder='Categories' />
                            <Input placeholder='Branch' />
                            <button>Create Plugin</button>
                        </Form>
                    </main>
                </div>
            <Footer/>
        </>
    );
};

export default CreatePlugin;