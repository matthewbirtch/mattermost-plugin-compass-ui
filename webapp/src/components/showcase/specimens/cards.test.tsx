// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {ImagePreviewDetail, ImagePreviewPreview} from './cards';

type Rendered = {
    container: HTMLDivElement;
    unmount: () => void;
};

function render(ui: React.ReactElement): Rendered {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root: Root = createRoot(container);
    act(() => {
        root.render(ui);
    });
    return {
        container,
        unmount: () => {
            act(() => {
                root.unmount();
            });
            container.remove();
        },
    };
}

describe('ImagePreview specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('renders an inline SVG image in the gallery preview', () => {
        const view = render(<ImagePreviewPreview/>);
        rendered = view;
        const img = view.container.querySelector('img');

        expect(img).not.toBeNull();
        expect(img?.getAttribute('src')?.startsWith('data:image/svg+xml')).toEqual(true);
        expect(img?.getAttribute('alt')).toEqual('Landscape specimen');
    });

    it('renders the image and action buttons in the detail view', () => {
        const view = render(<ImagePreviewDetail/>);
        rendered = view;
        const img = view.container.querySelector('img');
        const copy = view.container.querySelector('[aria-label="Copy link"]');
        const download = view.container.querySelector('[aria-label="Download"]');
        const collapse = view.container.querySelector('[aria-label="Collapse image preview"]');

        expect(img).not.toBeNull();
        expect(img?.getAttribute('src')?.startsWith('data:image/svg+xml')).toEqual(true);
        expect(copy).not.toBeNull();
        expect(download).not.toBeNull();
        expect(collapse).not.toBeNull();
    });
});
