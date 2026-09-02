// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {CATALOG} from './catalog';
import {countByCategory, filterCatalog} from './helpers';
import {CATEGORIES} from './types';
import type {CatalogEntry} from './types';

const fixture: CatalogEntry[] = [
    {
        id: 'button',
        name: 'Button',
        category: 'actions',
        description: 'Primary actions',
        preview: () => null,
        detail: () => null,
    },
    {
        id: 'text-input',
        name: 'Text Input',
        category: 'forms',
        description: 'Single-line field',
        preview: () => null,
        detail: () => null,
    },
    {
        id: 'toast',
        name: 'Toast',
        category: 'feedback',
        description: 'Transient notice',
        preview: () => null,
        detail: () => null,
    },
];

describe('filterCatalog', () => {
    it('returns every entry when query and category are unrestricted', () => {
        expect(filterCatalog(fixture, '', 'all')).toHaveLength(3);
    });

    it('filters by category', () => {
        expect(filterCatalog(fixture, '', 'forms').map((entry) => entry.id)).toEqual(['text-input']);
    });

    it('filters by name, description, and category text', () => {
        expect(filterCatalog(fixture, 'primary', 'all').map((entry) => entry.id)).toEqual(['button']);
        expect(filterCatalog(fixture, 'field', 'all').map((entry) => entry.id)).toEqual(['text-input']);
        expect(filterCatalog(fixture, 'actions', 'all').map((entry) => entry.id)).toEqual(['button']);
    });

    it('intersects search with the selected category', () => {
        expect(filterCatalog(fixture, 'button', 'forms')).toHaveLength(0);
        expect(filterCatalog(fixture, 'button', 'actions')).toHaveLength(1);
    });
});

describe('countByCategory', () => {
    it('counts matches per category for the current query', () => {
        expect(countByCategory(fixture, '')).toMatchObject({
            all: 3,
            actions: 1,
            forms: 1,
            feedback: 1,
            images: 0,
        });
        expect(countByCategory(fixture, 'notice')).toMatchObject({
            all: 1,
            feedback: 1,
            actions: 0,
        });
    });
});

describe('CATALOG', () => {
    it('covers every showcase category', () => {
        const present = new Set(CATALOG.map((entry) => entry.category));
        expect([...CATEGORIES].sort()).toEqual([...present].sort());
    });

    it('uses unique ids', () => {
        const ids = CATALOG.map((entry) => entry.id);
        expect(new Set(ids).size).toEqual(ids.length);
    });
});
