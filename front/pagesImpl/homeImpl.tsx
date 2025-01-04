import React, { ButtonHTMLAttributes, Component, DetailedHTMLProps, useEffect } from 'react';
import IngEntry from './components/ingEntry';

export default function Home() {
    const empty = () => {

    }
    return (
        <div style={
            {
                height: '100%',
                width: '100%',
                display: 'flex'
            }
        }>
            <IngEntry onCancel={empty}>

            </IngEntry>
        </div>
    )
}
