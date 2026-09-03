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

    it('renders an original SVG mark in the gallery preview', () => {
        const view = render(<IllustrationPreview/>);
        rendered = view;

        const svg = view.container.querySelector('svg');
        const circles = view.container.querySelectorAll('circle');
        const polygons = view.container.querySelectorAll('polygon');

        expect(view.container.querySelector('[aria-label="Sample illustration"]')).not.toBeNull();
        expect(svg?.getAttribute('viewBox')).toEqual('0 0 160 96');
        expect(circles.length).toBeGreaterThan(0);
        expect(polygons.length).toBeGreaterThan(0);
    });

    it('renders the same original SVG mark in the detail view', () => {
        const view = render(<IllustrationDetail/>);
        rendered = view;

        const svg = view.container.querySelector('svg');
        const circles = view.container.querySelectorAll('circle');
        const polygons = view.container.querySelectorAll('polygon');

        expect(view.container.querySelector('[aria-label="Sample illustration"]')).not.toBeNull();
        expect(svg?.getAttribute('viewBox')).toEqual('0 0 160 96');
        expect(circles.length).toBeGreaterThan(0);
        expect(polygons.length).toBeGreaterThan(0);
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
