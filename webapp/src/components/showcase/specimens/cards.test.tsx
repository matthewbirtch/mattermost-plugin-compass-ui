// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {
    ImagePreviewDetail,
    ImagePreviewPreview,
    LinkPreviewDetail,
    LinkPreviewPreview,
    PermalinkPreviewDetail,
    PermalinkPreviewPreview,
} from './cards';

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

describe('LinkPreview specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('wraps the gallery preview so host paragraph margins can be reset', () => {
        const view = render(<LinkPreviewPreview/>);
        rendered = view;

        const wrapper = view.container.firstElementChild as HTMLElement;
        const paragraphs = wrapper.querySelectorAll('p');

        expect(wrapper.className).toEqual('CompassShowcase__linkPreview');
        expect(paragraphs).toHaveLength(3);
        expect(paragraphs[0].textContent).toEqual('developers.mattermost.com');
        expect(paragraphs[1].textContent).toEqual('Compass UI');
        expect(paragraphs[2].textContent).toEqual('Design system components for Mattermost products.');
    });

    it('wraps the detail view so host paragraph margins can be reset', () => {
        const view = render(<LinkPreviewDetail/>);
        rendered = view;

        const wrapper = view.container.firstElementChild as HTMLElement;
        const paragraphs = wrapper.querySelectorAll('p');

        expect(wrapper.className).toEqual('CompassShowcase__linkPreview');
        expect(paragraphs).toHaveLength(3);
        expect(paragraphs[0].textContent).toEqual('github.com');
        expect(paragraphs[1].textContent).toEqual('compass-ui-plugin');
        expect(paragraphs[2].textContent).toEqual('A searchable gallery of Compass components.');
        expect(wrapper.querySelector('img')?.getAttribute('alt')).toEqual('Preview');
    });
});

describe('PermalinkPreview specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('keeps the wide gallery artboard and wraps copy for the host margin reset', () => {
        const view = render(<PermalinkPreviewPreview/>);
        rendered = view;

        const artboard = view.container.firstElementChild as HTMLElement;
        const wrapper = artboard.firstElementChild as HTMLElement;

        expect(artboard.className).toEqual('CompassShowcase__widePreview');
        expect(wrapper.className).toEqual('CompassShowcase__linkPreview');
        expect(wrapper.querySelectorAll('p').length).toBeGreaterThan(0);
        expect(wrapper.textContent).toContain('The gallery should use Compass SearchInput and Tabs.');
        expect(wrapper.textContent).toContain('Originally posted in ~UX Design');
    });

    it('wraps the detail view so host paragraph margins can be reset', () => {
        const view = render(<PermalinkPreviewDetail/>);
        rendered = view;

        const wrapper = view.container.firstElementChild as HTMLElement;

        expect(wrapper.className).toEqual('CompassShowcase__linkPreview');
        expect(wrapper.querySelectorAll('p').length).toBeGreaterThan(0);
        expect(wrapper.textContent).toContain('Ship the plugin against the published npm package, not a file: link.');
        expect(wrapper.textContent).toContain('Leonard Riley');
    });
});
