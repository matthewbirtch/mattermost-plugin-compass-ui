// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState} from 'react';

import {CATALOG} from './catalog';
import Detail from './detail';
import Gallery from './gallery';

import './showcase.scss';

export default function ShowcaseRHS() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const entry = CATALOG.find((item) => item.id === selectedId);

    if (entry) {
        return (
            <Detail
                entry={entry}
                onBack={() => setSelectedId(null)}
            />
        );
    }

    return (
        <Gallery onSelect={setSelectedId}/>
    );
}
