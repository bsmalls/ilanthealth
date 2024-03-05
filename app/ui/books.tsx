import { Book, BookSearchResults } from "@/app/lib/definitions";
import { BooksSkeleton } from "@/app/ui/skeletons";
import Image from "next/image";
import Link from "next/link";
import { bitter } from "@/app/ui/fonts";
import parse from "html-react-parser";
import { IoIosArrowForward } from "react-icons/io";

export default function BookCardsWrapper({
  results,
  error,
  isLoading,
}: {
  results: BookSearchResults | null;
  error: string | null;
  isLoading: boolean;
}) {
  const totalResults: number = results ? results.totalItems : 0;

  return (
    <div className="px-2 py-4 sm:px-6 md:px-10 md:py-6">
      <div className="sm:grid sm:grid-cols-2 sm:gap-3 md:gap-4 max-w-screen-xl mx-auto">
        {error && <div>An error has occured: {error}</div>}
        {isLoading && <BooksSkeleton />} 
        {!results && null}
        {results && (
          <p className="col-span-2 mb-2 sm:mb-0">
            {totalResults === 0 ? "No " : totalResults + " "}
            results found.
          </p>
        )}
        {results?.items?.length &&
          results.items.map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
      </div>
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  const { title, authors, description, imageLinks } = book.volumeInfo;

  const authorList: string = authors ? authors.join(", ") : "Unknown Author";
  const imageLink: string =
    (imageLinks && (imageLinks.smallThumbnail || imageLinks.thumbnail)) || "";
//   const descriptionPreview: string | null = description ? description.slice(0, 100) : null;
    const descriptionPreview = ():string => {
        if(!description) return "";
        const words = description?.split(" ") || [];
        return words.length > 25
        ? `${words.slice(0, 26).join(" ")}...`
        : description;
    }
  return (
    <div
      key={book.id}
      className="rounded-md bg-white p-4 w-full shadow-sm flex justify-end gap-4 flex-row-reverse mb-2 sm:mb-0"
    >
      <div className="sm:basis-2/3 flex grow flex-col">
        <h3 className="text-lg md:text-xl">{title}</h3>
        <p
          className={`${bitter.className} my-2 text-sm`}
        >{`By: ${authorList}`}</p>
        {descriptionPreview() && (
              <div className={`${bitter.className} text-sm mb-4`}>{parse(descriptionPreview())}</div>
            )}
        <div className="flex flex-row justify-end mt-auto">
          <Link
            className={
              "group/details flex flex-row justify-end items-center rounded-full py-1 pl-4 pr-3 text-sm text-gray-500 transition bg-[rgb(244,244,244)] hover:bg-gray-200"
            }
            href={`/book/${book.id}`}
          >
            <span className="font-semibold transition group-hover/details:text-gray-900">
              Details
            </span>
            <IoIosArrowForward className="mt-px h-5 w-5 text-gray-400 transition group-hover/details:translate-x-0.5 group-hover/details:text-gray-500" />
          </Link>
        </div>
      </div>
      <div className="min-w-[128px] sm:basis-1/3">
        <Image
          src={imageLink}
          width={128}
          height={195}
          className="w-full"
          alt={`Cover image for ${title}`}
        />
      </div>
    </div>
  );
}
