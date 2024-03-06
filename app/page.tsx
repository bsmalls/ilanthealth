"use client";

import { useState } from "react";
import Search from "@/app/ui/search";
import BookCardsWrapper from "@/app/ui/books";
import { fetcher } from "@/app/lib/fetcher";
import { booksAndAuthors } from "./lib/booksAndAuthors";
import { useDebouncedCallback } from "use-debounce";
import useSWR from "swr";
import qs from "qs";

export default function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const currentPage = Number(searchParams?.page) || 1;
  const {
    data: results,
    isLoading,
    error,
  } = useSWR(
    searchTerm
      ? `?${qs.stringify({
          search_term: searchTerm,
          start_index: currentPage,
        })}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const handleUpdateSearch = useDebouncedCallback((value: string): void => {
    setSearchTerm(value);
  }, 400);

  const getBookorAuthor = (): string => {
    const randomIndex: number = Math.floor(
      Math.random() * booksAndAuthors.length
    );
    return booksAndAuthors[randomIndex];
  };

  return (
    <div className="w-full">
      <div className="h-full w-full px-2 pb-2 pt-10 sm:px-6 sm:pb-6 md:px-10 md:pt-16  bg-blue-800">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex w-full items-center text-center justify-between">
            <h1 className="text-2xl w-full font-bold text-white">
              Search Google Books
            </h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <Search
              handleUpdateSearch={handleUpdateSearch}
              placeholder={`e.g. ${getBookorAuthor()}`}
            />
          </div>
        </div>
      </div>
      <BookCardsWrapper results={results} error={error} isLoading={isLoading} />
    </div>
  );
}
