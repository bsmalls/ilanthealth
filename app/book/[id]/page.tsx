"use client";

import useSWR from "swr";
import { BookDetails } from "@/app/ui/books";
import { fetcher } from "@/app/lib/fetcher";
import { BookDetailsSkeleton } from "@/app/ui/skeletons";

export default function Page({ params }: { params: { id: string } }) {
  const {
    data: result,
    isLoading,
    error,
  } = useSWR(`/${params.id}`, fetcher, {
    revalidateOnFocus: false,
  });

  return (
    <>
      {error && <div>An error has occured: {error}</div>}
      {isLoading && <BookDetailsSkeleton />}
      {result && <BookDetails result={result} id={params.id} />}
    </>
  );
}
