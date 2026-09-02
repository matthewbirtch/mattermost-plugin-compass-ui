// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {CATEGORIES} from './types';
import type {CatalogEntry, CategoryFilter} from './types';

export function filterCatalog(
    entries: CatalogEntry[],
    query: string,
    category: CategoryFilter,
): CatalogEntry[] {
    const q = query.trim().toLowerCase();
    return entries.filter((entry) => {
        if (category !== 'all' && entry.category !== category) {
            return false;
        }
        if (!q) {
            return true;
        }
        return (
            entry.name.toLowerCase().includes(q) ||
            entry.category.toLowerCase().includes(q) ||
            entry.description.toLowerCase().includes(q)
        );
    });
}

export function countByCategory(
    entries: CatalogEntry[],
    query: string,
): Record<CategoryFilter, number> {
    const matching = filterCatalog(entries, query, 'all');
    const counts = {all: matching.length} as Record<CategoryFilter, number>;
    for (const category of CATEGORIES) {
        counts[category] = 0;
    }
    for (const entry of matching) {
        counts[entry.category] += 1;
    }
    return counts;
}
