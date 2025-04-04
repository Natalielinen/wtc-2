'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { Search } from 'lucide-react';
import { useClickAway, useDebounce } from 'react-use';
import { Film, Item } from '../types';
import { genres } from '../constants/options';

interface Props {
    className?: string;
    onClick: (item: Item) => void;
}

export const SearchInput: React.FC<Props> = ({ className, onClick }) => {

    const [focused, setFocused] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [items, setItems] = React.useState<Item[]>([]);

    const ref = React.useRef<HTMLInputElement>(null);

    useClickAway(ref, () => setFocused(false));


    const getFilms = () => {
        fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films?page=1&keyword=' + searchQuery, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'fc40b735-f24a-4d1e-970e-eb87b98c8903',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setItems(json.items.map((film: Film) => ({
                id: film.kinopoiskId,
                category: {
                    value: '1',
                    label: 'Фильмы'
                },
                genre: [genres[0]],
                sourceLink: '',
                name: film?.nameRu || film?.nameEn || film?.nameOriginal,
                imageUrl: film?.posterUrl,
            }))))
            .catch(err => console.log(err))

    }


    useDebounce(
        async () => {
            try {
                getFilms();

            } catch (e) {
                console.error(e);
            }

        },
        250,
        [searchQuery]
    );

    const onClickItem = (item: Item) => {
        setFocused(false);
        setSearchQuery(item.name);
        setItems([]);
        onClick(item);
    };

    return (
        <>
            {
                focused &&
                <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30' />
            }

            <div
                ref={ref}
                className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}>

                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />

                <input
                    className="rounded-2xl outline-none w-full pl-11 bg-gray-100"
                    type='text'
                    placeholder='Найти фильм...'
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                {
                    items.length > 0 && <div className={cn(
                        'absolute w-full h-[300px] overflow-y-scroll bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                        focused && 'visible opacity-100 top-12',
                    )}>
                        {
                            items.map(item => (
                                <p
                                    key={item.id}
                                    className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'
                                    onClick={() => onClickItem(item)}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        className='rounded-sm h-8 w-8'
                                        src={item.imageUrl}
                                        alt={item.name}
                                        width={32}
                                        height={32}
                                    />
                                    <span >
                                        {item.name}
                                    </span>
                                </p>

                            ))
                        }

                    </div>
                }


            </div>
        </>

    )
}

