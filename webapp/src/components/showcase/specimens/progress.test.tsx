// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {PaginationDotsDetail, PaginationDotsPreview} from './progress';

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

describe('PaginationDots specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('renders a static gallery preview that does not change on click', () => {
        const view = render(<PaginationDotsPreview/>);
        rendered = view;

        const pageTwo = view.container.querySelector('[aria-label="Page 2"]');
        expect(view.container.querySelectorAll('[role="tab"]')).toHaveLength(4);
        expect(pageTwo?.getAttribute('aria-selected')).toEqual('true');

        act(() => {
            (view.container.querySelector('[aria-label="Page 1"]') as HTMLButtonElement | null)?.click();
        });

        expect(pageTwo?.getAttribute('aria-selected')).toEqual('true');
        expect(view.container.querySelector('[aria-label="Page 1"]')?.getAttribute('aria-selected')).toEqual('false');
    });

    it('updates the active dot when a page is clicked in the detail view', () => {
        const view = render(<PaginationDotsDetail/>);
        rendered = view;

        const pageOne = view.container.querySelector('[aria-label="Page 1"]');
        const pageFour = view.container.querySelector('[aria-label="Page 4"]');

        expect(view.container.querySelectorAll('[role="tab"]')).toHaveLength(5);
        expect(pageOne?.getAttribute('aria-selected')).toEqual('true');
        expect(pageFour?.getAttribute('aria-selected')).toEqual('false');

        act(() => {
            (pageFour as HTMLButtonElement | null)?.click();
        });

        expect(pageOne?.getAttribute('aria-selected')).toEqual('false');
        expect(pageFour?.getAttribute('aria-selected')).toEqual('true');
    });
});
