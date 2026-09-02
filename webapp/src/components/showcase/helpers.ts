// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {CATEGORIES} from './types';
import type {CatalogEntry, CategoryFilter} from './types';

export function filterCatalog(
    entries: CatalogEntry[],
    query: string,
): CatalogEntry[] {
    const q = query.trim().toLowerCase();
    if (!q) {
        return entries;
    }
    return entries.filter((entry) => (
        entry.name.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q)
    ));
}

export function countByCategory(
    entries: CatalogEntry[],
    query: string,
): Record<CategoryFilter, number> {
    const matching = filterCatalog(entries, query);
    const counts = {all: matching.length} as Record<CategoryFilter, number>;
    for (const category of CATEGORIES) {
        counts[category] = 0;
    }
    for (const entry of matching) {
        counts[entry.category] += 1;
    }
    return counts;
}
