// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import PaletteOutlineIcon from '@mattermost/compass-icons/components/palette-outline';
import {Emoji} from '@mattermost/compass-ui/components/emoji';
import {Icon} from '@mattermost/compass-ui/components/icon';
import {Illustration} from '@mattermost/compass-ui/components/illustration';
import {TeamAvatar} from '@mattermost/compass-ui/components/team-avatar';
import {UserAvatar} from '@mattermost/compass-ui/components/user-avatar';
import {UserAvatarGroup} from '@mattermost/compass-ui/components/user-avatar-group';

import {Row, Variant} from './shared';

export function IconPreview() {
    return (
        <Icon
            glyph={<PaletteOutlineIcon/>}
            size='24'
        />
    );
}

export function IconDetail() {
    return (
        <Row>
            <Icon
                glyph={<PaletteOutlineIcon/>}
                size='16'
            />
            <Icon
                glyph={<PaletteOutlineIcon/>}
                size='24'
            />
            <Icon
                glyph={<PaletteOutlineIcon/>}
                size='32'
            />
            <Icon
                glyph={<PaletteOutlineIcon/>}
                size='52'
            />
        </Row>
    );
}

export function EmojiPreview() {
    return (
        <Emoji emoji='👍'/>
    );
}

export function EmojiDetail() {
    return (
        <Row>
            <Emoji
                emoji='🎉'
                size='16'
            />
            <Emoji
                emoji='🚀'
                size='24'
            />
            <Emoji
                emoji='✅'
                size='32'
            />
        </Row>
    );
}

export function UserAvatarPreview() {
    return (
        <UserAvatar
            alt='Leonard Riley'
            name='Leonard Riley'
            size='40'
            status={true}
        />
    );
}

export function UserAvatarDetail() {
    return (
        <Variant label='Fallback sizes'>
            <Row>
                <UserAvatar
                    alt='Aiko Tan'
                    name='Aiko Tan'
                    size='24'
                />
                <UserAvatar
                    alt='Arjun Patel'
                    name='Arjun Patel'
                    size='40'
                    status={true}
                />
                <UserAvatar
                    alt='Sofia Bauer'
                    name='Sofia Bauer'
                    size='64'
                />
            </Row>
        </Variant>
    );
}

export function UserAvatarGroupPreview() {
    return (
        <UserAvatarGroup
            avatars={[
                {key: 'a', name: 'Aiko Tan'},
                {key: 'b', name: 'Arjun Patel'},
                {key: 'c', name: 'Sofia Bauer'},
                {key: 'd', name: 'Marco Rinaldi'},
            ]}
        />
    );
}

export function UserAvatarGroupDetail() {
    return (
        <UserAvatarGroup
            avatars={[
                {key: 'a', name: 'Aiko Tan'},
                {key: 'b', name: 'Arjun Patel'},
                {key: 'c', name: 'Sofia Bauer'},
                {key: 'd', name: 'Marco Rinaldi'},
                {key: 'e', name: 'Leonard Riley'},
            ]}
            max={3}
            size='32'
        />
    );
}

export function TeamAvatarPreview() {
    return (
        <TeamAvatar
            alt='Contributors'
            initials='Co'
            size='40'
        />
    );
}

export function TeamAvatarDetail() {
    return (
        <Row>
            <TeamAvatar
                alt='Contributors'
                initials='Co'
                size='32'
            />
            <TeamAvatar
                alt='Design'
                badge={3}
                initials='De'
                size='40'
                state='active'
            />
        </Row>
    );
}

export function IllustrationPreview() {
    return (
        <Illustration
            aria-label='Empty mailbox'
            height='64px'
            width='64px'
        >
            <svg
                viewBox='0 0 64 64'
                xmlns='http://www.w3.org/2000/svg'
            >
                <rect
                    fill='rgba(var(--center-channel-color-rgb), 0.08)'
                    height='64'
                    rx='8'
                    width='64'
                />
            </svg>
        </Illustration>
    );
}

export function IllustrationDetail() {
    return (
        <Illustration
            aria-label='Decorative placeholder'
            height='96px'
            width='160px'
        >
            <svg
                viewBox='0 0 160 96'
                xmlns='http://www.w3.org/2000/svg'
            >
                <rect
                    fill='rgba(var(--button-bg-rgb, 28, 88, 217), 0.16)'
                    height='96'
                    rx='8'
                    width='160'
                />
            </svg>
        </Illustration>
    );
}
