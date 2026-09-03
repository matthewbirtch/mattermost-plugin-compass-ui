// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import {AdminConsoleHeader} from '@mattermost/compass-ui/components/admin-console-header';
import {FeatureDiscoveryPanel} from '@mattermost/compass-ui/components/feature-discovery-panel';
import {GlobalHeader} from '@mattermost/compass-ui/components/global-header';
import {RightSidebarHeader} from '@mattermost/compass-ui/components/right-sidebar-header';
import {TeamSidebar} from '@mattermost/compass-ui/components/team-sidebar';

import {IllustrationMark} from './images';
import {Excerpt, Note, WidePreview} from './shared';

const featureDiscoveryIllustration = {
    'aria-label': 'Sample illustration',
    children: <IllustrationMark/>,
    height: '96px',
    width: '160px',
};

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

export function RightSidebarHeaderPreview() {
    return (
        <Excerpt>
            <RightSidebarHeader title='Thread'/>
        </Excerpt>
    );
}

export function RightSidebarHeaderDetail() {
    return (
        <>
            <Note>
                {'Do not wrap this plugin in Compass RHS chrome — Mattermost already draws the RHS. Shown here as a catalog excerpt.'}
            </Note>
            <Excerpt>
                <RightSidebarHeader
                    title='Channel info'
                    onClose={() => undefined}
                />
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
                illustration={featureDiscoveryIllustration}
                title='Compliance export'
            />
        </WidePreview>
    );
}

export function FeatureDiscoveryPanelDetail() {
    return (
        <FeatureDiscoveryPanel
            description='Unlock guest accounts and advanced permissions.'
            illustration={featureDiscoveryIllustration}
            primaryAction={{children: 'View plans'}}
            skuLabel='ENTERPRISE'
            title='Guest accounts'
        />
    );
}
