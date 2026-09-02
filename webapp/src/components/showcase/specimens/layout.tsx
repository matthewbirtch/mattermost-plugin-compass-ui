// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState} from 'react';

import {Divider} from '@mattermost/compass-ui/components/divider';
import {EmptyState} from '@mattermost/compass-ui/components/empty-state';
import {Scrollbar} from '@mattermost/compass-ui/components/scrollbar';
import {Tabs} from '@mattermost/compass-ui/components/tabs';

import {Note, Variant} from './shared';

export function DividerPreview() {
    return (
        <Divider/>
    );
}

export function DividerDetail() {
    return (
        <div className='CompassShowcase__stack'>
            <span>{'Above'}</span>
            <Divider/>
            <span>{'Below'}</span>
        </div>
    );
}

export function EmptyStatePreview() {
    return (
        <EmptyState
            description='Saved messages will show up here.'
            title='No saved messages'
        />
    );
}

export function EmptyStateDetail() {
    return (
        <EmptyState
            action={{children: 'Clear search'}}
            description='Try a different name or category.'
            title='No components match'
        />
    );
}

export function ScrollbarPreview() {
    return (
        <Scrollbar style={{height: 72}}>
            <div style={{padding: 8}}>
                {'Compass Scrollbar wraps overflowing content with a thin thumb.'}
                <br/>
                {'Keep scrolling to see the track.'}
                <br/>
                {'The RHS gallery uses this same control.'}
            </div>
        </Scrollbar>
    );
}

export function ScrollbarDetail() {
    return (
        <Scrollbar
            alwaysVisible={true}
            style={{height: 96}}
        >
            <div style={{padding: 8, height: 180}}>
                {'alwaysVisible keeps the thumb on screen while content overflows.'}
            </div>
        </Scrollbar>
    );
}

export function TabsPreview() {
    return (
        <Tabs
            activeKey='all'
            onChange={() => undefined}
            tabs={[
                {key: 'all', label: 'All', countBadge: 12},
                {key: 'actions', label: 'Actions', countBadge: 3},
            ]}
        />
    );
}

export function TabsDetail() {
    const [activeKey, setActiveKey] = useState('mentions');
    return (
        <>
            <Note>
                {'Tabs is the Compass pattern for filters on a list — the gallery uses it with countBadge.'}
            </Note>
            <Variant label='With counts and unread'>
                <Tabs
                    activeKey={activeKey}
                    onChange={setActiveKey}
                    tabs={[
                        {key: 'mentions', label: 'Mentions', countBadge: 4},
                        {key: 'threads', label: 'Threads', unreadBadge: true},
                        {key: 'saved', label: 'Saved'},
                    ]}
                />
            </Variant>
        </>
    );
}
