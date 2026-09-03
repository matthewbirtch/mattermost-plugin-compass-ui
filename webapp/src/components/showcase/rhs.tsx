// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect, useRef, useState} from 'react';

import {useExitAnimation} from '@mattermost/compass-ui/hooks/use-exit-animation';

import {CATALOG} from './catalog';
import Detail from './detail';
import Gallery from './gallery';
import type {CatalogEntry} from './types';

import './showcase.scss';

const PUSH_DURATION_MS = 300;

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return false;
        }
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    useEffect(() => {
        if (!window.matchMedia) {
            return undefined;
        }

        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setReduced(media.matches);
        onChange();
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    return reduced;
}

export default function ShowcaseRHS() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [entered, setEntered] = useState(false);
    const [exitEntry, setExitEntry] = useState<CatalogEntry | null>(null);
    const galleryPaneRef = useRef<HTMLDivElement>(null);
    const reduceMotion = usePrefersReducedMotion();

    const selected = CATALOG.find((item) => item.id === selectedId) ?? null;
    const entry = selected ?? exitEntry;
    const open = selected !== null;
    const durationMs = reduceMotion ? 0 : PUSH_DURATION_MS;
    const {rendered} = useExitAnimation(open, durationMs);

    // Combine open || rendered so Detail mounts on the same click frame
    // (the hook's rendered flag lags one effect).
    const showDetail = Boolean(entry) && (open || rendered);
    const pushed = open && entered;

    useEffect(() => {
        if (!open) {
            setEntered(false);
            return undefined;
        }

        if (reduceMotion) {
            setEntered(true);
            return undefined;
        }

        // Mount off-screen, then double-rAF so --pushed applies after paint.
        let secondFrame = 0;
        const firstFrame = window.requestAnimationFrame(() => {
            secondFrame = window.requestAnimationFrame(() => {
                setEntered(true);
            });
        });

        return () => {
            window.cancelAnimationFrame(firstFrame);
            window.cancelAnimationFrame(secondFrame);
        };
    }, [open, reduceMotion]);

    useEffect(() => {
        const node = galleryPaneRef.current;
        if (!node) {
            return;
        }
        if (pushed) {
            node.setAttribute('inert', '');
        } else {
            node.removeAttribute('inert');
        }
    }, [pushed]);

    const handleSelect = (id: string) => {
        const next = CATALOG.find((item) => item.id === id) ?? null;
        setSelectedId(id);
        if (next) {
            setExitEntry(next);
        }
    };

    let navClassName = 'CompassShowcase__nav';
    if (pushed) {
        navClassName += ' CompassShowcase__nav--pushed';
    }

    return (
        <div className={navClassName}>
            <div
                ref={galleryPaneRef}
                className='CompassShowcase__pane CompassShowcase__pane--root'
                aria-hidden={pushed}
            >
                <Gallery onSelect={handleSelect}/>
            </div>
            {showDetail && entry && (
                <div className='CompassShowcase__pane CompassShowcase__pane--push'>
                    <Detail
                        entry={entry}
                        onBack={() => setSelectedId(null)}
                    />
                </div>
            )}
        </div>
    );
}
