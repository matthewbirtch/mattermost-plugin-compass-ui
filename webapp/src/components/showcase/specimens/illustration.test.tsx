// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {IllustrationDetail, IllustrationPreview} from './images';

jest.mock('@mattermost/compass-ui/components/emoji', () => ({
    Emoji: () => null,
}));

jest.mock('@mattermost/compass-ui/components/icon', () => ({
    Icon: () => null,
}));

jest.mock('@mattermost/compass-ui/components/illustration', () => ({
    Illustration: ({
        children,
        'aria-label': ariaLabel,
    }: {
        children?: React.ReactNode;
        'aria-label'?: string;
    }) => (
        <span aria-label={ariaLabel}>
            {children}
        </span>
    ),
}));

jest.mock('@mattermost/compass-ui/components/team-avatar', () => ({
    TeamAvatar: () => null,
}));

jest.mock('@mattermost/compass-ui/components/user-avatar', () => ({
    UserAvatar: () => null,
}));

jest.mock('@mattermost/compass-ui/components/user-avatar-group', () => ({
    UserAvatarGroup: () => null,
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
