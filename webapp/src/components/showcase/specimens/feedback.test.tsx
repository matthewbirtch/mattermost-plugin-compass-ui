// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {PopoverNoticeDetail, PopoverNoticePreview} from './feedback';

jest.mock('@mattermost/compass-ui/components/popover-notice', () => ({
    PopoverNotice: ({
        title,
        variant,
        children,
    }: {
        title: string;
        variant?: string;
        children: React.ReactNode;
    }) => (
        <div
            data-testid='popover-notice'
            data-variant={variant}
        >
            {title}
            {children}
        </div>
    ),
}));

jest.mock('@mattermost/compass-ui/components/error-message', () => ({
    ErrorMessage: () => null,
}));

jest.mock('@mattermost/compass-ui/components/section-notice', () => ({
    SectionNotice: () => null,
}));

jest.mock('@mattermost/compass-ui/components/toast', () => ({
    Toast: () => null,
}));

jest.mock('@mattermost/compass-ui/components/tooltip', () => ({
    Tooltip: () => null,
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

describe('PopoverNotice specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('passes the info variant so the gallery tile shows the leading icon', () => {
        const view = render(<PopoverNoticePreview/>);
        rendered = view;

        const artboard = view.container.firstElementChild as HTMLElement;
        const notice = view.container.querySelector('[data-testid="popover-notice"]');

        expect(artboard.className).toEqual('CompassShowcase__widePreview');
        expect(notice?.getAttribute('data-variant')).toEqual('info');
        expect(notice?.textContent).toContain('Try keyboard shortcuts');
        expect(notice?.textContent).toContain('Press ⌘K to jump to a channel.');
    });

    it('keeps the info variant on the detail specimen', () => {
        const view = render(<PopoverNoticeDetail/>);
        rendered = view;

        const notice = view.container.querySelector('[data-testid="popover-notice"]');
        expect(notice?.getAttribute('data-variant')).toEqual('info');
    });
});
