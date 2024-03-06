"use client";

import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();

  return (
    <div className="h-full w-full py-4 px-10 bg-blue-800">
      <div className="flex max-w-screen-xl mx-auto">
        <span className="text-white text-xl transition hover:text-[rgb(244,244,244)]">
          Ilant Health Book Search
        </span>
        <Link
          className={
            "ml-auto group/back flex flex-row justify-end items-center rounded-full py-1 pl-4 pr-3 text-sm text-gray-500 transition bg-[rgb(244,244,244)] hover:bg-gray-200"
          }
          href={{
            pathname: `/`,
            query: {
              query: searchParams.get("query")?.toString(),
              page: searchParams.get("page")?.toString(),
            },
          }}
        >
          <IoIosArrowBack className="mt-px h-5 w-5 text-gray-400 transition group-hover/back:-translate-x-0.5 group-hover/back:text-gray-500" />
          <span className="font-semibold transition group-hover/back:text-gray-900">
            Back to Search
          </span>
        </Link>
      </div>
    </div>
  );
}
