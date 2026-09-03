// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {MessageInputPreview} from './messaging';

jest.mock('@mattermost/compass-ui/components/message', () => ({
    Message: () => null,
}));

jest.mock('@mattermost/compass-ui/components/message-header', () => ({
    MessageHeader: () => null,
}));

jest.mock('@mattermost/compass-ui/components/message-input', () => ({
    MessageInput: ({placeholder}: {placeholder?: string}) => (
        <div data-testid='message-input'>
            {placeholder}
        </div>
    ),
}));

jest.mock('@mattermost/compass-ui/components/message-separator', () => ({
    MessageSeparator: () => null,
}));

jest.mock('@mattermost/compass-ui/components/thread-footer', () => ({
    ThreadFooter: () => null,
}));

jest.mock('@mattermost/compass-ui/components/thread-list-item', () => ({
    ThreadListItem: () => null,
}));

describe('MessageInputPreview', () => {
    let container: HTMLDivElement;
    let root: Root;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    });

    afterEach(() => {
        act(() => {
            root.unmount();
        });
        container.remove();
    });

    it('uses a padded artboard wider than the 280px card stage', () => {
        act(() => {
            root.render(<MessageInputPreview/>);
        });

        const artboard = container.firstElementChild as HTMLElement;
        expect(artboard.className).toEqual('CompassShowcase__messageInputPreview');
        expect(artboard.querySelector('[data-testid="message-input"]')?.textContent).toEqual('Reply…');
    });
});
