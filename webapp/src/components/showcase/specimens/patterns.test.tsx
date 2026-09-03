// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {TourPointDetail, TourPointPreview} from './patterns';

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

describe('TourPoint specimens', () => {
    let rendered: Rendered | undefined;

    afterEach(() => {
        rendered?.unmount();
    });

    it('wraps the gallery preview so the pulse fits inside the overflow tile', () => {
        const view = render(<TourPointPreview/>);
        rendered = view;

        const artboard = view.container.firstElementChild as HTMLElement;
        expect(artboard.className).toEqual('CompassShowcase__tourPointPreview');
        expect(artboard.textContent).toContain('Browse components');
    });

    it('wraps the detail view so SimpleBar padding contains the pointer', () => {
        const view = render(<TourPointDetail/>);
        rendered = view;

        const artboard = view.container.firstElementChild as HTMLElement;
        expect(artboard.className).toEqual('CompassShowcase__tourPointDetail');
        expect(artboard.textContent).toContain('Compass UI');
    });
});
