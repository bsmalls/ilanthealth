"use client"

import { useState } from 'react';
import Search from '@/app/ui/search';
import BookCardsWrapper from '@/app/ui/books';
import { useDebouncedCallback } from 'use-debounce';
import useSWR from 'swr';
import qs from 'qs';
 
export default function Page() {
	const [searchTerm, setSearchTerm] = useState('');
	const fetcher = (url: string) => fetch(url).then((res) => res.json())

	const { data: results, isLoading, error } = useSWR(
		searchTerm ? `/api/v1/books?${qs.stringify({ search_term: searchTerm })}` : null,
		fetcher,
		{ suspense: true }
	);

	const handleUpdateSearch = useDebouncedCallback((value:string):void => {
		setSearchTerm(value);
    }, 400);

    return (
        <div className="w-full">
            <div className="h-full w-full px-10 pt-16 pb-6 bg-blue-800">
                <div className="flex w-full items-center text-center justify-between">
                    <h1 className="text-2xl w-full font-bold text-white">Ilant Health Book Search</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2">
                    <Search handleUpdateSearch={handleUpdateSearch} placeholder="Search Google Books..." />
                </div>
            </div>
			<BookCardsWrapper results={results} error={error} isLoading={isLoading} />
        </div>
    );
}