// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import {AttachmentCard} from '@mattermost/compass-ui/components/attachment-card';
import {ImagePreview} from '@mattermost/compass-ui/components/image-preview';
import {LinkPreview} from '@mattermost/compass-ui/components/link-preview';
import {PermalinkPreview} from '@mattermost/compass-ui/components/permalink-preview';

const PLACEHOLDER_IMG = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect fill="#1c58d9" width="320" height="180"/></svg>',
);

export function AttachmentCardPreview() {
    return (
        <AttachmentCard
            fileMeta='PDF 240KB'
            fileName='compass-overview.pdf'
            fileType='pdf'
        />
    );
}

export function AttachmentCardDetail() {
    return (
        <div className='CompassShowcase__stack'>
            <AttachmentCard
                fileMeta='TXT 15KB'
                fileName='notes.txt'
                fileType='text'
            />
            <AttachmentCard
                fileMeta='Uploading'
                fileName='recording.mp4'
                fileType='video'
                progress={42}
                state='uploading'
            />
        </div>
    );
}

export function ImagePreviewPreview() {
    return (
        <ImagePreview
            alt='Placeholder'
            src={PLACEHOLDER_IMG}
        />
    );
}

export function ImagePreviewDetail() {
    return (
        <ImagePreview
            alt='16:9 preview'
            aspectRatio='16:9'
            src={PLACEHOLDER_IMG}
        />
    );
}

export function LinkPreviewPreview() {
    return (
        <LinkPreview
            description='Design system components for Mattermost products.'
            siteName='developers.mattermost.com'
            title='Compass UI'
        />
    );
}

export function LinkPreviewDetail() {
    return (
        <LinkPreview
            description='A searchable gallery of Compass components.'
            imageAlt='Preview'
            imageSize='small'
            imageSrc={PLACEHOLDER_IMG}
            siteName='github.com'
            title='compass-ui-plugin'
        />
    );
}

export function PermalinkPreviewPreview() {
    return (
        <PermalinkPreview
            authorName='Aiko Tan'
            avatarSrc=''
            messageText='The gallery should use Compass SearchInput and Tabs.'
            originalChannel='~UX Design'
        />
    );
}

export function PermalinkPreviewDetail() {
    return (
        <PermalinkPreview
            authorName='Leonard Riley'
            avatarSrc=''
            timestamp='Yesterday'
            messageText='Ship the plugin against the published npm package, not a file: link.'
        />
    );
}
