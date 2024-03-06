import { Book, BookSearchResults } from "@/app/lib/definitions";
import { BooksSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/pagination";
import Image from "next/image";
import Link from "next/link";
import { bitter } from "@/app/ui/fonts";
import parse from "html-react-parser";
import { IoIosArrowForward } from "react-icons/io";
import bookPlaceholder from "@/public/book_placeholder.svg";
import { useSearchParams } from "next/navigation";

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
  const totalPages: number = results ? Math.ceil(results.totalItems / 10) : 0;

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
        {totalPages > 0 && (
          <div className="mt-5 col-span-2 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  const { title, authors, description, imageLinks } = book.volumeInfo;
  const searchParams = useSearchParams();
  const authorList: string = authors ? authors.join(", ") : "Unknown Author";
  const imageLink: string =
    (imageLinks && (imageLinks.smallThumbnail || imageLinks.thumbnail)) ||
    bookPlaceholder;
  const descriptionPreview = (): string => {
    if (!description) return "";
    const words = description?.split(" ") || [];
    return words.length > 25
      ? `${words.slice(0, 26).join(" ")}...`
      : description;
  };
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
          <div className={`${bitter.className} text-sm mb-4`}>
            {parse(descriptionPreview())}
          </div>
        )}
        <div className="flex flex-row justify-end mt-auto">
          <Link
            className={
              "group/details flex flex-row justify-end items-center rounded-full py-1 pl-4 pr-3 text-sm text-gray-500 transition bg-[rgb(244,244,244)] hover:bg-gray-200"
            }
            href={{
              pathname: `/book/${book.id}`,
              query: {
                query: searchParams.get("query")?.toString(),
                page: searchParams.get("page")?.toString(),
              },
            }}
          >
            <span className="font-semibold transition group-hover/details:text-gray-900">
              Details
            </span>
            <IoIosArrowForward className="mt-px h-5 w-5 text-gray-400 transition group-hover/details:translate-x-0.5 group-hover/details:text-gray-500" />
          </Link>
        </div>
      </div>
      <div className="min-w-[128px] max-w-[128px] sm:max-w-full sm:basis-1/3">
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

export function BookDetails({ result, id }: { result: Book; id: string }) {
  const {
    title,
    authors,
    description,
    subtitle,
    publishedDate,
    publisher,
    language,
    mainCategory,
    categories,
    pageCount,
  } = result.volumeInfo;

  const authorList: string = authors ? authors.join(", ") : "Unknown Author";
  return (
    <div className="rounded-md bg-white p-4 w-full shadow-sm flex justify-end gap-4 md:gap-8 flex-col-reverse sm:flex-row-reverse">
      <div className="flex flex-col sm:basis-1/2 md:basis-2/3">
        <h1 className="text-3xl">{title}</h1>
        {subtitle && <p className={`${bitter.className} italic`}>{subtitle}</p>}
        <p
          className={`${bitter.className} my-2 text-lg`}
        >{`By: ${authorList}`}</p>
        {description && (
          <div className={`${bitter.className}`}>{parse(description)}</div>
        )}
        <div className={`${bitter.className} text-sm`}>
          <ul className="mt-4">
            {publishedDate && (
              <li>
                <span className="font-semibold">Published Date:</span>{" "}
                {publishedDate}
              </li>
            )}
            {publisher && (
              <li>
                <span className="font-semibold">Published By:</span> {publisher}
              </li>
            )}
            {language && (
              <li>
                <span className="font-semibold">Language:</span> {language}
              </li>
            )}
            {mainCategory && (
              <li>
                <span className="font-semibold">Main Category:</span>{" "}
                {mainCategory}
              </li>
            )}
            {categories && (
              <li>
                <span className="font-semibold">Categories:</span>{" "}
                {categories.join(", ")}
              </li>
            )}
            {pageCount && (
              <li>
                <span className="font-semibold">Page Count:</span> {pageCount}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="sm:basis-1/2 md:basis-1/3">
        <Image
          src={`https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w384&source=gbs_api`}
          width={384}
          height={0}
          className="w-full h-auto"
          alt={`Cover image for ${title}`}
          priority
        />
      </div>
    </div>
  );
}
