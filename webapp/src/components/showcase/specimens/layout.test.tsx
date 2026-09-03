// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {DividerDetail, DividerPreview, ScrollbarDetail, ScrollbarPreview} from './layout';

jest.mock('@mattermost/compass-ui/components/divider', () => ({
    Divider: () => (
        <hr data-testid='compass-divider'/>
    ),
}));

jest.mock('@mattermost/compass-ui/components/scrollbar', () => ({
    Scrollbar: ({
        alwaysVisible,
        children,
        className,
        style,
    }: {
        alwaysVisible?: boolean;
        children?: React.ReactNode;
        className?: string;
        style?: React.CSSProperties;
    }) => (
        <div
            className={className}
            data-always-visible={String(Boolean(alwaysVisible))}
            data-testid='scrollbar'
            style={style}
        >
            {children}
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

describe('Scrollbar specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('renders a compact overflowing well without explanatory copy', () => {
        const view = render(<ScrollbarPreview/>);
        rendered = view;

        const scrollbar = view.container.querySelector('[data-testid="scrollbar"]') as HTMLElement;
        const well = view.container.querySelector('.CompassShowcase__scrollbarDemo') as HTMLElement;

        expect(scrollbar.className).toEqual('CompassShowcase__scrollbarPreview');
        expect(scrollbar.getAttribute('data-always-visible')).toEqual('true');
        expect(scrollbar.style.height).toEqual('80px');
        expect(scrollbar.style.width).toEqual('64px');
        expect(well).not.toBeNull();
        expect(well.style.height).toEqual('160px');
        expect(view.container.querySelectorAll('.CompassShowcase__scrollbarDemoLine')).toHaveLength(6);
        expect(view.container.textContent).not.toContain('Compass Scrollbar wraps overflowing content');
        expect(view.container.textContent).not.toContain('Keep scrolling to see the track');
        expect(view.container.textContent).not.toContain('The RHS gallery uses this same control');
    });

    it('keeps the explanatory copy in the detail view', () => {
        const view = render(<ScrollbarDetail/>);
        rendered = view;

        const scrollbar = view.container.querySelector('[data-testid="scrollbar"]') as HTMLElement;
        const well = view.container.querySelector('.CompassShowcase__scrollbarDemo') as HTMLElement;

        expect(scrollbar.getAttribute('data-always-visible')).toEqual('true');
        expect(scrollbar.style.height).toEqual('96px');
        expect(well.style.height).toEqual('180px');
        expect(view.container.textContent).toContain('alwaysVisible keeps the thumb on screen while content overflows.');
        expect(view.container.querySelectorAll('.CompassShowcase__scrollbarDemoLine')).toHaveLength(0);
    });
});
