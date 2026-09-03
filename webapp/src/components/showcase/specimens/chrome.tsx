// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import PaletteOutlineIcon from '@mattermost/compass-icons/components/palette-outline';
import {AdminConsoleHeader} from '@mattermost/compass-ui/components/admin-console-header';
import {AppBarItem} from '@mattermost/compass-ui/components/app-bar-item';
import {ChannelHeader} from '@mattermost/compass-ui/components/channel-header';
import {FeatureDiscoveryPanel} from '@mattermost/compass-ui/components/feature-discovery-panel';
import {GlobalHeader} from '@mattermost/compass-ui/components/global-header';
import {Icon} from '@mattermost/compass-ui/components/icon';
import {
    RightSidebar,
    RightSidebarHeader,
} from '@mattermost/compass-ui/components/right-sidebar';
import {TeamSidebar} from '@mattermost/compass-ui/components/team-sidebar';

import {Excerpt, Note, WidePreview} from './shared';

export function GlobalHeaderPreview() {
    return (
        <WidePreview>
            <Excerpt>
                <GlobalHeader userAvatarAlt='You'/>
            </Excerpt>
        </WidePreview>
    );
}

export function GlobalHeaderDetail() {
    return (
        <>
            <Note>
                {'Global Header is too wide for the RHS — this is a clipped layout excerpt.'}
            </Note>
            <Excerpt>
                <GlobalHeader
                    showUpgradeButton={true}
                    userAvatarAlt='You'
                />
            </Excerpt>
        </>
    );
}

export function ChannelHeaderPreview() {
    return (
        <WidePreview>
            <Excerpt>
                <ChannelHeader
                    memberCount={12}
                    name='UX Design'
                />
            </Excerpt>
        </WidePreview>
    );
}

export function ChannelHeaderDetail() {
    return (
        <>
            <Note>
                {'Channel Header is a layout excerpt; actions may clip at RHS width.'}
            </Note>
            <Excerpt>
                <ChannelHeader
                    description='Compass UI plugin'
                    favorited={true}
                    memberCount={8}
                    name='compass-ui'
                    pinnedCount={2}
                />
            </Excerpt>
        </>
    );
}

export function TeamSidebarPreview() {
    return (
        <TeamSidebar
            activeTeamId='contributors'
            teams={[
                {id: 'contributors', name: 'Contributors', initials: 'Co'},
                {id: 'design', name: 'Design', initials: 'De', unread: true},
            ]}
        />
    );
}

export function TeamSidebarDetail() {
    return (
        <TeamSidebar
            activeTeamId='design'
            showAddTeam={true}
            teams={[
                {id: 'contributors', name: 'Contributors', initials: 'Co'},
                {id: 'design', name: 'Design', initials: 'De', mentions: 3},
                {id: 'release', name: 'Release', initials: 'Re', unread: true},
            ]}
        />
    );
}

export function AppBarItemPreview() {
    return (
        <AppBarItem
            icon={(
                <Icon
                    glyph={<PaletteOutlineIcon/>}
                    size='20'
                />
            )}
            label='Compass UI'
        />
    );
}

export function AppBarItemDetail() {
    return (
        <div className='CompassShowcase__row'>
            <AppBarItem
                icon={(
                    <Icon
                        glyph={<PaletteOutlineIcon/>}
                        size='20'
                    />
                )}
                label='Compass UI'
            />
            <AppBarItem
                icon={(
                    <Icon
                        glyph={<PaletteOutlineIcon/>}
                        size='20'
                    />
                )}
                label='Compass UI selected'
                mentionBadge={2}
                state='selected'
            />
        </div>
    );
}

export function RightSidebarPreview() {
    return (
        <Excerpt>
            <RightSidebar
                header={(
                    <RightSidebarHeader title='Thread'/>
                )}
            >
                {'This plugin fills Mattermost RHS; Compass RightSidebar is catalog chrome only.'}
            </RightSidebar>
        </Excerpt>
    );
}

export function RightSidebarDetail() {
    return (
        <>
            <Note>
                {'Do not wrap this plugin in Compass RightSidebar — Mattermost already draws the RHS chrome. Shown here as a catalog excerpt.'}
            </Note>
            <Excerpt>
                <RightSidebar
                    header={(
                        <RightSidebarHeader
                            title='Channel info'
                            onClose={() => undefined}
                        />
                    )}
                >
                    {'Body content scrolls independently of the header.'}
                </RightSidebar>
            </Excerpt>
        </>
    );
}

export function AdminConsoleHeaderPreview() {
    return (
        <WidePreview>
            <AdminConsoleHeader title='Site statistics'/>
        </WidePreview>
    );
}

export function AdminConsoleHeaderDetail() {
    return (
        <AdminConsoleHeader
            enterpriseBadge={true}
            showBack={true}
            title='Authentication'
            onBackClick={() => undefined}
        />
    );
}

export function FeatureDiscoveryPanelPreview() {
    return (
        <WidePreview>
            <FeatureDiscoveryPanel
                description='Advanced compliance exports are available on a higher plan.'
                title='Compliance export'
            />
        </WidePreview>
    );
}

export function FeatureDiscoveryPanelDetail() {
    return (
        <FeatureDiscoveryPanel
            description='Unlock guest accounts and advanced permissions.'
            primaryAction={{children: 'View plans'}}
            skuLabel='ENTERPRISE'
            title='Guest accounts'
        />
    );
}
