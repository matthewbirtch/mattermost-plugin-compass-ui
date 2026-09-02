// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useMemo, useState} from 'react';

import {EmptyState} from '@mattermost/compass-ui/components/empty-state';
import {MenuItem} from '@mattermost/compass-ui/components/menu-item';
import {
    PopoverMenuGroup,
    PopoverMenuGroupTitle,
} from '@mattermost/compass-ui/components/popover-menu';
import {Scrollbar} from '@mattermost/compass-ui/components/scrollbar';
import {SearchInput} from '@mattermost/compass-ui/components/search-input';

import {CATALOG} from './catalog';
import {filterCatalog} from './helpers';
import {CATEGORIES, CATEGORY_LABELS} from './types';

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
                    <div className='CompassShowcase__list'>
                        {CATEGORIES.map((section) => {
                            const items = entries.filter((entry) => entry.category === section);
                            if (items.length === 0) {
                                return null;
                            }
                            return (
                                <PopoverMenuGroup
                                    key={section}
                                    aria-label={CATEGORY_LABELS[section]}
                                >
                                    <PopoverMenuGroupTitle>
                                        {CATEGORY_LABELS[section]}
                                    </PopoverMenuGroupTitle>
                                    {items.map((entry) => (
                                        <MenuItem
                                            key={entry.id}
                                            label={entry.name}
                                            leadingElement={false}
                                            type='button'
                                            onClick={() => onSelect(entry.id)}
                                        />
                                    ))}
                                </PopoverMenuGroup>
                            );
                        })}
                    </div>
                )}
            </Scrollbar>
        </div>
    );
}
