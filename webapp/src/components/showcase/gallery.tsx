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

    const entries = useMemo(
        () => filterCatalog(CATALOG, query),
        [query],
    );

    return (
        <div className='CompassShowcase'>
            <div className='CompassShowcase__chrome'>
                <SearchInput
                    label='Search components'
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onClear={() => setQuery('')}
                />
            </div>
            <Scrollbar className='CompassShowcase__scroll'>
                {entries.length === 0 ? (
                    <EmptyState
                        title='No components match'
                        description='Try a different search.'
                        action={{
                            children: 'Clear search',
                            onClick: () => setQuery(''),
                        }}
                    />
                ) : (
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
            <ScaledPreview>
                <Preview/>
            </ScaledPreview>
            <span className='CompassShowcase__cardName'>
                {entry.name}
            </span>
        </button>
    );
}
