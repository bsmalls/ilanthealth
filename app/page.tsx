"use client";

import Search from "@/app/ui/search";
import BookCardsWrapper from "@/app/ui/books";
import { fetcher } from "@/app/lib/fetcher";
import { booksAndAuthors } from "./lib/booksAndAuthors";
import { useDebouncedCallback } from "use-debounce";
import useSWR from "swr";
import qs from "qs";
import { usePathname, useRouter } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const {
    data: results,
    isLoading,
    error,
  } = useSWR(
    query
      ? `?${qs.stringify({
          search_term: query,
          start_index: currentPage,
        })}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const handleUpdateSearch = useDebouncedCallback((value: string): void => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
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
