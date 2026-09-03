// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {FeatureDiscoveryPanelDetail, FeatureDiscoveryPanelPreview} from './chrome';

jest.mock('@mattermost/compass-ui/components/admin-console-header', () => ({
    AdminConsoleHeader: () => null,
}));

jest.mock('@mattermost/compass-ui/components/app-bar-item', () => ({
    AppBarItem: () => null,
}));

jest.mock('@mattermost/compass-ui/components/channel-header', () => ({
    ChannelHeader: () => null,
}));

jest.mock('@mattermost/compass-ui/components/feature-discovery-panel', () => ({
    FeatureDiscoveryPanel: ({
        description,
        illustration,
        primaryAction,
        skuLabel,
        title,
    }: {
        description?: string;
        illustration?: {
            children?: React.ReactNode;
            'aria-label'?: string;
            height?: string;
            width?: string;
        };
        primaryAction?: {children?: React.ReactNode};
        skuLabel?: string | null;
        title: string;
    }) => (
        <div data-testid='feature-discovery-panel'>
            <div
                aria-label={illustration?.['aria-label']}
                data-height={illustration?.height}
                data-width={illustration?.width}
            >
                {illustration?.children}
            </div>
            {skuLabel ? (
                <span>{skuLabel}</span>
            ) : null}
            <h2>{title}</h2>
            <p>{description}</p>
            {primaryAction ? (
                <button type='button'>
                    {primaryAction.children}
                </button>
            ) : null}
        </div>
    ),
}));

jest.mock('@mattermost/compass-ui/components/global-header', () => ({
    GlobalHeader: () => null,
}));

jest.mock('@mattermost/compass-ui/components/icon', () => ({
    Icon: () => null,
}));

jest.mock('@mattermost/compass-ui/components/right-sidebar', () => ({
    RightSidebar: () => null,
    RightSidebarHeader: () => null,
}));

jest.mock('@mattermost/compass-ui/components/team-sidebar', () => ({
    TeamSidebar: () => null,
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

describe('FeatureDiscoveryPanel specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    function expectSharedIllustration(container: HTMLElement) {
        const svg = container.querySelector('svg');
        const mark = container.querySelector('[aria-label="Sample illustration"]') as HTMLElement | null;

        expect(mark).not.toBeNull();
        expect(mark?.getAttribute('data-height')).toEqual('96px');
        expect(mark?.getAttribute('data-width')).toEqual('160px');
        expect(svg?.getAttribute('viewBox')).toEqual('0 0 160 96');
        expect(container.querySelectorAll('circle').length).toBeGreaterThan(0);
        expect(container.querySelectorAll('polygon').length).toBeGreaterThan(0);
        expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(0);
        expect(container.querySelector('rect[width="160"][height="96"]')).toBeNull();
        expect(container.querySelector('rect[fill="rgba(var(--button-bg-rgb), 0.12)"]')).toBeNull();
    }

    it('passes the shared Compass illustration into the gallery preview', () => {
        const view = render(<FeatureDiscoveryPanelPreview/>);
        rendered = view;

        const artboard = view.container.firstElementChild as HTMLElement;
        expect(artboard.className).toEqual('CompassShowcase__widePreview');
        expectSharedIllustration(view.container);
        expect(view.container.querySelector('h2')?.textContent).toEqual('Compliance export');
        expect(view.container.querySelector('p')?.textContent).toEqual(
            'Advanced compliance exports are available on a higher plan.',
        );
        expect(view.container.querySelector('button')).toBeNull();
    });

    it('reuses the same Compass illustration in the detail view', () => {
        const view = render(<FeatureDiscoveryPanelDetail/>);
        rendered = view;

        expect(view.container.firstElementChild?.getAttribute('data-testid')).toEqual('feature-discovery-panel');
        expectSharedIllustration(view.container);
        expect(view.container.querySelector('span')?.textContent).toEqual('ENTERPRISE');
        expect(view.container.querySelector('h2')?.textContent).toEqual('Guest accounts');
        expect(view.container.querySelector('p')?.textContent).toEqual(
            'Unlock guest accounts and advanced permissions.',
        );
        expect(view.container.querySelector('button')?.textContent).toEqual('View plans');
    });
});
