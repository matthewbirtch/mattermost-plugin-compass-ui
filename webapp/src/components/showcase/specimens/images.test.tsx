// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {IllustrationDetail, IllustrationPreview, TeamAvatarDetail} from './images';

jest.mock('@mattermost/compass-ui/components/team-avatar', () => ({
    TeamAvatar: ({alt}: {alt?: string}) => (
        <div data-testid='team-avatar'>
            {alt}
        </div>
    ),
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

describe('Illustration specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    function expectCompassMark(container: HTMLElement) {
        const svg = container.querySelector('svg');

        expect(container.querySelector('[aria-label="Sample illustration"]')).not.toBeNull();
        expect(svg?.getAttribute('viewBox')).toEqual('0 0 160 96');
        expect(container.querySelectorAll('circle').length).toBeGreaterThan(0);
        expect(container.querySelectorAll('polygon').length).toBeGreaterThan(0);
        expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(0);
        expect(container.querySelector('rect[width="160"][height="96"]')).toBeNull();
        expect(container.querySelector('rect[fill="rgba(var(--button-bg-rgb), 0.12)"]')).toBeNull();
    }

    it('renders an original SVG mark in the gallery preview', () => {
        const view = render(<IllustrationPreview/>);
        rendered = view;

        expectCompassMark(view.container);
    });

    it('renders the same original SVG mark in the detail view', () => {
        const view = render(<IllustrationDetail/>);
        rendered = view;

        expectCompassMark(view.container);
    });
});

describe('TeamAvatar specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('places detail avatars in a sidebar-header well', () => {
        const view = render(<TeamAvatarDetail/>);
        rendered = view;

        const well = view.container.firstElementChild as HTMLElement;
        expect(well.className).toEqual('CompassShowcase__sidebarWell');
        expect(view.container.querySelectorAll('[data-testid="team-avatar"]')).toHaveLength(2);
    });
});
