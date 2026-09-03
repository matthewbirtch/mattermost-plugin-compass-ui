// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

type Props = {
    children: React.ReactNode;
    label?: string;
};

export function Row({children}: Props) {
    return (
        <div className='CompassShowcase__row'>
            {children}
        </div>
    );
}

export function Variant({children, label}: Props) {
    return (
        <div className='CompassShowcase__variant'>
            {label && (
                <div className='CompassShowcase__variantLabel'>
                    {label}
                </div>
            )}
            <div className='CompassShowcase__variantLive'>
                {children}
            </div>
        </div>
    );
}

export function Note({children}: {children: React.ReactNode}) {
    return (
        <p className='CompassShowcase__note'>
            {children}
        </p>
    );
}

export function Excerpt({children}: {children: React.ReactNode}) {
    return (
        <div className='CompassShowcase__excerpt'>
            {children}
        </div>
    );
}

export function WidePreview({
    children,
    padded,
}: {
    children: React.ReactNode;
    padded?: boolean;
}) {
    let className = 'CompassShowcase__widePreview';
    if (padded) {
        className += ' CompassShowcase__widePreview--padded';
    }

    return (
        <div className={className}>
            {children}
        </div>
    );
}
