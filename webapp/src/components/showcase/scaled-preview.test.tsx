// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {createRoot} from 'react-dom/client';
import type {Root} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import ScaledPreview from './scaled-preview';

describe('ScaledPreview', () => {
    let container: HTMLDivElement;
    let root: Root;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);

        jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function clientWidth(this: HTMLElement) {
            if (this.classList.contains('CompassShowcase__cardPreview')) {
                return 119;
            }
            if (this.classList.contains('CompassShowcase__cardStage')) {
                return 280;
            }
            return 0;
        });
        jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(function clientHeight(this: HTMLElement) {
            if (this.classList.contains('CompassShowcase__cardPreview')) {
                return 119;
            }
            if (this.classList.contains('CompassShowcase__cardStage')) {
                return 120;
            }
            return 0;
        });
        jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function offsetWidth(this: HTMLElement) {
            if (this.classList.contains('CompassShowcase__cardStage')) {
                return 280;
            }
            return 0;
        });
        jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function offsetHeight(this: HTMLElement) {
            if (this.classList.contains('CompassShowcase__cardStage')) {
                return 120;
            }
            return 0;
        });
        jest.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(function scrollWidth(this: HTMLElement) {
            if (this.classList.contains('CompassShowcase__cardStage')) {
                return 664;
            }
            return 0;
        });
        jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(function scrollHeight(this: HTMLElement) {
            if (this.classList.contains('CompassShowcase__cardStage')) {
                return 312;
            }
            return 0;
        });
    });

    afterEach(() => {
        act(() => {
            root.unmount();
        });
        container.remove();
        jest.restoreAllMocks();
    });

    it('scales from overflowing stage content, not the 280px max-width cap', () => {
        act(() => {
            root.render(
                <ScaledPreview>
                    <div>{'preview'}</div>
                </ScaledPreview>,
            );
        });

        const scaler = container.querySelector('.CompassShowcase__cardScaler') as HTMLElement;
        const stage = container.querySelector('.CompassShowcase__cardStage') as HTMLElement;
        const scale = Number((stage.style.transform.match(/scale\(([^)]+)\)/) || [])[1]);

        expect(scaler.style.width).toEqual('119px');
        expect(scale).toBeCloseTo(119 / 664, 5);
        expect(scale).toBeLessThan(119 / 280);
    });
});
