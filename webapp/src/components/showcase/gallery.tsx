// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useMemo, useState} from 'react';

import {EmptyState} from '@mattermost/compass-ui/components/empty-state';
import {Scrollbar} from '@mattermost/compass-ui/components/scrollbar';
import {SearchInput} from '@mattermost/compass-ui/components/search-input';

import {CATALOG} from './catalog';
import {filterCatalog} from './helpers';
import ScaledPreview from './scaled-preview';
import {CATEGORIES, CATEGORY_LABELS} from './types';
import type {CatalogEntry} from './types';

type Props = {
    onSelect: (id: string) => void;
};

export default function Gallery({onSelect}: Props) {
    const [query, setQuery] = useState('');
    const isSearching = query.trim() !== '';

    const entries = useMemo(
        () => filterCatalog(CATALOG, query),
        [query],
    );

    let body: React.ReactNode;
    if (entries.length === 0) {
        body = (
            <EmptyState
                title='No components match'
                description='Try a different search.'
                action={{
                    children: 'Clear search',
                    onClick: () => setQuery(''),
                }}
            />
        );
    } else if (isSearching) {
        body = (
            <div className='CompassShowcase__sections'>
                <div className='CompassShowcase__grid'>
                    {entries.map((entry) => (
                        <CatalogCard
                            key={entry.id}
                            entry={entry}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        body = (
            <div className='CompassShowcase__sections'>
                {CATEGORIES.map((section) => {
                    const items = entries.filter((entry) => entry.category === section);
                    if (items.length === 0) {
                        return null;
                    }
                    return (
                        <section
                            key={section}
                            className='CompassShowcase__section'
                            aria-label={CATEGORY_LABELS[section]}
                        >
                            <h2 className='CompassShowcase__sectionTitle'>
                                {CATEGORY_LABELS[section]}
                            </h2>
                            <div className='CompassShowcase__grid'>
                                {items.map((entry) => (
                                    <CatalogCard
                                        key={entry.id}
                                        entry={entry}
                                        onSelect={onSelect}
                                    />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        );
    }

    return (
        <div className='CompassShowcase'>
            <div className='CompassShowcase__chrome'>
                <SearchInput
                    placeholder='Search'
                    aria-label='Search'
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onClear={() => setQuery('')}
                />
            </div>
            <Scrollbar className='CompassShowcase__scroll'>
                {body}
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

    const select = () => onSelect(entry.id);

    return (
        <div
            className='CompassShowcase__card'
            role='button'
            tabIndex={0}
            onClick={select}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    select();
                }
            }}
        >
            <ScaledPreview>
                <Preview/>
            </ScaledPreview>
            <span className='CompassShowcase__cardMeta'>
                <span className='CompassShowcase__cardName'>
                    {entry.name}
                </span>
            </span>
        </div>
    );
}
