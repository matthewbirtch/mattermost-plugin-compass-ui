// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {MoreUnreadsBannerDetail, MoreUnreadsBannerPreview} from './banners';

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
    GlobalBanner: () => null,
}));

jest.mock('@mattermost/compass-ui/components/new-message-banner', () => ({
    NewMessageBanner: () => null,
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
