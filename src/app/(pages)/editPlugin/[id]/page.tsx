'use client';
import Text from '@/components/text';
import { useParams } from 'next/navigation';
import React from 'react';

const EditPlugin = () => {
    const {id} = useParams();

    return (
        <div>
            <Text size='3'>Edit Plugin</Text>
            <Text size='1'>Plugin ID: {id}</Text >
        </div>
    );
};

export default EditPlugin;