// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useMemo, useState} from 'react';

import {EmptyState} from '@mattermost/compass-ui/components/empty-state';
import {Scrollbar} from '@mattermost/compass-ui/components/scrollbar';
import {SearchInput} from '@mattermost/compass-ui/components/search-input';
import {Tabs} from '@mattermost/compass-ui/components/tabs';

import {CATALOG} from './catalog';
import {countByCategory, filterCatalog} from './helpers';
import {CATEGORIES, CATEGORY_LABELS} from './types';
import type {CatalogEntry, CategoryFilter} from './types';

type Props = {
    onSelect: (id: string) => void;
};

export default function Gallery({onSelect}: Props) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<CategoryFilter>('all');

    const counts = useMemo(() => countByCategory(CATALOG, query), [query]);
    const entries = useMemo(
        () => filterCatalog(CATALOG, query, category),
        [query, category],
    );

    const tabs = useMemo(() => [
        {key: 'all', label: 'All', countBadge: counts.all},
        ...CATEGORIES.map((key) => ({
            key,
            label: CATEGORY_LABELS[key],
            countBadge: counts[key],
        })),
    ], [counts]);

    const sections = category === 'all' ? CATEGORIES : [category];

    return (
        <div className='CompassShowcase'>
            <div className='CompassShowcase__chrome'>
                <SearchInput
                    label='Search components'
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onClear={() => setQuery('')}
                />
                <div className='CompassShowcase__tabs'>
                    <Tabs
                        tabs={tabs}
                        activeKey={category}
                        onChange={(key) => setCategory(key as CategoryFilter)}
                    />
                </div>
            </div>
            <Scrollbar className='CompassShowcase__scroll'>
                {entries.length === 0 ? (
                    <EmptyState
                        title='No components match'
                        description='Try a different search or category.'
                        action={{
                            children: 'Clear filters',
                            onClick: () => {
                                setQuery('');
                                setCategory('all');
                            },
                        }}
                    />
                ) : (
                    <div className='CompassShowcase__body'>
                        {sections.map((section) => {
                            const items = entries.filter((entry) => entry.category === section);
                            if (items.length === 0) {
                                return null;
                            }
                            return (
                                <section
                                    key={section}
                                    className='CompassShowcase__section'
                                >
                                    <h2 className='CompassShowcase__sectionTitle'>
                                        {CATEGORY_LABELS[section]}
                                    </h2>
                                    {items.map((entry) => (
                                        <CatalogCard
                                            key={entry.id}
                                            entry={entry}
                                            onSelect={onSelect}
                                        />
                                    ))}
                                </section>
                            );
                        })}
                    </div>
                )}
            </Scrollbar>
        </div>
    );
}

type CardProps = {
    entry: CatalogEntry;
    onSelect: (id: string) => void;
};

function CatalogCard({entry, onSelect}: CardProps) {
    const Preview = entry.preview;

    return (
        <button
            type='button'
            className='CompassShowcase__card'
            onClick={() => onSelect(entry.id)}
        >
            <div className='CompassShowcase__cardPreview'>
                <Preview/>
            </div>
            <p className='CompassShowcase__cardName'>
                {entry.name}
            </p>
        </button>
    );
}
