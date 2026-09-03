// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {DividerDetail, DividerPreview} from './layout';

jest.mock('@mattermost/compass-ui/components/divider', () => ({
    Divider: () => (
        <hr data-testid='compass-divider'/>
    ),
}));

jest.mock('@mattermost/compass-ui/components/empty-state', () => ({
    EmptyState: () => null,
}));

jest.mock('@mattermost/compass-ui/components/scrollbar', () => ({
    Scrollbar: ({children}: {children?: React.ReactNode}) => (
        <div data-testid='scrollbar'>
            {children}
        </div>
    ),
}));

jest.mock('@mattermost/compass-ui/components/tabs', () => ({
    Tabs: () => null,
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

describe('Divider specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('sandwiches a Compass Divider in a compact gallery preview', () => {
        const view = render(<DividerPreview/>);
        rendered = view;

        const stack = view.container.firstElementChild as HTMLElement;
        const children = Array.from(stack.children);

        expect(stack.className).toEqual('CompassShowcase__stack');
        expect(stack.style.width).toEqual('88px');
        expect(children).toHaveLength(3);
        expect(children[0].tagName).toEqual('SPAN');
        expect(children[0].textContent).toEqual('Above');
        expect(children[1].getAttribute('data-testid')).toEqual('compass-divider');
        expect(children[2].tagName).toEqual('SPAN');
        expect(children[2].textContent).toEqual('Below');
    });

    it('keeps the full-width Above / Divider / Below sandwich in detail', () => {
        const view = render(<DividerDetail/>);
        rendered = view;

        const stack = view.container.firstElementChild as HTMLElement;
        const children = Array.from(stack.children);

        expect(stack.className).toEqual('CompassShowcase__stack');
        expect(stack.style.width).toEqual('');
        expect(children).toHaveLength(3);
        expect(children[0].textContent).toEqual('Above');
        expect(children[1].getAttribute('data-testid')).toEqual('compass-divider');
        expect(children[2].textContent).toEqual('Below');
    });
});
