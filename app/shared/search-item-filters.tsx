'use client';

import React from 'react';
import { useDebounce } from 'react-use';
import { SearchItemUI } from './search-item-ui';
import { Item } from '../types';
import { searchItem } from '@/server/actions/search-item';

export const SearchInputFilters = () => {

    // Данные и состояние
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [items, setItems] = React.useState<Item[]>([]);

    // Получение и обработка данных
    const getItems = () => {
        searchItem(searchQuery).then((items) => {
            console.log(items);
            setItems(items)
        });

    };

    useDebounce(
        async () => {
            try {
                getItems();
            } catch (e) {
                console.error(e);
            }
        },
        250,
        [searchQuery]
    );

    const onClick = (item: Item) => {
        window.open(item.sourceLink, '_blank');
    }


    return (
        <SearchItemUI items={items} onClick={onClick} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setItems={setItems} className='mx-4 h-9' />

    )
}

