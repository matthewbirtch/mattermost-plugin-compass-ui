// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import InformationOutlineIcon from '@mattermost/compass-icons/components/information-outline';
import {GlobalBanner} from '@mattermost/compass-ui/components/global-banner';
import {Icon} from '@mattermost/compass-ui/components/icon';
import {MoreUnreadsBanner} from '@mattermost/compass-ui/components/more-unreads-banner';
import {NewMessageBanner} from '@mattermost/compass-ui/components/new-message-banner';
import {SearchTipBanner} from '@mattermost/compass-ui/components/search-tip-banner';

export function GlobalBannerPreview() {
    return (
        <GlobalBanner
            message='Scheduled maintenance starts at 22:00 UTC.'
            type='info'
        />
    );
}

export function GlobalBannerDetail() {
    return (
        <div className='CompassShowcase__stack'>
            <GlobalBanner
                leadingIcon={(
                    <Icon
                        glyph={<InformationOutlineIcon/>}
                        size='16'
                    />
                )}
                message='A new Compass UI version is available.'
                type='success'
                actionLabel='Refresh'
            />
            <GlobalBanner
                message='Connection lost. Trying to reconnect…'
                type='danger'
                onDismiss={() => undefined}
            />
        </div>
    );
}

export function MoreUnreadsBannerPreview() {
    return (
        <MoreUnreadsBanner/>
    );
}

export function MoreUnreadsBannerDetail() {
    return (
        <div className='CompassShowcase__stack'>
            <MoreUnreadsBanner direction='up'/>
            <MoreUnreadsBanner direction='down'/>
        </div>
    );
}

export function NewMessageBannerPreview() {
    return (
        <NewMessageBanner countLabel='8 new messages since yesterday'/>
    );
}

export function NewMessageBannerDetail() {
    return (
        <div className='CompassShowcase__stack'>
            <NewMessageBanner
                countLabel='21 new messages since Saturday'
                onDismiss={() => undefined}
            />
            <NewMessageBanner type='new-replies'/>
        </div>
    );
}

export function SearchTipBannerPreview() {
    return (
        <SearchTipBanner/>
    );
}

export function SearchTipBannerDetail() {
    return (
        <SearchTipBanner
            prefix='Tip: Try'
            suffix='to jump to a channel'
            shortcutKeys={[{label: '⌘'}, {label: 'K'}]}
            onDismiss={() => undefined}
        />
    );
}
