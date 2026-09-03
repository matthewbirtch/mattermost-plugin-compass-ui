// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import ArrowLeftIcon from '@mattermost/compass-icons/components/arrow-left';
import {Icon} from '@mattermost/compass-ui/components/icon';
import {IconButton} from '@mattermost/compass-ui/components/icon-button';
import {Scrollbar} from '@mattermost/compass-ui/components/scrollbar';

import type {CatalogEntry} from './types';

type Props = {
    entry: CatalogEntry;
    onBack: () => void;
};

export default function Detail({entry, onBack}: Props) {
    const DetailView = entry.detail;

    return (
        <div className='CompassShowcase'>
            <div className='CompassShowcase__chrome CompassShowcase__chrome--detail'>
                <div className='CompassShowcase__detailHeader'>
                    <IconButton
                        aria-label='Back to gallery'
                        icon={(
                            <Icon
                                glyph={<ArrowLeftIcon/>}
                                size='20'
                            />
                        )}
                        onClick={onBack}
                    />
                    <div className='CompassShowcase__detailCopy'>
                        <h2 className='CompassShowcase__detailTitle'>
                            {entry.name}
                        </h2>
                        <p className='CompassShowcase__detailDescription'>
                            {entry.description}
                        </p>
                    </div>
                </div>
            </div>
            <Scrollbar className='CompassShowcase__scroll'>
                <div className='CompassShowcase__body CompassShowcase__body--detail'>
                    <DetailView/>
                </div>
            </Scrollbar>
        </div>
    );
}
