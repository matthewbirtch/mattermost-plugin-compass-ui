// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {CATALOG} from './catalog';
import {countByCategory, filterCatalog} from './helpers';
import {CATEGORIES, categoryPath} from './types';
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
    it('returns every entry when the query is empty', () => {
        expect(filterCatalog(fixture, '')).toHaveLength(3);
        expect(filterCatalog(fixture, '   ')).toHaveLength(3);
    });

    it('filters by name, description, and category text', () => {
        expect(filterCatalog(fixture, 'primary').map((entry) => entry.id)).toEqual(['button']);
        expect(filterCatalog(fixture, 'field').map((entry) => entry.id)).toEqual(['text-input']);
        expect(filterCatalog(fixture, 'actions').map((entry) => entry.id)).toEqual(['button']);
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

    it('opts only Team Avatar into the sidebar preview surface', () => {
        const entry = CATALOG.find((item) => item.id === 'team-avatar');
        expect(entry?.previewSurface).toEqual('sidebar');
        expect(CATALOG.filter((item) => item.previewSurface).map((item) => item.id)).toEqual(['team-avatar']);
    });
});

describe('categoryPath', () => {
    it('builds a truncated-style Components breadcrumb', () => {
        expect(categoryPath('actions')).toEqual('Components - Actions');
        expect(categoryPath('forms')).toEqual('Components - Forms and Input');
    });
});
