// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import {Message} from '@mattermost/compass-ui/components/message';
import {MessageHeader} from '@mattermost/compass-ui/components/message-header';
import {MessageInput} from '@mattermost/compass-ui/components/message-input';
import {MessageSeparator} from '@mattermost/compass-ui/components/message-separator';
import {ThreadFooter} from '@mattermost/compass-ui/components/thread-footer';
import {ThreadListItem} from '@mattermost/compass-ui/components/thread-list-item';

import {Note} from './shared';

export function MessagePreview() {
    return (
        <Message
            avatarAlt='Aiko Tan'
            timestamp='10:04 AM'
            username='Aiko Tan'
            showMessageActions={false}
        >
            {'The RHS gallery is a Compass consumer, not a copy of Storybook.'}
        </Message>
    );
}

export function MessageDetail() {
    return (
        <Message
            avatarAlt='Leonard Riley'
            timestamp='Yesterday'
            username='Leonard Riley'
            showMessageActions={true}
            showPinnedSavedIndicators={true}
        >
            {'Pinned and saved indicators sit above the body when enabled.'}
        </Message>
    );
}

export function MessageHeaderPreview() {
    return (
        <MessageHeader
            timestamp='10:04 AM'
            username='Aiko Tan'
        />
    );
}

export function MessageHeaderDetail() {
    return (
        <MessageHeader
            isBot={true}
            timestamp='9:41 AM'
            username='Welcome Bot'
        />
    );
}

// Wider than the 280px gallery stage, with padding, so ScaledPreview
// shrinks the composer into a thumbnail instead of a squeezed full-width input.
export function MessageInputPreview() {
    return (
        <div
            style={{
                boxSizing: 'border-box',
                flexShrink: 0,
                width: 640,
                padding: 96,
            }}
        >
            <MessageInput
                placeholder='Reply…'
                width='narrow'
            />
        </div>
    );
}

export function MessageInputDetail() {
    return (
        <MessageInput
            placeholder='Write to Town Square'
            showPriorityIndicator={true}
            width='narrow'
        />
    );
}

export function MessageSeparatorPreview() {
    return (
        <MessageSeparator label='Today'/>
    );
}

export function MessageSeparatorDetail() {
    return (
        <div className='CompassShowcase__stack'>
            <MessageSeparator
                label='Today'
                type='date'
            />
            <MessageSeparator type='new-messages'/>
            <MessageSeparator
                label='4 replies'
                type='reply-count'
            />
        </div>
    );
}

export function ThreadFooterPreview() {
    return (
        <ThreadFooter replyCount={6}/>
    );
}

export function ThreadFooterDetail() {
    return (
        <ThreadFooter
            badge='mention'
            following={true}
            lastReplyTime='2 min ago'
            mentionCount={2}
            replyCount={11}
        />
    );
}

export function ThreadListItemPreview() {
    return (
        <ThreadListItem
            authorName='Arjun Patel'
            previewText='Let’s keep the specimens compact so they fit the RHS.'
        />
    );
}

export function ThreadListItemDetail() {
    return (
        <>
            <Note>
                {'Thread list rows reveal overflow actions on hover and focus-within.'}
            </Note>
            <ThreadListItem
                authorName='Sofia Bauer'
                badge='unread'
                channelLabel='UX Design'
                previewText='Search and filter chrome should be Compass components.'
            />
        </>
    );
}
