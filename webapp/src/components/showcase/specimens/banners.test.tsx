// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {
    GlobalBannerDetail,
    GlobalBannerPreview,
    MoreUnreadsBannerDetail,
    MoreUnreadsBannerPreview,
    NewMessageBannerPreview,
} from './banners';

jest.mock('@mattermost/compass-ui/components/more-unreads-banner', () => ({
    MoreUnreadsBanner: ({direction}: {direction?: string}) => (
        <button
            type='button'
            data-testid={`more-unreads-${direction || 'up'}`}
        >
            {'More unreads'}
        </button>
    ),
}));

jest.mock('@mattermost/compass-ui/components/global-banner', () => ({
    GlobalBanner: ({message}: {message?: string}) => (
        <div data-testid='global-banner'>
            {message}
        </div>
    ),
}));

jest.mock('@mattermost/compass-ui/components/new-message-banner', () => ({
    NewMessageBanner: ({countLabel}: {countLabel?: string}) => (
        <div data-testid='new-message-banner'>
            {countLabel}
        </div>
    ),
}));

jest.mock('@mattermost/compass-ui/components/search-tip-banner', () => ({
    SearchTipBanner: () => null,
}));

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

describe('MoreUnreadsBanner specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('renders the gallery preview as a single banner', () => {
        const view = render(<MoreUnreadsBannerPreview/>);
        rendered = view;

        expect(view.container.querySelector('[data-testid="more-unreads-up"]')).not.toBeNull();
        expect(view.container.querySelector('[data-testid="more-unreads-down"]')).toBeNull();
    });

    it('hugs content in detail so the pill is not stretched by the stack', () => {
        const view = render(<MoreUnreadsBannerDetail/>);
        rendered = view;

        const stack = view.container.firstElementChild as HTMLElement;
        expect(stack.className).toEqual('CompassShowcase__stack CompassShowcase__stack--hug');
        expect(view.container.querySelector('[data-testid="more-unreads-up"]')).not.toBeNull();
        expect(view.container.querySelector('[data-testid="more-unreads-down"]')).not.toBeNull();
    });
});

describe('GlobalBanner specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('uses a padded wide artboard so the full-bleed banner sits inset', () => {
        const view = render(<GlobalBannerPreview/>);
        rendered = view;

        const artboard = view.container.firstElementChild as HTMLElement;
        expect(artboard.className).toEqual('CompassShowcase__widePreview CompassShowcase__widePreview--padded');
        expect(artboard.querySelector('[data-testid="global-banner"]')?.textContent).toEqual(
            'Scheduled maintenance starts at 22:00 UTC.',
        );
    });

    it('keeps the detail specimen full width without the gallery artboard', () => {
        const view = render(<GlobalBannerDetail/>);
        rendered = view;

        const stack = view.container.firstElementChild as HTMLElement;
        expect(stack.className).toEqual('CompassShowcase__stack');
        expect(stack.querySelectorAll('[data-testid="global-banner"]')).toHaveLength(2);
    });
});

describe('NewMessageBannerPreview', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('uses the same padded wide artboard as Global Banner', () => {
        const view = render(<NewMessageBannerPreview/>);
        rendered = view;

        const artboard = view.container.firstElementChild as HTMLElement;
        expect(artboard.className).toEqual('CompassShowcase__widePreview CompassShowcase__widePreview--padded');
        expect(artboard.querySelector('[data-testid="new-message-banner"]')?.textContent).toEqual(
            '8 new messages since yesterday',
        );
    });
});
