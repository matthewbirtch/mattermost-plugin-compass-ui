// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import ShowcaseRHS from './rhs';

jest.mock('./gallery', () => ({
    __esModule: true,
    default: ({onSelect}: {onSelect: (id: string) => void}) => (
        <button
            type='button'
            onClick={() => onSelect('button')}
        >
            {'Open button'}
        </button>
    ),
}));

jest.mock('./detail', () => ({
    __esModule: true,
    default: ({entry, onBack}: {entry: {name: string}; onBack: () => void}) => (
        <div>
            <span>{entry.name}</span>
            <button
                type='button'
                onClick={onBack}
            >
                {'Back'}
            </button>
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

function mockMatchMedia(matches: boolean) {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: jest.fn().mockImplementation((query: string) => ({
            matches,
            media: query,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        })),
    });
}

describe('ShowcaseRHS navigation stack', () => {
    let rafQueue: FrameRequestCallback[];
    let rendered: Rendered | undefined;

    beforeEach(() => {
        jest.useFakeTimers();
        mockMatchMedia(false);
        rafQueue = [];
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            rafQueue.push(cb);
            return rafQueue.length;
        });
        jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(jest.fn());
    });

    afterEach(() => {
        rendered?.unmount();
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    function flushRaf() {
        act(() => {
            const queued = rafQueue;
            rafQueue = [];
            queued.forEach((cb) => cb(0));
        });
    }

    it('keeps the gallery mounted and pushes detail from the right', () => {
        const view = render(<ShowcaseRHS/>);
        rendered = view;
        const {container} = view;

        expect(container.querySelector('.CompassShowcase__pane--push')).toBeNull();
        expect(container.querySelector('.CompassShowcase__nav--pushed')).toBeNull();

        act(() => {
            container.querySelector('button')?.click();
        });

        const pushPane = container.querySelector('.CompassShowcase__pane--push');
        expect(pushPane).not.toBeNull();
        expect(pushPane?.textContent).toContain('Button');
        expect(container.querySelector('.CompassShowcase__nav--pushed')).toBeNull();
        expect(container.textContent).toContain('Open button');

        flushRaf();
        flushRaf();

        const nav = container.querySelector('.CompassShowcase__nav');
        expect(nav?.className).toContain('CompassShowcase__nav--pushed');
        const galleryPane = container.querySelector('.CompassShowcase__pane--root');
        expect(galleryPane?.getAttribute('aria-hidden')).toEqual('true');
        expect(galleryPane?.hasAttribute('inert')).toEqual(true);
    });

    it('keeps detail mounted through the pop, then unmounts', () => {
        const view = render(<ShowcaseRHS/>);
        rendered = view;
        const {container} = view;

        act(() => {
            container.querySelector('button')?.click();
        });
        flushRaf();
        flushRaf();

        const back = Array.from(container.querySelectorAll('button')).
            find((button) => button.textContent === 'Back');
        act(() => {
            back?.click();
        });

        expect(container.querySelector('.CompassShowcase__nav--pushed')).toBeNull();
        expect(container.querySelector('.CompassShowcase__pane--push')).not.toBeNull();
        expect(container.textContent).toContain('Button');

        act(() => {
            jest.advanceTimersByTime(300);
        });

        expect(container.querySelector('.CompassShowcase__pane--push')).toBeNull();
        expect(container.textContent).toContain('Open button');
    });

    it('unmounts immediately when the user prefers reduced motion', () => {
        mockMatchMedia(true);
        const view = render(<ShowcaseRHS/>);
        rendered = view;
        const {container} = view;

        act(() => {
            container.querySelector('button')?.click();
        });

        expect(container.querySelector('.CompassShowcase__nav--pushed')).not.toBeNull();

        const back = Array.from(container.querySelectorAll('button')).
            find((button) => button.textContent === 'Back');
        act(() => {
            back?.click();
        });
        act(() => {
            jest.advanceTimersByTime(0);
        });

        expect(container.querySelector('.CompassShowcase__pane--push')).toBeNull();
    });
});
