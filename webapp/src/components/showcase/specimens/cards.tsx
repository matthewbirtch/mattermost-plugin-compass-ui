// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState} from 'react';

import {AttachmentCard} from '@mattermost/compass-ui/components/attachment-card';
import {ImagePreview} from '@mattermost/compass-ui/components/image-preview';
import {LinkPreview} from '@mattermost/compass-ui/components/link-preview';
import {PermalinkPreview} from '@mattermost/compass-ui/components/permalink-preview';

import {Note} from './shared';

const PLACEHOLDER_IMG = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180">' +
    '<rect fill="rgb(123,163,232)" width="320" height="180"/>' +
    '<rect fill="rgb(61,122,224)" y="108" width="320" height="72"/>' +
    '<circle fill="rgb(245,197,66)" cx="252" cy="44" r="26"/>' +
    '</svg>',
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
            alt='Landscape specimen'
            src={PLACEHOLDER_IMG}
        />
    );
}

export function ImagePreviewDetail() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className='CompassShowcase__stack'>
            <Note>
                {'Copy, download, and collapse controls appear on hover or keyboard focus.'}
            </Note>
            <div style={{padding: 8}}>
                <ImagePreview
                    alt='Landscape specimen'
                    aspectRatio='16:9'
                    collapsed={collapsed}
                    src={PLACEHOLDER_IMG}
                    onCopyLink={() => undefined}
                    onDownload={() => undefined}
                    onToggleCollapse={() => setCollapsed((isCollapsed) => !isCollapsed)}
                />
            </div>
        </div>
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
