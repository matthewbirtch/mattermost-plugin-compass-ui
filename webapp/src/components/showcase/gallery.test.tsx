// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import Gallery from './gallery';

jest.mock('./catalog', () => ({
    CATALOG: [
        {
            id: 'button',
            name: 'Button',
            category: 'actions',
            description: 'Primary',
            preview: () => null,
            detail: () => null,
        },
        {
            id: 'team-avatar',
            name: 'Team Avatar',
            category: 'images',
            description: 'Team',
            preview: () => null,
            detail: () => null,
            previewSurface: 'sidebar',
        },
    ],
}));

jest.mock('@mattermost/compass-ui/components/empty-state', () => ({
    EmptyState: () => null,
}));

jest.mock('@mattermost/compass-ui/components/scrollbar', () => ({
    Scrollbar: ({children}: {children: React.ReactNode}) => (
        <div>
            {children}
        </div>
    ),
}));

jest.mock('@mattermost/compass-ui/components/search-input', () => ({
    SearchInput: ({label, value, onChange}: {
        label?: React.ReactNode;
        value?: string;
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }) => (
        <label>
            {label}
            <input
                type='search'
                value={value}
                onChange={onChange}
            />
        </label>
    ),
}));

jest.mock('./scaled-preview', () => ({
    __esModule: true,
    default: ({children, className}: {children: React.ReactNode; className?: string}) => {
        let previewClassName = 'CompassShowcase__cardPreview';
        if (className) {
            previewClassName += ` ${className}`;
        }
        return (
            <div className={previewClassName}>
                {children}
            </div>
        );
    },
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

function cardNamed(container: HTMLElement, name: string): HTMLElement | undefined {
    return Array.from(container.querySelectorAll('.CompassShowcase__card')).find((card) => (
        card.querySelector('.CompassShowcase__cardName')?.textContent === name
    )) as HTMLElement | undefined;
}

describe('Gallery preview surfaces', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('uses Compass SearchInput labeled Search Compass UI', () => {
        const view = render(<Gallery onSelect={() => undefined}/>);
        rendered = view;

        expect(view.container.textContent).toContain('Search Compass UI');
        expect(view.container.querySelector('input[type="search"]')).not.toBeNull();
    });

    it('applies the sidebar modifier only on the Team Avatar tile', () => {
        const view = render(<Gallery onSelect={() => undefined}/>);
        rendered = view;

        const teamAvatar = cardNamed(view.container, 'Team Avatar');
        const button = cardNamed(view.container, 'Button');

        expect(teamAvatar?.querySelector('.CompassShowcase__cardPreview')?.className).toEqual(
            'CompassShowcase__cardPreview CompassShowcase__cardPreview--sidebar',
        );
        expect(button?.querySelector('.CompassShowcase__cardPreview')?.className).toEqual(
            'CompassShowcase__cardPreview',
        );
    });
});
