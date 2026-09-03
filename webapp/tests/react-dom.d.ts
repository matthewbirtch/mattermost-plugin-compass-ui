// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

declare module 'react-dom/client' {
    import type {ReactNode} from 'react';

    export type Root = {
        render: (ui: ReactNode) => void;
        unmount: () => void;
    };

    export function createRoot(container: Element): Root;
}

declare module 'react-dom/test-utils' {
    export function act(callback: () => void): void;
}
