// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

if (typeof globalThis.ResizeObserver === 'undefined') {
    (globalThis as {ResizeObserver?: unknown}).ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
}

export {};
